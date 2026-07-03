import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import { useAuth } from "../../../context/AuthContext";
import { useBiometric } from "../../../hooks/useBiometric";
import Toast from "react-native-toast-message";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        setEmail(credentials.email);
        setPassword(credentials.password);
        handleLogin();
      }
    } catch (error) {
      console.error("Biometric login failed:", error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await login(email, password);
      if (response?.success) {
        // Save credentials for biometric login if enabled
        if (isBiometricEnabled) {
          await saveBiometricCredentials({ email, password });
        }
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f8f9fa]"
    >
      <StyledView className="flex-1 px-4 pt-12">
        {/* Logo and Welcome Text */}
        <StyledView className="items-center mb-8">
          <Image
            source={require("../../../assets/logo.png")}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />
          <StyledText className="text-[#1a2c4e] text-2xl font-bold">
            Welcome Back!
          </StyledText>
          <StyledText className="text-[#8395a7] text-center mt-2">
            Sign in to continue to your account
          </StyledText>
        </StyledView>

        {/* Login Form */}
        <StyledView className="space-y-4">
          <StyledView>
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Email
            </StyledText>
            <StyledTextInput
              className="bg-white border border-[#e9ecef] rounded-lg p-4"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </StyledView>

          <StyledView>
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Password
            </StyledText>
            <StyledView className="relative">
              <StyledTextInput
                className="bg-white border border-[#e9ecef] rounded-lg p-4 pr-12"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#8395a7"
                />
              </TouchableOpacity>
            </StyledView>
          </StyledView>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            className="items-end"
          >
            <StyledText className="text-[#3498db]">Forgot Password?</StyledText>
          </TouchableOpacity>

          <PrimaryButton
            text={isLoading ? "Logging in..." : "Login"}
            onPress={handleLogin}
            disabled={isLoading}
          />

          {isBiometricAvailable && (
            <TouchableOpacity
              onPress={handleBiometricLogin}
              className="items-center mt-4"
            >
              <StyledView className="flex-row items-center">
                <Ionicons
                  name={
                    biometricType === "Face ID"
                      ? "face-recognition"
                      : "finger-print"
                  }
                  size={24}
                  color="#3498db"
                />
                <StyledText className="text-[#3498db] ml-2">
                  Login with {biometricType}
                </StyledText>
              </StyledView>
            </TouchableOpacity>
          )}
        </StyledView>

        {/* Sign Up Link */}
        <StyledView className="flex-row justify-center mt-8">
          <StyledText className="text-[#8395a7]">
            Don't have an account?{" "}
          </StyledText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <StyledText className="text-[#3498db] font-medium">
              Sign Up
            </StyledText>
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
