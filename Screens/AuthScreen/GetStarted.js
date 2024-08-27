import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import logo from "../../assets/icon.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const GetStarted = ({ navigation }) => {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <StyledView className="flex-1 bg-primary justify-center items-center px-6 h-screen">
        <StyledView className="flex-row justify-center items-center mb-8">
          <Image source={logo} className="w-64 h-64" />
        </StyledView>
        <StyledTextInput
          placeholder="Email"
          keyboardType="email-address"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />

        <StyledTextInput
          placeholder="Password"
          secureTextEntry
          className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          placeholderTextColor={"#fff"}
        />
        <StyledTouchableOpacity
          onPress={() => navigation.replace("forget")}
          className="text-right w-full"
        >
          <StyledText className="text-right w-full text-white text-sm">
            Forgot Password?
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="bg-secondary w-full py-2 rounded-lg mt-10"
          //   onPress={() => navigation.replace("login")}
        >
          <StyledText className="text-white text-center text-lg">
            Log In
          </StyledText>
        </StyledTouchableOpacity>
        <Text className="my-4 text-white">
          New here? Register as a LANDLORD
        </Text>
        <StyledTouchableOpacity
          className="bg-[#E0E0E0] w-full py-2 rounded-lg"
          onPress={() => navigation.replace("signup")}
        >
          <StyledText className="text-[#0e2f4f] text-center text-lg">
            Register
          </StyledText>
        </StyledTouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className={"text-white bg-transparent absolute bottom-4 left-4"}
          onPress={() => navigation.replace("splash")}
        >
          <Text className={"text-white font-bold"}>Goto Intro</Text>
        </TouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default GetStarted;
