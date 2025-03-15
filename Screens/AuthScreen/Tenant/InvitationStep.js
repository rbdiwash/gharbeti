import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";
import logo from "../../../assets/logo_nobg.png";
import { useState } from "react";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const InvitationStep = ({
  data,
  handleInputChange,
  validateInvitation,
  navigation,
  isInvitationOn,
  setIsInvitationOn,
  handleLogin,
}) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const togglePasswordVisibility = () => {
    setIsPasswordSecure(!isPasswordSecure);
  };

  return (
    <>
      <StyledView className="w-full flex-row justify-center items-center mb-6">
        <View className="bg- border border-white p-4 rounded-full">
          <Image source={logo} name="home" className="w-14 h-14" />
        </View>
        <View className="ml-4">
          <Text className="text-white text-2xl font-bold">Tenant Portal</Text>
          <Text className="text-[#bdc3c7] text-sm">
            Welcome to your new home
          </Text>
        </View>
      </StyledView>

      {isInvitationOn ? (
        <StyledView className="w-full bg-primary2 rounded-xl p-6 mb-6">
          <StyledText className="text-white text-xl font-bold mb-4">
            Enter Your Invitation
          </StyledText>

          <StyledText className="text-[#bdc3c7] mb-4">
            Please enter the invitation code and email provided by your landlord
          </StyledText>

          <StyledTextInput
            placeholder="Invitation Code"
            className="w-full border-b border-[#7f8c8d] p-3 mb-4 text-white placeholder:text-[#95a5a6]"
            placeholderTextColor={"#95a5a6"}
            onChangeText={(text) => handleInputChange(text, "invitationCode")}
            value={data.invitationCode}
          />

          <StyledTextInput
            placeholder="Email"
            keyboardType="email-address"
            className="w-full border-b border-[#7f8c8d] p-3 mb-6 text-white placeholder:text-[#95a5a6]"
            placeholderTextColor={"#95a5a6"}
            onChangeText={(text) => handleInputChange(text, "email")}
            value={data.email}
          />

          <StyledTouchableOpacity
            className="bg-secondary w-full py-3 rounded-lg"
            onPress={validateInvitation}
          >
            <StyledText className="text-white text-center text-lg font-bold">
              Verify Invitation
            </StyledText>
          </StyledTouchableOpacity>
          <StyledText
            className="text-white text-center mt-2 underline"
            onPress={() => setIsInvitationOn(!isInvitationOn)}
          >
            Already registered? Login here.
          </StyledText>
        </StyledView>
      ) : (
        <StyledView className="w-full bg-primary2 rounded-xl p-6 mb-6">
          <StyledText className="text-white text-xl font-bold mb-4">
            Enter login details
          </StyledText>

          <StyledText className="text-[#bdc3c7] mb-4">
            Please enter your email & password if you are already registered.
          </StyledText>

          <StyledTextInput
            placeholder="Email Address"
            className="py-3 flex-1 text-white text-base border-b border-[#7f8c8d]"
            placeholderTextColor={"#95a5a6"}
            onChangeText={(text) => handleInputChange(text, "email")}
            value={data.email}
            keyboardType="email-address"
          />

          <View className="flex flex-row items-center w-full border-b border-[#7f8c8d] mb-6">
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
          <StyledTouchableOpacity
            className="bg-secondary w-full py-3 rounded-lg"
            onPress={handleLogin}
          >
            <StyledText className="text-white text-center text-lg font-bold">
              Login
            </StyledText>
          </StyledTouchableOpacity>
          <StyledText
            className="text-white text-center mt-2 underline"
            onPress={() => setIsInvitationOn(!isInvitationOn)}
          >
            Already invited? Enter Invitation code here.
          </StyledText>
        </StyledView>
      )}
      <StyledView className="w-full bg-primary2 rounded-xl p-6">
        <StyledText className="text-white text-lg font-bold mb-4 text-center">
          Are you a landlord?
        </StyledText>

        <StyledTouchableOpacity
          className="bg-secondary w-full py-3 rounded-lg mb-3"
          onPress={() => navigation.replace("login")}
        >
          <StyledText className="text-white text-center text-base font-bold">
            Login as Landlord
          </StyledText>
        </StyledTouchableOpacity>

        {/* <StyledTouchableOpacity
          className="border border-[#3498db] w-full py-3 rounded-lg"
          onPress={() => navigation.replace("signup")}
        >
          <StyledText className="text-[#3498db] text-center text-base font-bold">
            Register as Landlord
          </StyledText>
        </StyledTouchableOpacity> */}
        <StyledText
          className="text-[#fff] underline text-center"
          onPress={() => navigation.replace("signup")}
        >
          Register as Landlord
        </StyledText>
      </StyledView>
    </>
  );
};

export default InvitationStep;
