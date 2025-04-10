"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const NotificationsScreen = () => {
  const navigation = useNavigation();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Rent Due Reminder",
      message: "Your rent of Rs 25,000 is due in 3 days.",
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
      message: "Your rent payment of Rs 25,000 for May has been received.",
      time: "1 month ago",
      type: "payment",
      read: true,
    },
    {
      id: 6,
      title: "Payment Confirmation",
      message: "Your rent payment of Rs 25,000 for May has been received.",
      time: "1 month ago",
      type: "payment",
      read: true,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotifications = notifications.filter((notification) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      notification.title.toLowerCase().includes(query) ||
      notification.message.toLowerCase().includes(query)
    );
  });

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

  const handleNotificationPress = (notification) => {
    setSelectedNotification(notification);
    setActionModalVisible(true);
  };

  const handleMarkAsRead = () => {
    if (!selectedNotification) return;

    setNotifications(
      notifications.map((notification) =>
        notification.id === selectedNotification.id
          ? { ...notification, read: true }
          : notification
      )
    );

    setActionModalVisible(false);
    setSelectedNotification(null);
  };

  const handleDelete = () => {
    if (!selectedNotification) return;

    setNotifications(
      notifications.filter(
        (notification) => notification.id !== selectedNotification.id
      )
    );

    setActionModalVisible(false);
    setSelectedNotification(null);
  };

  const handleNavigate = () => {
    if (!selectedNotification) return;

    // Mark as read when navigating
    setNotifications(
      notifications.map((notification) =>
        notification.id === selectedNotification.id
          ? { ...notification, read: true }
          : notification
      )
    );

    setActionModalVisible(false);
    navigation.navigate(getNavigationTarget(selectedNotification.type));
    setSelectedNotification(null);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Notifications
          </StyledText>
          <TouchableOpacity onPress={markAllAsRead}>
            <Ionicons name="checkmark-done" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>

        {/* Search Bar */}
        <StyledView className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#8395a7" />
          <TextInput
            className="flex-1 ml-2 text-[#1a2c4e]"
            placeholder="Search notifications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8395a7" />
            </TouchableOpacity>
          )}
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1 px-4 pt-6">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <StyledTouchableOpacity
              key={notification.id}
              className={`bg-white p-4 rounded-xl mb-4 shadow-md ${
                !notification.read ? "border-l-4 border-[#27ae60]" : ""
              }`}
              onPress={() => handleNotificationPress(notification)}
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
          ))
        ) : (
          <StyledView className="items-center justify-center py-10">
            <Ionicons name="notifications-off" size={50} color="#e9ecef" />
            <StyledText className="text-[#8395a7] mt-2 text-center">
              {searchQuery
                ? "No notifications found matching your search"
                : "No notifications found"}
            </StyledText>
          </StyledView>
        )}
      </StyledScrollView>

      {/* Action Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}
      >
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-xl overflow-hidden">
            {/* Notification Preview */}
            {selectedNotification && (
              <StyledView className="p-4 border-b border-[#f0f2f5]">
                <StyledText className="text-[#1a2c4e] text-lg font-bold mb-1">
                  {selectedNotification.title}
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  {selectedNotification.message}
                </StyledText>
              </StyledView>
            )}

            {/* Action Options */}
            <StyledTouchableOpacity
              className="flex-row items-center p-4 border-b border-[#f0f2f5]"
              onPress={handleNavigate}
            >
              <Ionicons name="open-outline" size={22} color="#3498db" />
              <StyledText className="text-[#1a2c4e] font-medium ml-3">
                View Details
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="flex-row items-center p-4 border-b border-[#f0f2f5]"
              onPress={handleMarkAsRead}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color="#27ae60"
              />
              <StyledText className="text-[#1a2c4e] font-medium ml-3">
                {selectedNotification?.read ? "Mark as unread" : "Mark as read"}
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="flex-row items-center p-4 border-b border-[#f0f2f5]"
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" size={22} color="#e74c3c" />
              <StyledText className="text-[#1a2c4e] font-medium ml-3">
                Delete notification
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="p-4 items-center"
              onPress={() => setActionModalVisible(false)}
            >
              <StyledText className="text-[#8395a7] font-bold">
                Cancel
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default NotificationsScreen;
