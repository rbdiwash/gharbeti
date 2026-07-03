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
import logo from "../../assets/icon.png";
import useGharbeti from "../../context/useGharbeti";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const RESEND_SECONDS = 60;

const LoginScreen = ({ navigation }) => {
  const {
    login: loginUser,
    verifyRegistrationOtp,
    isVerifyingOtp,
    resendVerificationOtp,
    otpVisible,
    setOtpVisible,
  } = useAuth();

  const [data, setData] = useState({
    email: "divash.varicon@gmail.com",
    password: "Asd123@#",
  });
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

  // OTP modal state
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

  const handleInputChange = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const toggleVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  const handleLogin = async () => {
    if (!data.email || !data.password) return;
    try {
      await loginUser({ email: data.email, password: data.password });
      // AuthContext sets isLoggedIn: true → RootNavigator switches automatically
    } catch (error) {
      // Landlord email not verified — show OTP modal instead of navigating away
      if (error?.response?.data?.isEmailVerified === false) {
        console.log("const", error.response.data);
        const email = error.response.data.email || data.email;
        setOtpEmail(email);
        setOtp("");
        setOtpVisible(true);
        startCountdown();
      }
      // All other errors: toast shown by AuthContext
    }
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
      <StyledView className="flex-1 bg-primary justify-center items-center px-6 h-screen">
        <StyledView className="flex-row justify-center items-center mb-8">
          <Image source={logo} className="w-64 h-64" />
        </StyledView>
        <StyledTextInput
          placeholder="Email"
          keyboardType="email-address"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
          onChangeText={(text) => handleInputChange(text, "email")}
          value={data?.email}
        />

        <View className="flex flex-row items-center justify-between w-full border border-gray-300  rounded-lg mb-4 px-3">
          <StyledTextInput
            placeholder="Password"
            secureTextEntry={isPasswordSecure ? true : false}
            className="py-3 text-white w-64 text-base"
            placeholderTextColor={"#fff"}
            onChangeText={(text) => handleInputChange(text, "password")}
            value={data?.password}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Entypo
              name={isPasswordSecure ? "eye" : "eye-with-line"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <StyledTouchableOpacity
          onPress={() => navigation.replace("forget")}
          className="text-right w-full"
        >
          <StyledText className="text-right w-full text-white text-sm">
            Forgot Password?
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-secondary w-full py-2 rounded-lg mt-10"
          onPress={handleLogin}
        >
          <StyledText className="text-white text-center text-lg">
            Log In
          </StyledText>
        </StyledTouchableOpacity>
        <Text
          onPress={() => navigation.replace("tenantLogin")}
          className="my-4 text-white underline"
        >
          Are you tenant? Login as Tenant
        </Text>
        <StyledTouchableOpacity
          className="bg-[#E0E0E0] w-full py-2 rounded-lg"
          onPress={() => navigation.navigate("signup")}
        >
          <StyledText className="text-[#0e2f4f] text-center text-lg">
            Register as LANDLORD
          </StyledText>
        </StyledTouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className={"text-white bg-transparent absolute bottom-4 left-4"}
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

export default LoginScreen;
