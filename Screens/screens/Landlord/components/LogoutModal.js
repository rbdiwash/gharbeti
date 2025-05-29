import { View, Text, Modal, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton, OutlinedButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LogoutModal = ({ visible, onClose, onLogout }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-center items-center bg-black/50">
        <StyledView className="bg-white rounded-xl p-6 w-[80%] max-w-md">
          <StyledView className="items-center mb-4">
            <Ionicons name="log-out" size={50} color="#e74c3c" />
            <StyledText className="text-[#1a2c4e] text-xl font-bold mt-2">
              Logout
            </StyledText>
            <StyledText className="text-[#8395a7] text-center mt-2">
              Are you sure you want to logout from your account?
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mt-4">
            <OutlinedButton
              text="Cancel"
              borderColor="#8395a7"
              textColor="#8395a7"
              style={{ flex: 1, marginRight: 8 }}
              onPress={onClose}
            />
            <PrimaryButton
              text="Logout"
              bgColor="#e74c3c"
              style={{ flex: 1, marginLeft: 8 }}
              onPress={onLogout}
            />
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default LogoutModal;
