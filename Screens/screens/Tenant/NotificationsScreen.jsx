import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NotificationsScreen = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      id: 1,
      title: "Rent Due Reminder",
      message: "Your rent of ₹25,000 is due in 3 days.",
      time: "2 hours ago",
      type: "payment",
      read: false,
    },
    {
      id: 2,
      title: "Maintenance Update",
      message:
        "Your maintenance request for plumbing issue has been scheduled for tomorrow.",
      time: "5 hours ago",
      type: "maintenance",
      read: false,
    },
    {
      id: 3,
      title: "New Notice",
      message: "A new notice about water supply interruption has been posted.",
      time: "1 day ago",
      type: "notice",
      read: true,
    },
    {
      id: 4,
      title: "Message from Landlord",
      message: "You have a new message from your landlord.",
      time: "2 days ago",
      type: "message",
      read: true,
    },
    {
      id: 5,
      title: "Payment Confirmation",
      message: "Your rent payment of ₹25,000 for May has been received.",
      time: "1 month ago",
      type: "payment",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "payment":
        return (
          <FontAwesome5 name="money-bill-wave" size={20} color="#e74c3c" />
        );
      case "maintenance":
        return <FontAwesome5 name="tools" size={20} color="#3498db" />;
      case "notice":
        return <Entypo name="notification" size={20} color="#9b59b6" />;
      case "message":
        return (
          <Ionicons name="chatbubble-ellipses" size={20} color="#27ae60" />
        );
      default:
        return <Ionicons name="notifications" size={20} color="#8395a7" />;
    }
  };

  const getNavigationTarget = (type) => {
    switch (type) {
      case "payment":
        return "Payments";
      case "maintenance":
        return "Maintenance";
      case "notice":
        return "Notices";
      case "message":
        return "Chat";
      default:
        return "Home";
    }
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Notifications
          </StyledText>
          <TouchableOpacity>
            <Ionicons name="checkmark-done" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {notifications.map((notification) => (
          <StyledTouchableOpacity
            key={notification.id}
            className={`bg-white p-4 rounded-xl mb-4 shadow-md ${
              !notification.read ? "border-l-4 border-[#27ae60]" : ""
            }`}
            onPress={() =>
              navigation.navigate(getNavigationTarget(notification.type))
            }
          >
            <StyledView className="flex-row">
              <StyledView className="bg-[#f8f9fa] p-3 rounded-full mr-3">
                {getNotificationIcon(notification.type)}
              </StyledView>
              <StyledView className="flex-1">
                <StyledView className="flex-row justify-between items-center mb-1">
                  <StyledText
                    className={`text-[#1a2c4e] text-base ${
                      !notification.read ? "font-bold" : "font-medium"
                    }`}
                  >
                    {notification.title}
                  </StyledText>
                  <StyledText className="text-[#8395a7] text-xs">
                    {notification.time}
                  </StyledText>
                </StyledView>
                <StyledText
                  className={`text-[#8395a7] ${
                    !notification.read ? "font-medium" : "font-normal"
                  }`}
                >
                  {notification.message}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledTouchableOpacity>
        ))}
      </ScrollView>
    </StyledView>
  );
};

export default NotificationsScreen;
