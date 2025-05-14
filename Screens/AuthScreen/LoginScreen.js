import React, { useState } from "react";
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
import useGharbeti from "../../context/useGharbeti";
import { Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const LoginScreen = ({ navigation }) => {
  const { login: loginUser } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

  const handleInputChange = (text, name) => {
    setData({ ...data, [name]: text });
  };

  const toggleVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };
  ``;

  const handleLogin = () => {
    const success = loginUser("landlord", "admin");
    if (!success) {
      throw new Error("Failed to save login state");
    }

    // setUserType("landlord");
    // // navigation.navigate("home");
    // if (data?.email === "admin" && data?.password === "password") {
    //   setIsLoggedIn(true);
    //   navigation.navigate("Home");
    // } else {
    //   alert("Invalid credentials");
    // }
  };

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
          onChangeText={(text) => handleInputChange(text, "email")}
          value={data?.email}
        />

        <View className="flex flex-row items-center justify-between w-full border border-gray-300  rounded-lg mb-4 px-3">
          <StyledTextInput
            placeholder="Password"
            secureTextEntry={isPasswordSecure ? true : false}
            className="py-3 text-white w-64 text-base"
            placeholderTextColor={"#fff"}
            onChangeText={(text) => handleInputChange(text, "password")}
            value={data?.password}
          />
          <TouchableOpacity onPress={toggleVisibility}>
            <Entypo
              name={isPasswordSecure ? "eye" : "eye-with-line"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
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
          onPress={handleLogin}
        >
          <StyledText className="text-white text-center text-lg">
            Log In
          </StyledText>
        </StyledTouchableOpacity>
        <Text
          onPress={() => navigation.replace("tenantLogin")}
          className="my-4 text-white underline"
        >
          Are you tenant? Login as Tenant
        </Text>
        <StyledTouchableOpacity
          className="bg-[#E0E0E0] w-full py-2 rounded-lg"
          onPress={() => navigation.replace("signup")}
        >
          <StyledText className="text-[#0e2f4f] text-center text-lg">
            Register as LANDLORD
          </StyledText>
        </StyledTouchableOpacity>
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

export default LoginScreen;
