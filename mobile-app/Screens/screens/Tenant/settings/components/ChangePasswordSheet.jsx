import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton } from "../../../../../components/Buttons";
import BottomSheet from "../../../../../components/Bottomsheet";
import { useState } from "react";
import { useProfile } from "../../../../../hooks/useProfile";
import Toast from "react-native-toast-message";
import { useStateData } from "../../../../../hooks/useStateData";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const ChangePasswordSheet = ({ visible, onClose }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { profile } = useStateData();
  console.log(profile);

  const { mutate, isLoading } = useProfile().changePasswordRequest();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value,
    });
  };
  const onSubmit = () => {
    const payload = {
      email: profile?.email,
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };
    mutate(
      { data: payload },
      {
        onSuccess: () => {
          Toast.show({
            text1: "Success",
            text2: "Password updated successfully",
            type: "success",
          });
          onClose();
        },
        onError: (error) => {
          console.log(error.response.data?.message);
          alert("Error !! " + error.response.data?.message);
        },
      }
    );
  };

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
              onChangeText={(text) =>
                handlePasswordChange("currentPassword", text)
              }
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            >
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
              onChangeText={(text) => handlePasswordChange("newPassword", text)}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
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
              onChangeText={(text) =>
                handlePasswordChange("confirmPassword", text)
              }
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
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
          onPress={() => {
            onSubmit(passwordData);
            onClose();
          }}
        />
      </StyledView>
    </BottomSheet>
  );
};

export default ChangePasswordSheet;
