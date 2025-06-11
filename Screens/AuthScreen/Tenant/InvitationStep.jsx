import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const InvitationStep = ({
  data,
  handleInputChange,
  validateInvitation,
  navigation,
  isInvitationOn,
  setIsInvitationOn,
  handleLogin,
  isLoading,
  isBiometricAvailable,
  biometricType,
  onBiometricLogin,
}) => {
  return (
    <StyledView className="w-full space-y-6">
      <StyledView className="space-y-4">
        <StyledText className="text-white text-2xl font-bold">
          Welcome to Gharbeti
        </StyledText>
        <StyledText className="text-white/80">
          Enter your invitation code and email to get started
        </StyledText>
      </StyledView>

      <StyledView className="space-y-4">
        <StyledView>
          <StyledText className="text-white font-medium mb-2">
            Invitation Code
          </StyledText>
          <StyledTextInput
            className="bg-white/10 border border-white/20 rounded-lg p-4 text-white"
            placeholder="Enter invitation code"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={data.invitationCode}
            onChangeText={(text) => handleInputChange(text, "invitationCode")}
          />
        </StyledView>

        <StyledView>
          <StyledText className="text-white font-medium mb-2">Email</StyledText>
          <StyledTextInput
            className="bg-white/10 border border-white/20 rounded-lg p-4 text-white"
            placeholder="Enter your email"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={data.email}
            onChangeText={(text) => handleInputChange(text, "email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </StyledView>
      </StyledView>

      <StyledView className="space-y-4">
        <PrimaryButton
          text={isLoading ? "Verifying..." : "Verify Invitation"}
          onPress={validateInvitation}
          disabled={isLoading}
        />

        {isBiometricAvailable && (
          <TouchableOpacity
            onPress={onBiometricLogin}
            className="flex-row items-center justify-center space-x-2 py-4"
          >
            <Ionicons
              name={
                biometricType === "Face ID"
                  ? "face-recognition"
                  : "finger-print"
              }
              size={24}
              color="white"
            />
            <StyledText className="text-white">
              Login with {biometricType}
            </StyledText>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => setIsInvitationOn(!isInvitationOn)}
          className="items-center"
        >
          <StyledText className="text-white/80">
            {isInvitationOn
              ? "Don't have an invitation?"
              : "Already have an account?"}
          </StyledText>
        </TouchableOpacity>

        {isInvitationOn && (
          <StyledView className="space-y-4">
            <StyledView>
              <StyledText className="text-white font-medium mb-2">
                Password
              </StyledText>
              <StyledTextInput
                className="bg-white/10 border border-white/20 rounded-lg p-4 text-white"
                placeholder="Enter your password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={data.password}
                onChangeText={(text) => handleInputChange(text, "password")}
                secureTextEntry
              />
            </StyledView>

            <PrimaryButton
              text="Login"
              onPress={() => handleLogin()}
              disabled={isLoading}
            />
          </StyledView>
        )}
      </StyledView>
    </StyledView>
  );
};

export default InvitationStep;
