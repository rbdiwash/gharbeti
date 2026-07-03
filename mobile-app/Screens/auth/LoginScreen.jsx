import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext";
import { useBiometric } from "../../hooks/useBiometric";
import { useTenants } from "../../hooks/useTenants";
import { SecondaryButton } from "../../components/Buttons";
import OtpVerificationModal from "./components/OtpVerificationModal";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);

const RESEND_SECONDS = 60;

export default function LoginScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    login: loginUser,
    isLoggingIn,
    verifyRegistrationOtp,
    resendVerificationOtp,
    isVerifyingOtp,
  } = useAuth();
  const { verifyInvitation } = useTenants();
  const { mutate: verifyInvitationMutate, isPending: isVerifyingInvitation } =
    verifyInvitation();

  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'invitation'

  const [email, setEmail] = useState("rbdiwash@gmail.com");
  const [password, setPassword] = useState("Asd123@#");
  const [invitationCode, setInvitationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [otpVisible, setOtpVisible] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  const {
    isBiometricAvailable,
    isBiometricEnabled,
    biometricType,
    authenticateWithBiometric,
    saveBiometricCredentials,
  } = useBiometric();

  const biometricLabel =
    biometricType === "FaceID"
      ? "Face ID"
      : biometricType === "TouchID"
        ? "Touch ID"
        : "Biometric";

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

  useEffect(() => {
    if (isBiometricEnabled && activeTab === "login") {
      handleBiometricLogin();
    }
  }, [isBiometricEnabled]);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleBiometricLogin = async () => {
    try {
      const credentials = await authenticateWithBiometric();
      if (credentials) {
        setEmail(credentials.email);
        setPassword(credentials.password);
        await performLogin(credentials.email, credentials.password);
      }
    } catch {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: "Biometric login failed. Please try again.",
        position: "bottom",
      });
    }
  };

  const performLogin = async (loginEmail, loginPassword) => {
    if (!loginEmail?.trim() || !loginPassword?.trim()) {
      Toast.show({
        type: "error",
        text1: "Please enter email and password",
        position: "bottom",
      });
      return;
    }

    try {
      await loginUser({ email: loginEmail, password: loginPassword });
      if (isBiometricEnabled) {
        await saveBiometricCredentials({
          email: loginEmail,
          password: loginPassword,
        });
      }
    } catch (error) {
      if (error?.response?.data?.isEmailVerified === false) {
        setOtpEmail(error.response.data.email || loginEmail);
        setOtp("");
        setOtpVisible(true);
        startCountdown();
      }
    }
  };

  const handleLogin = () => performLogin(email, password);

  const handleVerifyInvitation = () => {
    if (!invitationCode.trim() || !email.trim()) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please enter both invitation code and email",
        position: "bottom",
      });
      return;
    }

    verifyInvitationMutate(
      { invitationCode: invitationCode.trim(), email: email.trim() },
      {
        onSuccess: (response) => {
          if (response?.status === 202) {
            Toast.show({
              type: "success",
              text1: "Invitation verified",
              text2: "Please set your password to continue.",
              position: "bottom",
            });
            navigation.navigate("tenantOnboarding", {
              invitationCode: invitationCode.trim(),
              email: email.trim(),
            });
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
    } catch {
      // toast handled in AuthContext
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
      // toast handled in AuthContext
    }
  };

  return (
    <>
      <StyledKeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-primary"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <StyledView
          className="flex flex-row items-center gap-2 px-6 pb-7"
          style={{ paddingTop: Math.max(insets.top, 16) + 12 }}
        >
          <Image
            source={require("../../assets/logo_nobg.png")}
            className="w-12 h-12"
            resizeMode="contain"
          />
          <StyledView className="flex flex-col items-start justify-start">
            <StyledText className="text-white text-[22px] font-bold tracking-tight mb-1">
              {activeTab === "login"
                ? "Welcome back to Gharbeti"
                : "New tenant on Gharbeti"}
            </StyledText>
            <StyledText className="text-white text-sm leading-5 max-w-xs">
              {activeTab === "login"
                ? "Sign in to your landlord or tenant account"
                : "Enter the invitation code sent by your landlord"}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex-1 bg-[#f8f9fa] rounded-t-[28px] overflow-hidden">
          <StyledScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 24,
              paddingBottom: Math.max(insets.bottom, 24) + 24,
              flexGrow: 1,
            }}
          >
            {/* Tab switcher */}
            <StyledView className="flex-row bg-[#eef1f5] rounded-[14px] p-1 mb-6">
              <StyledTouchableOpacity
                className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-[10px] ${
                  activeTab === "login" ? "bg-white shadow-sm" : ""
                }`}
                onPress={() => setActiveTab("login")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="log-in-outline"
                  size={16}
                  color={activeTab === "login" ? "#27ae60" : "#6b7280"}
                />
                <StyledText
                  className={`text-sm font-semibold ${
                    activeTab === "login" ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Sign In
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className={`flex-1 flex-row items-center justify-center gap-1.5 py-3 rounded-[10px] ${
                  activeTab === "invitation" ? "bg-white shadow-sm" : ""
                }`}
                onPress={() => setActiveTab("invitation")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="key-outline"
                  size={16}
                  color={activeTab === "invitation" ? "#27ae60" : "#6b7280"}
                />
                <StyledText
                  className={`text-sm font-semibold ${
                    activeTab === "invitation"
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                >
                  New Tenant
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>

            {activeTab === "login" ? (
              <>
                <StyledView className="flex-row items-center gap-1.5 self-start bg-[#eaf7f0] rounded-full px-3 py-1 mb-3">
                  <Ionicons name="person-outline" size={13} color="#27ae60" />
                  <StyledText className="text-green text-xs font-semibold">
                    Returning user
                  </StyledText>
                </StyledView>

                <StyledText className="text-gray-500 text-sm leading-5 mb-5">
                  Welcome back. Sign in with the email and password you set up.
                </StyledText>

                <StyledView className="mb-4">
                  <StyledText className="text-[13px] font-semibold text-gray-700 mb-1.5 ml-0.5">
                    Email Address
                  </StyledText>
                  <StyledView className="flex-row items-center bg-white rounded-xl border-[1.5px] border-gray-200 px-3.5 py-3.5">
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color="#94a3b8"
                      style={{ marginRight: 10 }}
                    />
                    <StyledTextInput
                      className="flex-1 text-[15px] text-gray-900"
                      placeholder="Enter your email"
                      placeholderTextColor="#94a3b8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </StyledView>
                </StyledView>

                <StyledView className="mb-4">
                  <StyledText className="text-[13px] font-semibold text-gray-700 mb-1.5 ml-0.5">
                    Password
                  </StyledText>
                  <StyledView className="flex-row items-center bg-white rounded-xl border-[1.5px] border-gray-200 px-3.5 py-3.5">
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color="#94a3b8"
                      style={{ marginRight: 10 }}
                    />
                    <StyledTextInput
                      className="flex-1 text-[15px] text-gray-900"
                      placeholder="Enter your password"
                      placeholderTextColor="#94a3b8"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((v) => !v)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={18}
                        color="#94a3b8"
                      />
                    </TouchableOpacity>
                  </StyledView>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("forget")}
                    className="self-end mt-2"
                  >
                    <StyledText className="text-[#3498db] text-[13px] font-semibold">
                      Forgot Password?
                    </StyledText>
                  </TouchableOpacity>
                </StyledView>

                <SecondaryButton
                  text={isLoggingIn ? "Signing in..." : "Sign In"}
                  onPress={handleLogin}
                  disabled={isLoggingIn}
                  loading={isLoggingIn}
                  size="medium"
                  fullWidth
                  bgColor="#27ae60"
                  parentClass="mt-2 rounded-[14px]"
                  rightIcon={
                    !isLoggingIn ? (
                      <Ionicons name="arrow-forward" size={18} color="#fff" />
                    ) : null
                  }
                />

                {isBiometricAvailable && (
                  <StyledTouchableOpacity
                    className="flex-row items-center justify-center gap-2 mt-3 py-3.5 rounded-[14px] border-[1.5px] border-gray-200 bg-white"
                    onPress={handleBiometricLogin}
                    activeOpacity={0.85}
                  >
                    <Ionicons
                      name={
                        biometricType === "FaceID"
                          ? "scan-outline"
                          : "finger-print-outline"
                      }
                      size={20}
                      color="#0e2f4f"
                    />
                    <StyledText className="text-primary text-[15px] font-semibold">
                      Sign in with {biometricLabel}
                    </StyledText>
                  </StyledTouchableOpacity>
                )}
              </>
            ) : (
              <>
                <StyledView className="flex-row items-center gap-1.5 self-start bg-[#eaf7f0] rounded-full px-3 py-1 mb-3">
                  <Ionicons
                    name="mail-unread-outline"
                    size={13}
                    color="#27ae60"
                  />
                  <StyledText className="text-green text-xs font-semibold">
                    Tenant invitation
                  </StyledText>
                </StyledView>

                <StyledText className="text-gray-500 text-sm leading-5 mb-5">
                  Enter the invitation code and email address sent by your
                  landlord. You'll set your password next.
                </StyledText>

                <StyledView className="mb-4">
                  <StyledText className="text-[13px] font-semibold text-gray-700 mb-1.5 ml-0.5">
                    Invitation Code
                  </StyledText>
                  <StyledView className="flex-row items-center bg-white rounded-xl border-[1.5px] border-gray-200 px-3.5 py-3.5">
                    <Ionicons
                      name="key-outline"
                      size={18}
                      color="#94a3b8"
                      style={{ marginRight: 10 }}
                    />
                    <StyledTextInput
                      className="flex-1 text-[15px] text-gray-900"
                      placeholder="Enter invitation code"
                      placeholderTextColor="#94a3b8"
                      onChangeText={setInvitationCode}
                      value={invitationCode}
                      autoCapitalize="characters"
                    />
                  </StyledView>
                </StyledView>

                <StyledView className="mb-4">
                  <StyledText className="text-[13px] font-semibold text-gray-700 mb-1.5 ml-0.5">
                    Email Address
                  </StyledText>
                  <StyledView className="flex-row items-center bg-white rounded-xl border-[1.5px] border-gray-200 px-3.5 py-3.5">
                    <Ionicons
                      name="mail-outline"
                      size={18}
                      color="#94a3b8"
                      style={{ marginRight: 10 }}
                    />
                    <StyledTextInput
                      className="flex-1 text-[15px] text-gray-900"
                      placeholder="Enter your email"
                      placeholderTextColor="#94a3b8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={setEmail}
                      value={email}
                    />
                  </StyledView>
                </StyledView>

                <SecondaryButton
                  text={
                    isVerifyingInvitation ? "Verifying..." : "Verify Invitation"
                  }
                  onPress={handleVerifyInvitation}
                  disabled={isVerifyingInvitation}
                  loading={isVerifyingInvitation}
                  size="medium"
                  fullWidth
                  bgColor="#27ae60"
                  parentClass="mt-2 rounded-[14px]"
                  rightIcon={
                    !isVerifyingInvitation ? (
                      <Ionicons name="arrow-forward" size={18} color="#fff" />
                    ) : null
                  }
                />
              </>
            )}

            <StyledView className="flex-row items-center gap-3 my-6">
              <StyledView className="flex-1 h-px bg-gray-200" />
              <StyledText className="text-gray-400 text-[13px]">or</StyledText>
              <StyledView className="flex-1 h-px bg-gray-200" />
            </StyledView>

            <StyledView className="bg-white rounded-2xl p-[18px] border border-gray-200">
              <StyledText className="text-primary text-base font-bold mb-1">
                Are you a landlord?
              </StyledText>
              <StyledText className="text-gray-500 text-[13px] leading-[18px] mb-3.5">
                Create an account to manage properties and tenants.
              </StyledText>
              <StyledTouchableOpacity
                className="flex-row items-center justify-center gap-2 bg-[#eef1f5] rounded-xl py-3.5"
                onPress={() => navigation.navigate("signup")}
                activeOpacity={0.85}
              >
                <Ionicons name="business-outline" size={18} color="#0e2f4f" />
                <StyledText className="text-primary text-[15px] font-bold">
                  Register as Landlord
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledScrollView>
        </StyledView>

        <StyledTouchableOpacity
          activeOpacity={0.8}
          className="absolute left-6 z-10"
          style={{ bottom: Math.max(insets.bottom, 24) }}
          onPress={() => navigation.replace("splash")}
        >
          <StyledText className="text-white font-bold text-sm">
            Intro
          </StyledText>
        </StyledTouchableOpacity>
      </StyledKeyboardAvoidingView>

      <OtpVerificationModal
        visible={otpVisible}
        email={otpEmail}
        otp={otp}
        onOtpChange={setOtp}
        onClose={() => setOtpVisible(false)}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        isVerifying={isVerifyingOtp}
        canResend={canResend}
        countdown={countdown}
        formatTime={formatTime}
      />
    </>
  );
}
