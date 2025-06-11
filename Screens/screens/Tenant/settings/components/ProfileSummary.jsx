import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

const ProfileSummary = ({ user }) => {
  return (
    <StyledView className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm flex-row items-center">
      <StyledView className="w-16 h-16 rounded-full bg-primary justify-center items-center">
        <StyledText className="text-white text-2xl font-bold">
          {user?.name?.charAt(0) || "U"}
        </StyledText>
      </StyledView>
      <StyledView className="ml-4 flex-1">
        <StyledText className="text-[#1a2c4e] text-lg font-bold">
          {user?.name || "User Name"}
        </StyledText>
        <StyledText className="text-[#8395a7]">
          {user?.email || "user@email.com"}
        </StyledText>
        <StyledText className="text-[#8395a7]">
          {user?.phone || "+91 98765 43210"}
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default ProfileSummary;
