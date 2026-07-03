import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { OtpInput } from "react-native-otp-entry";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const OTP_THEME = {
  containerStyle: { marginBottom: 28 },
  pinCodeContainerStyle: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  pinCodeTextStyle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  focusedPinCodeContainerStyle: {
    borderColor: "#27ae60",
    backgroundColor: "#fff",
  },
};

function maskEmail(email = "") {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return `${local.slice(0, 2)}${"*".repeat(Math.max(local.length - 2, 3))}@${domain}`;
}

export default function OtpVerificationModal({
  visible,
  email,
  otp,
  onOtpChange,
  onClose,
  onVerify,
  onResend,
  isVerifying,
  canResend,
  countdown,
  formatTime,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 bg-black/50 justify-end">
        <StyledView className="bg-white rounded-t-3xl px-6 pt-3 pb-10">
          <StyledView className="w-10 h-1 bg-gray-200 rounded self-center mb-5" />

          <StyledView className="flex-row items-center gap-3 mb-6">
            <StyledView className="w-11 h-11 rounded-[14px] bg-green items-center justify-center">
              <Ionicons name="mail-unread-outline" size={22} color="#fff" />
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-[17px] font-bold text-gray-900">
                Verify your email
              </StyledText>
              <StyledText className="text-[13px] text-gray-500 mt-0.5">
                We sent a code to{" "}
                <StyledText className="text-green font-semibold">
                  {maskEmail(email)}
                </StyledText>
              </StyledText>
            </StyledView>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="close" size={22} color="#6b7280" />
            </TouchableOpacity>
          </StyledView>

          <OtpInput
            numberOfDigits={6}
            onTextChange={onOtpChange}
            focusColor="#27ae60"
            theme={OTP_THEME}
          />

          <StyledTouchableOpacity
            className={`rounded-[14px] py-[15px] items-center mb-[18px] ${
              isVerifying || otp.length < 6 ? "bg-[#a0aec0]" : "bg-green"
            }`}
            onPress={onVerify}
            disabled={isVerifying || otp.length < 6}
            activeOpacity={0.85}
          >
            {isVerifying ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <StyledText className="text-white text-base font-bold">
                Verify & Sign In
              </StyledText>
            )}
          </StyledTouchableOpacity>

          <StyledView className="flex-row justify-center items-center">
            <StyledText className="text-gray-500 text-sm">
              Didn't receive it?{" "}
            </StyledText>
            {canResend ? (
              <TouchableOpacity onPress={onResend}>
                <StyledText className="text-green text-sm font-bold">
                  Resend code
                </StyledText>
              </TouchableOpacity>
            ) : (
              <StyledText className="text-primary text-sm font-semibold">
                Resend in {formatTime(countdown)}
              </StyledText>
            )}
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
}
