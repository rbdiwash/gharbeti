"use client";

import { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { styled } from "nativewind";
import useGharbeti from "../../../context/useGharbeti";
import PasswordStep from "./PasswordStep";
import RulesModal from "./RulesModal";
import InvitationStep from "./InvitationStep";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);

const TenantLogin = ({}) => {
  const [{ loggedIn }, { setIsLoggedIn, setUserType, loginUser }] =
    useGharbeti();
  const [step, setStep] = useState(1); // 1: Invitation code, 2: Set password
  const navigation = useNavigation();
  const [data, setData] = useState({
    invitationCode: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [isInvitationOn, setIsInvitationOn] = useState(false);

  const handleInputChange = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const validateInvitation = () => {
    setStep(2);
    // Here you would typically make an API call to validate the invitation code and email
    // if (data.invitationCode.trim() === "" || data.email.trim() === "") {
    //   alert("Please enter both invitation code and email");
    //   return;
    // }

    // // Mock validation - in a real app, this would be an API call
    // if (data.invitationCode === "123456" && data.email.includes("@")) {
    //   setStep(2);
    // } else {
    //   alert("The invitation code or email is incorrect");
    // }
  };

  const handleLogin = () => {
    const success = loginUser("tenant", "admin");
    if (!success) {
      throw new Error("Failed to save login state");
    }
    // navigation.navigate("TenantTabs", { screen: "tenantHome" });
  };

  const validatePassword = () => {
    // if (data.password.trim() === "") {
    //   alert("Please enter a password");
    //   return;
    // }

    // if (data.password !== data.confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    // Show rules modal after password is set
    setRulesModalVisible(true);
  };

  const acceptRules = () => {
    setRulesModalVisible(false);
    setIsLoggedIn(true);
    setUserType("tenant");
    navigation.navigate("tenantHome");
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
          className={"text-white bg-transparent absolute bottom-4 left-4"}
          onPress={() => navigation.replace("splash")}
        >
          <Text className={"text-white font-bold"}>Intro</Text>
        </TouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default TenantLogin;
