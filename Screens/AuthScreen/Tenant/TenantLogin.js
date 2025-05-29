"use client";

import { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { styled } from "nativewind";
import useGharbeti from "../../../context/useGharbeti";
import PasswordStep from "./PasswordStep";
import RulesModal from "./RulesModal";
import InvitationStep from "./InvitationStep";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { useTenants } from "../../../hooks/useTenants";
import Toast from "react-native-toast-message";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);

const TenantLogin = ({}) => {
  const {
    login: loginUser,
    isLoggingIn,
    loginError,
    setState,
    state,
  } = useAuth();
  const { verifyInvitation, setPassword } = useTenants();
  const { mutate: verifyInvitationMutate, isPending: isVerifying } =
    verifyInvitation();
  const { mutate: setPasswordMutate } = setPassword();
  const [step, setStep] = useState(1); // 1: Invitation code, 2: Set password
  const navigation = useNavigation();
  const [data, setData] = useState({
    invitationCode: "274785",
    email: "rbramesh@gmail.com",
    password: "asd123@#",
    confirmPassword: "asd123@#",
  });

  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [isInvitationOn, setIsInvitationOn] = useState(false);

  useEffect(() => {
    checkBiometricLogin();
  }, []);

  const checkBiometricLogin = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");
      if (biometricEnabled === "true") {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Login with biometric",
          fallbackLabel: "Use passcode",
        });

        if (result.success) {
          // Get stored credentials
          const storedEmail = await AsyncStorage.getItem("userEmail");
          const storedPassword = await AsyncStorage.getItem("userPassword");

          if (storedEmail && storedPassword) {
            // Attempt login with stored credentials
            const success = loginUser({
              email: storedEmail,
              password: storedPassword,
            });

            if (!success) {
              Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: "Biometric login failed. Please try again.",
                position: "bottom",
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Error during biometric login:", error);
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
      }
    );
  };

  const handleLogin = async () => {
    if (data?.email.trim() === "" || data?.password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }

    const success = loginUser({ email: data?.email, password: data?.password });

    if (success) {
      // Store credentials for biometric login if enabled
      try {
        const biometricEnabled = await AsyncStorage.getItem("biometricEnabled");
        if (biometricEnabled === "true") {
          await AsyncStorage.setItem("userEmail", data.email);
          await AsyncStorage.setItem("userPassword", data.password);
        }
      } catch (error) {
        console.error("Error storing credentials:", error);
      }
    } else {
      throw new Error("Failed to save login state");
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
      }
    );
  };

  const acceptRules = () => {
    setRulesModalVisible(false);
    // setIsLoggedIn(true);
    // setUserType("tenant");
    // navigation.navigate("Tenant Home");
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      role: "tenant",
      isLoading: false,
    }));
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
    </ScrollView>
  );
};

export default TenantLogin;
