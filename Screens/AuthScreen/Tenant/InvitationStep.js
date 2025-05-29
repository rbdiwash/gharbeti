import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/logo_nobg.png";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
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
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-primary"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <StyledView className="flex-1 px-6 pb-8">
          {/* Logo and Header */}
          <StyledView className="items-center mb-8">
            <Image
              source={logo}
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            />
            <StyledText className="text-white text-2xl font-bold mb-2">
              Gharbeti
            </StyledText>
            <StyledText className="text-gray-400 text-center">
              Welcome to your new home
            </StyledText>
          </StyledView>

          {isInvitationOn ? (
            <StyledView className="space-y-4 mb-6">
              <StyledText className="text-white text-xl font-bold mb-2">
                Enter your invitation code
              </StyledText>

              <StyledView>
                <StyledText className="text-gray-400 mb-2 ml-1">
                  Invitation Code
                </StyledText>
                <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                  <Ionicons name="key-outline" size={20} color="#8395a7" />
                  <StyledTextInput
                    className="flex-1 p-4 text-white"
                    placeholder="Enter invitation code"
                    placeholderTextColor="#8395a7"
                    onChangeText={(text) =>
                      handleInputChange(text, "invitationCode")
                    }
                    value={data?.invitationCode || ""}
                  />
                </StyledView>
              </StyledView>

              <StyledView>
                <StyledText className="text-gray-400 mb-2 ml-1">
                  Email Address
                </StyledText>
                <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                  <Ionicons name="mail-outline" size={20} color="#8395a7" />
                  <StyledTextInput
                    className="flex-1 p-4 text-white"
                    placeholder="Enter your email"
                    placeholderTextColor="#8395a7"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => handleInputChange(text, "email")}
                    value={data?.email || ""}
                  />
                </StyledView>
              </StyledView>

              <SecondaryButton
                text={isLoading ? "Verifying..." : "Verify Invitation"}
                onPress={validateInvitation}
                disabled={isLoading}
                size="medium"
                parentClass="mt-4"
              />

              <StyledTouchableOpacity
                className="mt-4"
                onPress={() => setIsInvitationOn(!isInvitationOn)}
              >
                <StyledText className="text-[#3498db] text-center">
                  Already registered? Login here
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          ) : (
            <StyledView className="space-y-4 mb-6">
              <StyledText className="text-white text-xl font-bold mb-2">
                Login to Your Account
              </StyledText>

              <StyledView>
                <StyledText className="text-gray-400 mb-2 ml-1">
                  Email Address
                </StyledText>
                <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                  <Ionicons name="mail-outline" size={20} color="#8395a7" />
                  <StyledTextInput
                    className="flex-1 p-4 text-white"
                    placeholder="Enter your email"
                    placeholderTextColor="#8395a7"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => handleInputChange(text, "email")}
                    value={data.email}
                  />
                </StyledView>
              </StyledView>

              <StyledView>
                <StyledText className="text-gray-400 mb-2 ml-1">
                  Password
                </StyledText>
                <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="#8395a7"
                  />
                  <StyledTextInput
                    className="flex-1 p-4 text-white"
                    placeholder="Enter your password"
                    placeholderTextColor="#8395a7"
                    secureTextEntry={isPasswordSecure}
                    onChangeText={(text) => handleInputChange(text, "password")}
                    value={data.password}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={
                        isPasswordSecure ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color="#8395a7"
                    />
                  </TouchableOpacity>
                </StyledView>
              </StyledView>

              <SecondaryButton
                text="Login"
                onPress={handleLogin}
                size="medium"
                parentClass="mt-4"
              />

              <StyledTouchableOpacity
                className="mt-4"
                onPress={() => setIsInvitationOn(!isInvitationOn)}
              >
                <StyledText className="text-[#3498db] text-center">
                  Already invited? Enter Invitation code here
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          )}

          {/* Landlord Section */}
          <StyledView className="mt-6">
            <StyledText className="text-white text-lg font-bold mb-4 text-center">
              Are you a landlord?
            </StyledText>
            <StyledTouchableOpacity
              onPress={() => navigation.replace("signup")}
            >
              <StyledText className="text-[#3498db] text-center">
                Register as Landlord
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default InvitationStep;
