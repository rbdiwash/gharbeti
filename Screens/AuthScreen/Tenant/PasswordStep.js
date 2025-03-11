"use client";

import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const PasswordStep = ({
  data,
  handleInputChange,
  validatePassword,
  goBack,
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordSecure(!isConfirmPasswordSecure);
  };

  return (
    <>
      <StyledView className="w-full flex-row justify-center items-center mb-6">
        <View className="bg-[#27ae60] p-4 rounded-full">
          <Entypo name="home" size={40} color="white" />
        </View>
        <View className="ml-4">
          <Text className="text-white text-2xl font-bold">Tenant Portal</Text>
          <Text className="text-[#bdc3c7] text-sm">Create your account</Text>
        </View>
      </StyledView>

      <StyledView className="w-full bg-[#34495e] rounded-xl p-6 mb-6">
        <StyledText className="text-white text-xl font-bold mb-4">
          Set Your Password
        </StyledText>

        <StyledText className="text-[#bdc3c7] mb-6">
          Create a secure password for your tenant account
        </StyledText>

        <View className="flex flex-row items-center w-full border-b border-[#7f8c8d] mb-6">
          <Entypo
            name="lock"
            size={20}
            color="#95a5a6"
            style={{ marginRight: 10 }}
          />
          <StyledTextInput
            placeholder="Password"
            secureTextEntry={isPasswordSecure}
            className="py-3 flex-1 text-white text-base"
            placeholderTextColor={"#95a5a6"}
            onChangeText={(text) => handleInputChange(text, "password")}
            value={data.password}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Entypo
              name={isPasswordSecure ? "eye" : "eye-with-line"}
              size={24}
              color="#95a5a6"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center w-full border-b border-[#7f8c8d] mb-6">
          <Entypo
            name="lock"
            size={20}
            color="#95a5a6"
            style={{ marginRight: 10 }}
          />
          <StyledTextInput
            placeholder="Confirm Password"
            secureTextEntry={isConfirmPasswordSecure}
            className="py-3 flex-1 text-white text-base"
            placeholderTextColor={"#95a5a6"}
            onChangeText={(text) => handleInputChange(text, "confirmPassword")}
            value={data.confirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Entypo
              name={isConfirmPasswordSecure ? "eye" : "eye-with-line"}
              size={24}
              color="#95a5a6"
            />
          </TouchableOpacity>
        </View>

        <StyledTouchableOpacity
          className="bg-[#27ae60] w-full py-3 rounded-lg"
          onPress={validatePassword}
        >
          <StyledText className="text-white text-center text-lg font-bold">
            Create Account
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledTouchableOpacity
        className="flex-row items-center justify-center"
        onPress={goBack}
      >
        <Entypo name="chevron-left" size={20} color="white" />
        <StyledText className="text-white text-center ml-2">
          Back to Invitation
        </StyledText>
      </StyledTouchableOpacity>
    </>
  );
};

export default PasswordStep;
