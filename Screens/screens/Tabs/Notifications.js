import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NotificationsScreen = () => {
  // State for search query and notifications list
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Message from Ram",
      isRead: false,
      dateTime: "2024-09-24 10:15 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      title: "Your Rent is Due",
      isRead: false,
      dateTime: "2024-09-23 08:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: "3",
      title: "Meeting Reminder with Owner",
      isRead: true,
      dateTime: "2024-09-22 02:45 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: "4",
      title: "Payment Received",
      isRead: true,
      dateTime: "2024-09-21 09:00 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: "5",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-20 11:20 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: "6",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-19 04:50 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: "7",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-18 07:30 AM",
      imageUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      id: "8",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-17 03:10 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: "9",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-16 06:45 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      id: "10",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-15 12:05 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/37.jpg",
    },
    {
      id: "11",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-15 12:05 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/27.jpg",
    },
    {
      id: "12",
      title: "Maintenance Request Submitted",
      isRead: false,
      dateTime: "2024-09-15 12:05 PM",
      imageUrl: "https://randomuser.me/api/portraits/men/17.jpg",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Handle search query change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  // Handle more options button (open modal)
  const handleMoreOptions = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  // Handle actions like "Mark as Read" or "Delete"
  const handleMarkAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === selectedNotification.id ? { ...n, isRead: true } : n
      )
    );
    setModalVisible(false);
  };

  const handleDelete = () => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== selectedNotification.id)
    );
    setModalVisible(false);
  };

  // Filter notifications based on search query
  const filteredNotifications = notifications.filter((notification) =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render each notification item
  const renderItem = ({ item }) => (
    <View
      className={
        "py-3 pb-4 mx-0  flex-row justify-between items-center border-b border-gray-200 " +
        (item?.isRead ? "bg-white" : "bg-gray-100")
      }
    >
      <View className="flex flex-row gap-4 item-center px-4">
        <Image
          source={{ uri: item.imageUrl }}
          className="w-12 h-12 rounded-full"
        />

        <View>
          <Text>{item.title}</Text>
          <Text className={"text-gray-500"}>{item.dateTime}</Text>
        </View>
      </View>
      <TouchableOpacity className="p-2" onPress={() => handleMoreOptions(item)}>
        <Icon name="more-horiz" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 p-">
      {/* Search Bar */}
      <View className="px-4">
        <Text className="my-4 text-2xl font-bold">Notifications</Text>
        <View className="bg-white p-3 mb-4 rounded-lg shadow-md flex-row items-center">
          <Icon name="search" size={24} color="gray" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search notifications..."
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
      </View>
      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for More Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            className="flex-1 justify-end rounded-t-2xl"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <View className="bg-white p-4 rounded-t-xl text-left">
              <Text className="text-lg font-bold mb-4">More Options</Text>

              <Pressable
                className="flex-row  gap-4 items-center p-3"
                onPress={handleMarkAsRead}
              >
                <Icon name="message" size={24} />
                <Text className="text-primary text-left">Mark as Read</Text>
              </Pressable>

              <Pressable
                className="flex-row  gap-4 items-center p-3  rounded-lg"
                onPress={handleDelete}
              >
                <Icon name="delete" size={24} />

                <Text className="text-primary text-left">
                  Delete this Notification
                </Text>
              </Pressable>

              <Pressable
                className="flex-row  gap-4 items-center p-3 mb-4"
                onPress={() => setModalVisible(false)}
              >
                <Icon name="cancel" size={24} />
                <Text className="text-left text-gray-700">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NotificationsScreen;
