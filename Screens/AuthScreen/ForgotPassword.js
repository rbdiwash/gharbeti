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
import { AntDesign } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const ForgotPassword = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <StyledView className="flex-1 bg-primary justify-center items-center px-6 h-screen">
          <StyledView className="flex-row justify-center items-center mb-8">
            <Image source={logo} className="w-64 h-64" />
          </StyledView>
          <StyledText className="text-white text-base text-center mb-4">
            Enter your Mobile number. We will send you a confirmation code.
          </StyledText>
          <StyledTextInput
            placeholder="Phone Number"
            className="w-full border border-gray-300 text-white p-3 rounded-lg mb-4"
            placeholderTextColor={"#fff"}
            keyboardType="numeric"
          />
          <StyledTouchableOpacity
            className="bg-[#F59A73] w-full py-2 rounded-lg mt-4"
            onPress={() => setModalVisible(true)}
          >
            <StyledText className="text-white text-center text-lg">
              Send OTP
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="bg-[#E0E0E0] w-full py-2 rounded-lg mt-4"
            onPress={() => navigation.replace("login")}
          >
            <StyledText className="text-[#0e2f4f] text-center text-lg">
              Go back to Login
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </ScrollView>
      <View className="flex flex-1 items-center justify-center">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex flex-1 justify-center items-center bg-[#00000046]">
            <View className="bg-[#fff] px-10 py-4 w-3/4 rounded-lg relative">
              <StyledText className="text-primary font-bold text-xl text-center my-4">
                Verify OTP
              </StyledText>
              <OtpInput
                numberOfDigits={4}
                onTextChange={(text) => console.log(text)}
                focusColor="green"
                focusStickBlinkingDuration={500}
                onFilled={(text) => console.log(`OTP is ${text}`)}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                theme={{
                  containerStyle: { backgroundColor: "white", padding: 2 },
                  pinCodeContainerStyle: {
                    backgroundColor: "#fff",
                    paddingRight: 0,
                  },
                  pinCodeTextStyle: { backgroundColor: "transparent" },
                  focusStickStyle: { backgroundColor: "transparent" },
                  focusedPinCodeContainerStyle: {
                    backgroundColor: "transparent",
                  },
                }}
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setModalVisible(!modalVisible)}
              >
                <AntDesign name="closecircle" size={24} color="black" />
              </TouchableOpacity>
              <StyledTouchableOpacity
                className="bg-primary px-1 py-2 rounded-lg mt-10"
                onPress={() => navigation.replace("reset")}
              >
                <StyledText className="text-white text-center text-lg">
                  Verify
                </StyledText>
              </StyledTouchableOpacity>
              <StyledTouchableOpacity className="bg-secondary px-1 py-2 rounded-lg mt-2">
                <StyledText className="text-white text-center text-lg">
                  Resend OTP
                </StyledText>
              </StyledTouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default ForgotPassword;
