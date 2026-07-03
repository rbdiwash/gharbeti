import { View, Text } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../../../../components/Bottomsheet";
import { PrimaryButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);

const ContactSupportBottomSheet = ({
  visible,
  onClose,
  onCallSupport,
  onEmailSupport,
}) => {
  return (
    <BottomSheet visible={visible} onClose={onClose} title="Contact Support">
      <StyledView className="p-4">
        <StyledView className="items-center mb-6">
          <StyledView className="w-16 h-16 rounded-full bg-[#27ae60] justify-center items-center mb-2">
            <Ionicons name="headset" size={32} color="white" />
          </StyledView>
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            We're here to help!
          </StyledText>
          <StyledText className="text-[#8395a7] text-center mt-1">
            Our support team is available 24/7 to assist you with any issues
          </StyledText>
        </StyledView>

        <StyledView className="bg-[#f8f9fa] rounded-xl p-4 mb-4">
          <StyledView className="flex-row items-center mb-3">
            <Ionicons
              name="call"
              size={20}
              color="#27ae60"
              style={{ marginRight: 10 }}
            />
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium">
                Call Support
              </StyledText>
              <StyledText className="text-[#8395a7]">
                +91 800-123-4567
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="flex-row items-center mb-3">
            <Ionicons
              name="mail"
              size={20}
              color="#3498db"
              style={{ marginRight: 10 }}
            />
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium">
                Email Support
              </StyledText>
              <StyledText className="text-[#8395a7]">
                support@gharbeti.com
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="flex-row items-center">
            <Ionicons
              name="chatbubbles"
              size={20}
              color="#9b59b6"
              style={{ marginRight: 10 }}
            />
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium">
                Live Chat
              </StyledText>
              <StyledText className="text-[#8395a7]">
                Available 9 AM - 6 PM
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView className="flex-row justify-between">
          <PrimaryButton
            text="Call Now"
            style={{ flex: 1, marginRight: 4 }}
            leftIcon={<Ionicons name="call" size={16} color="white" />}
            onPress={onCallSupport}
          />
          <PrimaryButton
            text="Email"
            style={{ flex: 1, marginLeft: 4 }}
            bgColor="#3498db"
            leftIcon={<Ionicons name="mail" size={16} color="white" />}
            onPress={onEmailSupport}
          />
        </StyledView>
      </StyledView>
    </BottomSheet>
  );
};

export default ContactSupportBottomSheet;
