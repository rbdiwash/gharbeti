import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/AuthContext";

const RESEND_SECONDS = 60;

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  const visible = local.slice(0, 2);
  const masked = "*".repeat(Math.max(local.length - 2, 3));
  return `${visible}${masked}@${domain}`;
}

export default function OTPScreen({ navigation, route }) {
  // source: 'login' | 'register'
  const { email, source } = route.params ?? {};

  const {
    verifyRegistrationOtp,
    isVerifyingOtp,
    resendVerificationOtp,
    isResendingOtp,
  } = useAuth();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  // Start / restart the resend countdown
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

  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleResend = async () => {
    if (!canResend || isResendingOtp) return;
    try {
      await resendVerificationOtp(email);
      Toast.show({ type: "success", text1: "OTP resent to your email", position: "bottom" });
      startCountdown();
    } catch {
      // error toast handled in AuthContext
    }
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      Toast.show({ type: "error", text1: "Please enter the 6-digit code", position: "bottom" });
      return;
    }
    try {
      // POST /auth/verify-email — returns token → AuthContext sets isLoggedIn: true
      await verifyRegistrationOtp({ email, otp });
      // RootNavigator auto-switches to logged-in stack on success
    } catch {
      // error toast handled in AuthContext
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.replace("login");
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.iconWrap}>
          <Ionicons name="mail-unread-outline" size={28} color="#fff" />
        </View>

        <Text style={styles.headerTitle}>Verify your email</Text>
        <Text style={styles.headerSubtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.emailText}>{maskEmail(email)}</Text>
        </Text>
      </View>

      {/* ── Card ── */}
      <View style={styles.card}>
        <Text style={styles.inputLabel}>Enter verification code</Text>

        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          focusColor="#27ae60"
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpCell,
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: styles.otpCellFocused,
          }}
        />

        <TouchableOpacity
          style={[styles.verifyBtn, (isVerifyingOtp || otp.length < 6) && styles.verifyBtnDisabled]}
          onPress={handleVerify}
          disabled={isVerifyingOtp || otp.length < 6}
          activeOpacity={0.85}
        >
          {isVerifyingOtp ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Text style={styles.verifyBtnText}>Verify & Continue</Text>
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive it? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend} disabled={isResendingOtp}>
              {isResendingOtp ? (
                <ActivityIndicator size="small" color="#27ae60" />
              ) : (
                <Text style={styles.resendLink}>Resend code</Text>
              )}
            </TouchableOpacity>
          ) : (
            <Text style={styles.countdown}>Resend in {formatTime(countdown)}</Text>
          )}
        </View>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color="#6b7280" style={{ marginTop: 1 }} />
          <Text style={styles.infoText}>
            Check your spam folder if you don't see the email. The code expires in 10 minutes.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1a2c4e",
  },

  // ── Header ──
  header: {
    paddingTop: 56,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#27ae60",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 15,
    lineHeight: 22,
  },
  emailText: {
    color: "#27ae60",
    fontWeight: "600",
  },

  // ── Card ──
  card: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 20,
  },

  // ── OTP ──
  otpContainer: {
    marginBottom: 32,
  },
  otpCell: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  otpCellFocused: {
    borderColor: "#27ae60",
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  otpText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  // ── Verify button ──
  verifyBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#27ae60",
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 24,
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  verifyBtnDisabled: {
    backgroundColor: "#a0aec0",
    shadowOpacity: 0,
    elevation: 0,
  },
  verifyBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // ── Resend ──
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
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

  // ── Info box ──
  infoBox: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#f0f2f5",
    borderRadius: 12,
    padding: 14,
  },
  infoText: {
    flex: 1,
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 19,
  },
});
