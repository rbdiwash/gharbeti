import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { styled } from "nativewind";
import logo from "../../assets/icon.png";
import { OtpInput } from "react-native-otp-entry";
import { Alert } from "react-native";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const ResetPassword = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };
  const toggleConfirmVisibility = () => {
    setIsConfirmPasswordSecure(!isConfirmPasswordSecure);
  };
  return (
    <>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <StyledView className="flex-1 bg-primary justify-center items-center px-6 h-screen">
          <StyledView className="flex-row justify-center items-center mb-8">
            <Image source={logo} className="w-64 h-64" />
          </StyledView>
          <StyledText className="text-white text-base text-center mb-4">
            Enter a secured password and don't share with anyone else.
          </StyledText>
          <View className="flex flex-row items-center justify-between w-full border border-gray-300  rounded-lg mb-4 px-3">
            <StyledTextInput
              placeholder="Password"
              secureTextEntry={isPasswordSecure ? true : false}
              className="py-3 text-white w-64 text-base"
              placeholderTextColor={"#fff"}
            />
            <TouchableOpacity onPress={toggleVisibility}>
              <Entypo
                name={isPasswordSecure ? "eye" : "eye-with-line"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-between w-full border border-gray-300  rounded-lg mb-4 px-3">
            <StyledTextInput
              placeholder="Confirm Password"
              secureTextEntry={isConfirmPasswordSecure ? true : false}
              className="py-3 text-white w-64 text-base"
              placeholderTextColor={"#fff"}
            />
            <TouchableOpacity onPress={toggleConfirmVisibility}>
              <Entypo
                name={isConfirmPasswordSecure ? "eye" : "eye-with-line"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <StyledTouchableOpacity
            className="bg-[#F59A73] w-full py-2 rounded-lg mt-4"
            onPress={() => navigation.replace("login")}
          >
            <StyledText className="text-white text-center text-lg">
              Reset Password
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
    </>
  );
};

export default ResetPassword;
