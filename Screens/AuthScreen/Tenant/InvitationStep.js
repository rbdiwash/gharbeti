import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styled } from "nativewind";
import { Entypo } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const InvitationStep = ({
  data,
  handleInputChange,
  validateInvitation,
  navigation,
}) => {
  return (
    <>
      <StyledView className="w-full flex-row justify-center items-center mb-6">
        <View className="bg-[#27ae60] p-4 rounded-full">
          <Entypo name="home" size={40} color="white" />
        </View>
        <View className="ml-4">
          <Text className="text-white text-2xl font-bold">Tenant Portal</Text>
          <Text className="text-[#bdc3c7] text-sm">
            Welcome to your new home
          </Text>
        </View>
      </StyledView>

      <StyledView className="w-full bg-[#34495e] rounded-xl p-6 mb-6">
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
          className="bg-[#27ae60] w-full py-3 rounded-lg"
          onPress={validateInvitation}
        >
          <StyledText className="text-white text-center text-lg font-bold">
            Verify Invitation
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledView className="w-full bg-[#34495e] rounded-xl p-6">
        <StyledText className="text-white text-lg font-bold mb-4 text-center">
          Are you a landlord?
        </StyledText>

        <StyledTouchableOpacity
          className="bg-[#3498db] w-full py-3 rounded-lg mb-3"
          onPress={() => navigation.replace("login")}
        >
          <StyledText className="text-white text-center text-base font-bold">
            Login as Landlord
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="border border-[#3498db] w-full py-3 rounded-lg"
          onPress={() => navigation.replace("signup")}
        >
          <StyledText className="text-[#3498db] text-center text-base font-bold">
            Register as Landlord
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </>
  );
};

export default InvitationStep;
