import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome"; // For the action button icon

const ChatScreen = ({ navigation }) => {
  // Mock Tenant List
  const tenants = [
    {
      id: "1",
      name: "Ram Sharma",
      imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Sita Gurung",
      imageUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: "3",
      name: "Krishna Bhattarai",
      imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  // Mock Chat Data
  const mockMessages = [
    { id: "1", text: "Hello!", sender: "tenant", timestamp: "10:30 AM" },
    {
      id: "2",
      text: "Hi! How can I help you?",
      sender: "landlord",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      text: "The water tap is leaking.",
      sender: "tenant",
      timestamp: "10:34 AM",
    },
  ];
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [isModalVisible, setModalVisible] = useState(false); // State to toggle tenant selection modal

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "landlord",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const renderMessage = ({ item }) => (
    <View>
      <View
        className={`p-3 my-2 rounded-lg max-w-[70%] ${
          item.sender === "landlord" ? "bg-primary ml-auto" : "bg-gray-200"
        }`}
      >
        <Text
          className={`text-sm ${
            item.sender === "landlord" ? "text-white" : "text-gray-800"
          }`}
        >
          {item.text}
        </Text>
        <Text
          className={`text-xs  ${
            item.sender === "landlord"
              ? "text-gray-400 ml-auto "
              : "text-gray-500 ml-auto"
          }`}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 relative px-4 h-full">
      {/* Tenant Dropdown */}

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-lg w-3/4 p-5">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Select Tenant</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon size={24} color="black" name="times" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {tenants.map((tenant) => (
                <TouchableOpacity
                  key={tenant.id}
                  className="flex-row items-center py-3 border-b border-gray-200"
                  onPress={() => {
                    setSelectedTenant(tenant);
                    setModalVisible(false);
                  }}
                >
                  <Image
                    source={{ uri: tenant.imageUrl }}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <Text className="text-lg">{tenant.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View className="flex-row items-center bg-white p-3 rounded-lg shadow my-4">
        <Image
          source={{ uri: selectedTenant.imageUrl }}
          className="w-8 h-8 rounded-full mr-3"
        />
        <Text className="text-lg text-gray-800 flex-1">
          {selectedTenant.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon size={24} color="black" name="chevron-down" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
      />

      {/* Input Section */}
      <View className="flex-row items-center bg-white p-2 mb-3 rounded-lg shadow mt-auto">
        <TextInput
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          className="flex-1 text-lg px-3"
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="p-2 bg-primary rounded-full"
        >
          <Icon size={24} color="white" name="send" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
