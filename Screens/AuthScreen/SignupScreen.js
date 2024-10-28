import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Touchable,
} from "react-native";
import { styled } from "nativewind";
import logo from "../../assets/icon.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function SignupScreen({ navigation }) {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <StyledView className="flex-1 bg-primary justify-center items-center px-6 h-screen text-white">
        <Image source={logo} className="w-64 h-64" />
        <StyledTextInput
          placeholder="Name"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />

        <StyledTextInput
          placeholder="Email"
          keyboardType="email-address"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />
        <StyledTextInput
          placeholder="Phone Number"
          keyboardType="numeric"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />
        <StyledTextInput
          placeholder="Location"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />

        <StyledTextInput
          placeholder="Password"
          secureTextEntry
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 text-white placeholder:text-white"
          placeholderTextColor={"#fff"}
        />
        <StyledTouchableOpacity className="w-full bg-secondary py-2 rounded-lg mb-6">
          <StyledText className="text-center text-white font-bold text-lg">
            Sign Up
          </StyledText>
        </StyledTouchableOpacity>
        <View className="flex flex-row items-center justify-center gap-1 mb-6">
          <Text className="text-white"> Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.replace("getStarted")}>
            <Text className="text-white font-bold">Login</Text>
          </TouchableOpacity>
        </View>
      </StyledView>
    </ScrollView>
  );
}
