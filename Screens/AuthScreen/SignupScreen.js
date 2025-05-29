import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import logo from "../../assets/icon.png";
import { useAuth } from "../../context/AuthContext";
import Toast from "react-native-toast-message";
import { PrimaryButton, SecondaryButton } from "../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignupScreen({ navigation }) {
  const { register, isRegistering } = useAuth();

  const [formData, setFormData] = useState({
    name: "Mr Landlord",
    email: "landlord@gmail.com",
    phoneNumber: "07777777777",
    address: "Kohalpur, Banke",
    password: "Asd123@#",
    role: "landlord",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = () => {
    const success = register(formData);
    if (success) {
      Toast.show({
        type: "success",
        text1: "Registration successful",
        position: "bottom",
      });
      navigation.navigate("tenantLogin");
    }
    if (!success) {
      throw new Error("Failed to save login state");
    }
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
        <StyledView className="flex-1 px-6 py-8">
          {/* Logo and Header */}
          <StyledView className="items-center mb-8">
            <Image
              source={logo}
              className="w-32 h-32 mb-4"
              resizeMode="contain"
            />
            <StyledText className="text-white text-2xl font-bold mb-2">
              Create Account
            </StyledText>
            <StyledText className="text-gray-400 text-center">
              Join Gharbeti as a landlord and start managing your properties
            </StyledText>
          </StyledView>

          {/* Form Fields */}
          <StyledView className="space-y-4 mb-4">
            <StyledView>
              <StyledText className="text-gray-400 mb-2 ml-1">
                Full Name
              </StyledText>
              <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                <Ionicons name="person-outline" size={20} color="#8395a7" />
                <StyledTextInput
                  className="flex-1 p-4 text-white"
                  placeholder="Enter your full name"
                  placeholderTextColor="#8395a7"
                  value={formData?.name}
                  onChangeText={(value) => handleInputChange("name", value)}
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
                  value={formData?.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                />
              </StyledView>
            </StyledView>

            <StyledView>
              <StyledText className="text-gray-400 mb-2 ml-1">
                Phone Number
              </StyledText>
              <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                <Ionicons name="call-outline" size={20} color="#8395a7" />
                <StyledTextInput
                  className="flex-1 p-4 text-white"
                  placeholder="Enter your phone number"
                  placeholderTextColor="#8395a7"
                  keyboardType="phone-pad"
                  value={formData?.phoneNumber}
                  onChangeText={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                />
              </StyledView>
            </StyledView>

            <StyledView>
              <StyledText className="text-gray-400 mb-2 ml-1">
                Address
              </StyledText>
              <StyledView className="flex-row items-center bg-[#2a3c5e] rounded-xl px-4">
                <Ionicons name="location-outline" size={20} color="#8395a7" />
                <StyledTextInput
                  className="flex-1 p-4 text-white"
                  placeholder="Enter your address"
                  placeholderTextColor="#8395a7"
                  value={formData?.address}
                  onChangeText={(value) => handleInputChange("address", value)}
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
                  placeholder="Create a password"
                  placeholderTextColor="#8395a7"
                  secureTextEntry={!showPassword}
                  value={formData?.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#8395a7"
                  />
                </TouchableOpacity>
              </StyledView>
            </StyledView>
          </StyledView>

          {/* Sign Up Button */}

          <SecondaryButton
            text={isRegistering ? "Creating Account..." : "Create Account"}
            onPress={handleSignup}
            disabled={isRegistering}
            size="medium"
            parentClass="mb-8"
          />

          {/* Login Link */}
          <StyledView className="flex-row justify-center items-center mt-2">
            <StyledText className="text-gray-400">
              Already have an account?
            </StyledText>
            <TouchableOpacity onPress={() => navigation.replace("tenantLogin")}>
              <StyledText className="text-[#3498db] font-bold ml-1">
                Login
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
