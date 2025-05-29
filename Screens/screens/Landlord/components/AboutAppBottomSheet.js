import { View, Text } from "react-native";
import { styled } from "nativewind";
import { Ionicons, Entypo } from "@expo/vector-icons";
import BottomSheet from "../../../../components/Bottomsheet";
import { PrimaryButton, OutlinedButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);

const AboutAppBottomSheet = ({
  visible,
  onClose,
  onCheckUpdates,
  onRateApp,
}) => {
  return (
    <BottomSheet visible={visible} onClose={onClose} title="About App">
      <StyledView className="p-4">
        <StyledView className="items-center mb-6">
          <StyledView className="w-20 h-20 rounded-full bg-[#1a2c4e] justify-center items-center mb-3">
            <Entypo name="home" size={40} color="white" />
          </StyledView>
          <StyledText className="text-[#1a2c4e] text-xl font-bold">
            Gharbeti
          </StyledText>
          <StyledText className="text-[#8395a7]">
            Version 1.0.0 (Build 103)
          </StyledText>
        </StyledView>

        <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-4">
          <StyledText className="text-[#1a2c4e] font-medium mb-2">
            App Details
          </StyledText>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-[#8395a7]">Version</StyledText>
            <StyledText className="text-[#1a2c4e]">1.0.0</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-[#8395a7]">Build Number</StyledText>
            <StyledText className="text-[#1a2c4e]">103</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-[#8395a7]">Release Date</StyledText>
            <StyledText className="text-[#1a2c4e]">June 15, 2023</StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between">
            <StyledText className="text-[#8395a7]">Platform</StyledText>
            <StyledText className="text-[#1a2c4e]">iOS & Android</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-6">
          <StyledText className="text-[#1a2c4e] font-medium mb-2">
            Developer
          </StyledText>
          <StyledText className="text-[#8395a7] mb-2">
            Gharbeti Technologies Pvt. Ltd.
          </StyledText>
          <StyledText className="text-[#8395a7]">
            © 2023 Gharbeti. All rights reserved.
          </StyledText>
        </StyledView>

        <StyledView className="flex-row justify-between">
          <OutlinedButton
            text="Check for Updates"
            borderColor="#3498db"
            textColor="#3498db"
            style={{ flex: 1, marginRight: 4 }}
            onPress={onCheckUpdates}
          />
          <PrimaryButton
            text="Rate App"
            style={{ flex: 1, marginLeft: 4 }}
            bgColor="#f1c40f"
            onPress={onRateApp}
          />
        </StyledView>
      </StyledView>
    </BottomSheet>
  );
};

export default AboutAppBottomSheet;
