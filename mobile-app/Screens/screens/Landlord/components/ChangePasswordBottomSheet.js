import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../../../../components/Bottomsheet";
import { PrimaryButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const ChangePasswordBottomSheet = ({
  visible,
  onClose,
  passwordData,
  onPasswordChange,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  onToggleCurrentPassword,
  onToggleNewPassword,
  onToggleConfirmPassword,
  onUpdatePassword,
  isLoading,
}) => {
  return (
    <BottomSheet visible={visible} onClose={onClose} title="Change Password">
      <StyledView className="p-4">
        <StyledView className="mb-4">
          <StyledText className="text-[#1a2c4e] font-medium mb-2">
            Current Password
          </StyledText>
          <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
            <Ionicons
              name="lock-closed"
              size={20}
              color="#8395a7"
              style={{ marginRight: 10 }}
            />
            <TextInput
              className="flex-1 text-[#1a2c4e]"
              placeholder="Enter current password"
              secureTextEntry={!showCurrentPassword}
              value={passwordData.currentPassword}
              onChangeText={(text) => onPasswordChange("currentPassword", text)}
            />
            <TouchableOpacity onPress={onToggleCurrentPassword}>
              <Ionicons
                name={showCurrentPassword ? "eye-off" : "eye"}
                size={20}
                color="#8395a7"
              />
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        <StyledView className="mb-4">
          <StyledText className="text-[#1a2c4e] font-medium mb-2">
            New Password
          </StyledText>
          <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
            <Ionicons
              name="lock-closed"
              size={20}
              color="#8395a7"
              style={{ marginRight: 10 }}
            />
            <TextInput
              className="flex-1 text-[#1a2c4e]"
              placeholder="Enter new password"
              secureTextEntry={!showNewPassword}
              value={passwordData.newPassword}
              onChangeText={(text) => onPasswordChange("newPassword", text)}
            />
            <TouchableOpacity onPress={onToggleNewPassword}>
              <Ionicons
                name={showNewPassword ? "eye-off" : "eye"}
                size={20}
                color="#8395a7"
              />
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        <StyledView className="mb-6">
          <StyledText className="text-[#1a2c4e] font-medium mb-2">
            Confirm New Password
          </StyledText>
          <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg p-3">
            <Ionicons
              name="lock-closed"
              size={20}
              color="#8395a7"
              style={{ marginRight: 10 }}
            />
            <TextInput
              className="flex-1 text-[#1a2c4e]"
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword}
              value={passwordData.confirmPassword}
              onChangeText={(text) => onPasswordChange("confirmPassword", text)}
            />
            <TouchableOpacity onPress={onToggleConfirmPassword}>
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#8395a7"
              />
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        <PrimaryButton
          text="Update Password"
          fullWidth={true}
          onPress={onUpdatePassword}
          isLoading={isLoading}
        />
      </StyledView>
    </BottomSheet>
  );
};

export default ChangePasswordBottomSheet;
