import { View, Text, Switch } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../../../../components/Bottomsheet";
import { PrimaryButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);

const NotificationsBottomSheet = ({
  visible,
  onClose,
  notificationSettings,
  onToggleSetting,
  onSaveSettings,
}) => {
  const notificationItems = [
    {
      id: "chatNotifications",
      title: "Chat Messages",
      icon: "chatbubble",
      color: "#3498db",
    },
    {
      id: "paymentReminders",
      title: "Payment Reminders",
      icon: "cash",
      color: "#27ae60",
    },
    {
      id: "maintenanceUpdates",
      title: "Maintenance Updates",
      icon: "construct",
      color: "#f1c40f",
    },
    {
      id: "noticeAlerts",
      title: "Notice Alerts",
      icon: "megaphone",
      color: "#e74c3c",
    },
    {
      id: "appUpdates",
      title: "App Updates",
      icon: "refresh-circle",
      color: "#9b59b6",
    },
  ];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Notification Settings"
    >
      <StyledView className="p-4">
        <StyledText className="text-[#8395a7] mb-4">
          Customize which notifications you want to receive
        </StyledText>

        {notificationItems.map((item) => (
          <StyledView
            key={item.id}
            className="flex-row items-center justify-between p-4 border-b border-[#f0f2f5]"
          >
            <StyledView className="flex-row items-center">
              <StyledView className="w-10 h-10 rounded-full bg-[#f0f2f5] justify-center items-center mr-3">
                <Ionicons name={item.icon} size={20} color={item.color} />
              </StyledView>
              <StyledText className="text-[#1a2c4e] font-medium">
                {item.title}
              </StyledText>
            </StyledView>
            <Switch
              value={notificationSettings[item.id]}
              onValueChange={() => onToggleSetting(item.id)}
              trackColor={{ false: "#e9ecef", true: "#27ae60" }}
              thumbColor={"#ffffff"}
            />
          </StyledView>
        ))}

        <StyledView className="mt-6">
          <PrimaryButton
            text="Save Settings"
            fullWidth={true}
            onPress={onSaveSettings}
          />
        </StyledView>
      </StyledView>
    </BottomSheet>
  );
};

export default NotificationsBottomSheet;
