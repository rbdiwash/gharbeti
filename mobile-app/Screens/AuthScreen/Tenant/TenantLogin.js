"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { styled } from "nativewind";
import PasswordStep from "./PasswordStep";
import RulesModal from "./RulesModal";
import InvitationStep from "./InvitationStep";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { useTenants } from "../../../hooks/useTenants";
import Toast from "react-native-toast-message";
import { useBiometric } from "../../../hooks/useBiometric";
import { OtpInput } from "react-native-otp-entry";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);

const TenantLogin = ({}) => {
  const {
    login: loginUser,
    isLoggingIn,
    setState,
    verifyRegistrationOtp,
    resendVerificationOtp,
    // otpVisible,
    // setOtpVisible,
    isVerifyingOtp,
  } = useAuth();
  const { verifyInvitation, setPassword } = useTenants();
  const { mutate: verifyInvitationMutate, isPending: isVerifying } =
    verifyInvitation();
  const RESEND_SECONDS = 60;

  const { mutate: setPasswordMutate } = setPassword();
  const [step, setStep] = useState(1); // 1: Invitation code, 2: Set password
  const navigation = useNavigation();
  const [data, setData] = useState({
    invitationCode: "274785",
    email: "divash.varicon@gmail.com",
    password: "Asd123@#",
    confirmPassword: "Asd123@#",
  });

  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [isInvitationOn, setIsInvitationOn] = useState(false);

  // OTP modal state
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_SECONDS);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function maskEmail(email = "") {
    const [local, domain] = email.split("@");
    if (!domain) return email;
    return `${local.slice(0, 2)}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
  }
  // Use the biometric hook
  const {
    isBiometricAvailable,
    isBiometricEnabled,
    biometricType,
    authenticateWithBiometric,
    saveBiometricCredentials,
  } = useBiometric();

  useEffect(() => {
    if (isBiometricEnabled) {
      handleBiometricLogin();
    }
  }, [isBiometricEnabled]);

  const handleBiometricLogin = async () => {
    try {
      const credentials = await authenticateWithBiometric();
      if (credentials) {
        setData((prev) => ({
          ...prev,
          email: credentials.email,
          password: credentials.password,
        }));
        await handleLogin(credentials.email, credentials.password);
      }
    } catch (error) {
      console.error("Biometric login failed:", error);
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Biometric login failed. Please try again.",
        position: "bottom",
      });
    }
  };

  const handleInputChange = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const validateInvitation = () => {
    if (data.invitationCode.trim() === "" || data.email.trim() === "") {
      alert("Please enter both invitation code and email");
      return;
    }

    verifyInvitationMutate(
      {
        invitationCode: data.invitationCode,
        email: data.email,
      },
      {
        onSuccess: (response) => {
          if (response?.status === 202) {
            Toast.show({
              type: "success",
              text1: "Invitation already verified",
              text2:
                "You have already verified your invitation. Please Proceed.",
              position: "bottom",
            });
            setStep(2);
          }
        },
        onError: (error) => {
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2:
              error?.response?.data?.message ||
              "The invitation code or email is incorrect",
            position: "bottom",
          });
        },
      },
    );
  };

  const handleLogin = async () =>
    // email = data?.email,
    // password = data?.password
    {
      const email = data?.email;
      const password = data?.password;
      if (email.trim() === "" || password.trim() === "") {
        alert("Please enter both email and password");
        return;
      }

      try {
        const success = await loginUser({ email, password });

        if (success) {
          // Store credentials for biometric login if enabled
          if (isBiometricEnabled) {
            await saveBiometricCredentials({ email, password });
          }
          return true;
        } else {
          throw new Error("Failed to save login state");
        }
      } catch (error) {
        console.log("error", error);
        console.error("Login error:", error.response?.data?.message);
        if (error?.response?.data?.isEmailVerified === false) {
          console.log("const", error.response.data);
          const email = error.response.data.email || data.email;
          setOtpEmail(email);
          setOtp("");
          setOtpVisible(true);
          startCountdown();
        } else {
          // All other errors: toast shown by AuthContext
          Toast.show({
            type: "error",
            text1: "Login Failed",
            text2:
              error.response?.data?.message ||
              "Please check your credentials and try again",
            position: "bottom",
          });
        }
      }
    };

  const validatePassword = () => {
    if (data.password.trim() === "") {
      alert("Please enter a password");
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setPasswordMutate(
      {
        password: data.password,
        email: data.email,
        invitationCode: data.invitationCode,
      },
      {
        onSuccess: (response) => {
          setTimeout(() => {
            setRulesModalVisible(true);
          }, 2000);
          console.log(response.data.data);

          setState((prevState) => ({
            ...prevState,
            userData: response?.data?.data,
            user: response?.data?.data?.email,
          }));

          if (response?.status === 202) {
            Toast.show({
              type: "success",
              text1: "Password already set",
              text2:
                "You have already verified your invitation. Please Proceed.",
              position: "bottom",
            });
          }
        },
        onError: (error) => {
          console.log(error);
          alert("Failed to set password");
        },
      },
    );
  };

  const acceptRules = () => {
    setRulesModalVisible(false);
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      role: "tenant",
      isLoading: false,
    }));
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 6) {
      Toast.show({
        type: "error",
        text1: "Please enter the 6-digit code",
        position: "bottom",
      });
      return;
    }
    try {
      await verifyRegistrationOtp({ email: otpEmail, otp });
      setOtpVisible(false);
      // AuthContext sets isLoggedIn: true → RootNavigator switches automatically
    } catch {
      // error toast handled in AuthContext
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    try {
      await resendVerificationOtp(otpEmail);
      Toast.show({
        type: "success",
        text1: "OTP resent to your email",
        position: "bottom",
      });
      startCountdown();
    } catch {
      // error toast handled in AuthContext
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <StyledView className="flex-1 bg-primary justify-center items-center px-6 min-h-screen py-10">
        {step === 1 ? (
          <InvitationStep
            data={data}
            handleInputChange={handleInputChange}
            validateInvitation={validateInvitation}
            navigation={navigation}
            isInvitationOn={isInvitationOn}
            setIsInvitationOn={setIsInvitationOn}
            handleLogin={handleLogin}
            isLoading={isVerifying}
            isLoggingIn={isLoggingIn}
            isBiometricAvailable={isBiometricAvailable}
            biometricType={biometricType}
            onBiometricLogin={handleBiometricLogin}
          />
        ) : (
          <PasswordStep
            data={data}
            handleInputChange={handleInputChange}
            validatePassword={validatePassword}
            goBack={() => setStep(1)}
          />
        )}

        <RulesModal
          visible={rulesModalVisible}
          onClose={() => setRulesModalVisible(false)}
          onAccept={acceptRules}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          className={"text-white absolute bottom-4 left-4"}
          onPress={() => navigation.replace("splash")}
        >
          <Text className={"text-white font-bold"}>Intro</Text>
        </TouchableOpacity>
      </StyledView>
      {/* ── OTP Verification Modal ── */}
      <Modal
        visible={otpVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOtpVisible(false)}
      >
        <View style={otpStyles.overlay}>
          <View style={otpStyles.sheet}>
            {/* Handle bar */}
            <View style={otpStyles.handle} />

            {/* Header */}
            <View style={otpStyles.sheetHeader}>
              <View style={otpStyles.iconWrap}>
                <Ionicons name="mail-unread-outline" size={22} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={otpStyles.sheetTitle}>Verify your email</Text>
                <Text style={otpStyles.sheetSubtitle}>
                  We sent a code to{" "}
                  <Text style={otpStyles.emailText}>{maskEmail(otpEmail)}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setOtpVisible(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="close" size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* OTP input */}
            <OtpInput
              numberOfDigits={6}
              onTextChange={setOtp}
              focusColor="#27ae60"
              theme={{
                containerStyle: otpStyles.otpContainer,
                pinCodeContainerStyle: otpStyles.otpCell,
                pinCodeTextStyle: otpStyles.otpText,
                focusedPinCodeContainerStyle: otpStyles.otpCellFocused,
              }}
            />

            {/* Verify button */}
            <TouchableOpacity
              style={[
                otpStyles.verifyBtn,
                (isVerifyingOtp || otp.length < 6) &&
                  otpStyles.verifyBtnDisabled,
              ]}
              onPress={handleVerifyOtp}
              disabled={isVerifyingOtp || otp.length < 6}
              activeOpacity={0.85}
            >
              {isVerifyingOtp ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={otpStyles.verifyBtnText}>Verify & Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Resend */}
            <View style={otpStyles.resendRow}>
              <Text style={otpStyles.resendLabel}>Didn't receive it? </Text>
              {canResend ? (
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text style={otpStyles.resendLink}>Resend code</Text>
                </TouchableOpacity>
              ) : (
                <Text style={otpStyles.countdown}>
                  Resend in {formatTime(countdown)}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const otpStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#27ae60",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  sheetSubtitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  emailText: {
    color: "#27ae60",
    fontWeight: "600",
  },
  otpContainer: {
    marginBottom: 28,
  },
  otpCell: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  otpCellFocused: {
    borderColor: "#27ae60",
    backgroundColor: "#fff",
  },
  otpText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  verifyBtn: {
    backgroundColor: "#27ae60",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
  },
  verifyBtnDisabled: {
    backgroundColor: "#a0aec0",
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendLabel: {
    color: "#6b7280",
    fontSize: 14,
  },
  resendLink: {
    color: "#27ae60",
    fontSize: 14,
    fontWeight: "700",
  },
  countdown: {
    color: "#1a2c4e",
    fontSize: 14,
    fontWeight: "600",
  },
});
export default TenantLogin;
