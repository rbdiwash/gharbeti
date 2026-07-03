import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import PasswordStep from "./PasswordStep";
import RulesModal from "./RulesModal";
import { useAuth } from "../../../context/AuthContext";
import { useTenants } from "../../../hooks/useTenants";
import Toast from "react-native-toast-message";

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

const TenantOnboarding = ({ route }) => {
  const { invitationCode = "", email = "" } = route.params ?? {};

  const { setState } = useAuth();
  const { setPassword } = useTenants();
  const { mutate: setPasswordMutate } = setPassword();
  const navigation = useNavigation();

  const [data, setData] = useState({
    invitationCode,
    email,
    password: "",
    confirmPassword: "",
  });
  const [rulesModalVisible, setRulesModalVisible] = useState(false);

  const handleInputChange = (text, name) => {
    setData((prev) => ({ ...prev, [name]: text }));
  };

  const validatePassword = () => {
    if (data.password.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Password required",
        position: "bottom",
      });
      return;
    }
    if (data.password !== data.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match",
        position: "bottom",
      });
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
          setState((prevState) => ({
            ...prevState,
            userData: response?.data?.data,
            user: response?.data?.data?.email,
          }));
          setTimeout(() => setRulesModalVisible(true), 2000);
          if (response?.status === 202) {
            Toast.show({
              type: "success",
              text1: "Password already set",
              text2: "Please accept the rules to continue.",
              position: "bottom",
            });
          }
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed to set password",
            position: "bottom",
          });
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

  return (
    <>
      <StyledScrollView automaticallyAdjustKeyboardInsets>
        <StyledView className="flex-1 bg-primary justify-center items-center px-6 min-h-screen py-10">
          <PasswordStep
            data={data}
            handleInputChange={handleInputChange}
            validatePassword={validatePassword}
            goBack={() => navigation.replace("login")}
          />
        </StyledView>
      </StyledScrollView>
      <RulesModal
        visible={rulesModalVisible}
        onClose={() => setRulesModalVisible(false)}
        onAccept={acceptRules}
      />
    </>
  );
};

export default TenantOnboarding;
