"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledImage = styled(Image);

// Mock tenants data
const tenants = [
  {
    id: 1,
    name: "John Doe",
    property: "Apartment 303, Green Valley",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    unread: 2,
    lastActive: "2 min ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    property: "Apartment 205, Green Valley",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    unread: 0,
    lastActive: "1 hour ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    property: "Apartment 410, Green Valley",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    unread: 5,
    lastActive: "5 min ago",
  },
  {
    id: 4,
    name: "Emily Wilson",
    property: "Apartment 112, Green Valley",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    unread: 0,
    lastActive: "Yesterday",
  },
  {
    id: 5,
    name: "Luke Findel",
    property: "Apartment 501, Green Valley",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    unread: 1,
    lastActive: "Just now",
  },
];

const LandlordChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);
  const [showTenantSelector, setShowTenantSelector] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello ${tenants[0].name}, how can I help you today?`,
      sender: "landlord",
      time: "10:30 AM",
      read: true,
    },
    {
      id: 2,
      text: "I wanted to ask about the water heater in the bathroom. It seems to be not working properly.",
      sender: "tenant",
      time: "10:32 AM",
      read: true,
    },
    {
      id: 3,
      text: "I'll send a maintenance person tomorrow between 10 AM and 12 PM. Will you be available?",
      sender: "landlord",
      time: "10:35 AM",
      read: true,
    },
  ]);

  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // Reset messages when tenant changes
    setMessages([
      {
        id: 1,
        text: `Hello ${selectedTenant.name}, how can I help you today?`,
        sender: "landlord",
        time: "10:30 AM",
        read: true,
      },
      {
        id: 2,
        text: "I wanted to ask about the water heater in the bathroom. It seems to be not working properly.",
        sender: "tenant",
        time: "10:32 AM",
        read: true,
      },
      {
        id: 3,
        text: "I'll send a maintenance person tomorrow between 10 AM and 12 PM. Will you be available?",
        sender: "landlord",
        time: "10:35 AM",
        read: true,
      },
    ]);
  }, [selectedTenant]);

  const toggleTenantSelector = () => {
    setShowTenantSelector(!showTenantSelector);
    Animated.timing(dropdownAnim, {
      toValue: showTenantSelector ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const selectTenant = (tenant) => {
    setSelectedTenant(tenant);
    setShowTenantSelector(false);
    Animated.timing(dropdownAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "landlord",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate tenant response
    setTimeout(() => {
      const tenantResponse = {
        id: messages.length + 2,
        text: "Yes, I'll be available. Thank you for arranging this so quickly!",
        sender: "tenant",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        read: false,
      };

      setMessages((prevMessages) => [...prevMessages, tenantResponse]);
    }, 2000);
  };

  const renderTenantItem = ({ item }) => (
    <StyledTouchableOpacity
      className="flex-row items-center p-3 border-b border-[#f0f2f5]"
      onPress={() => selectTenant(item)}
    >
      {item.image ? (
        <StyledImage
          source={{ uri: item.image }}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <StyledView className="w-10 h-10 rounded-full bg-[#3498db] justify-center items-center">
          <StyledText className="text-white font-bold">
            {item.name.charAt(0)}
          </StyledText>
        </StyledView>
      )}

      <StyledView className="flex-1 ml-3">
        <StyledView className="flex-row justify-between">
          <StyledText className="text-[#1a2c4e] font-bold">
            {item.name}
          </StyledText>
          <StyledText className="text-[#8395a7] text-xs">
            {item.lastActive}
          </StyledText>
        </StyledView>
        <StyledText className="text-[#8395a7] text-xs">
          {item.property}
        </StyledText>
      </StyledView>

      {item.unread > 0 && (
        <StyledView className="bg-primary w-5 h-5 rounded-full items-center justify-center ml-2">
          <StyledText className="text-white text-xs">{item.unread}</StyledText>
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#f8f9fa]"
    >
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center mb-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Messages
          </StyledText>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>

        {/* Tenant Selector */}
        <StyledTouchableOpacity
          className="flex-row items-center bg-[#2c3e50] p-2 rounded-lg mt-2"
          onPress={toggleTenantSelector}
        >
          {selectedTenant.image ? (
            <StyledImage
              source={{ uri: selectedTenant.image }}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <StyledView className="w-8 h-8 rounded-full bg-[#3498db] justify-center items-center">
              <StyledText className="text-white font-bold">
                {selectedTenant.name.charAt(0)}
              </StyledText>
            </StyledView>
          )}

          <StyledView className="flex-1 ml-2">
            <StyledText className="text-white font-bold">
              {selectedTenant.name}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">
              {selectedTenant.property}
            </StyledText>
          </StyledView>

          <Ionicons
            name={showTenantSelector ? "chevron-up" : "chevron-down"}
            size={20}
            color="white"
          />
        </StyledTouchableOpacity>
      </StyledView>

      {/* Tenant Selector Dropdown */}
      <Modal
        visible={showTenantSelector}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowTenantSelector(false)}
      >
        <StyledView className="flex-1 bg-black/50">
          <StyledTouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setShowTenantSelector(false)}
          />

          <Animated.View
            className="bg-white rounded-t-xl"
            style={{
              transform: [
                {
                  translateY: dropdownAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            }}
          >
            <StyledView className="p-4 border-b border-[#f0f2f5]">
              <StyledText className="text-[#1a2c4e] text-lg font-bold">
                Select Tenant
              </StyledText>
            </StyledView>

            <FlatList
              data={tenants}
              renderItem={renderTenantItem}
              keyExtractor={(item) => item.id.toString()}
              style={{ maxHeight: 300 }}
            />

            <StyledTouchableOpacity
              className="p-4 items-center border-t border-[#f0f2f5]"
              onPress={() => setShowTenantSelector(false)}
            >
              <StyledText className="text-[#e74c3c] font-bold">
                Cancel
              </StyledText>
            </StyledTouchableOpacity>
          </Animated.View>
        </StyledView>
      </Modal>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {messages.map((msg, index) => (
            <StyledView
              key={msg.id}
              className={`mb-4 max-w-[80%] ${
                msg.sender === "landlord" ? "self-end ml-auto" : "self-start"
              }`}
            >
              <StyledView
                className={`p-3 rounded-2xl ${
                  msg.sender === "landlord"
                    ? "bg-primary rounded-tr-none"
                    : "bg-[#e9ecef] rounded-tl-none"
                }`}
              >
                <StyledText
                  className={`${
                    msg.sender === "landlord" ? "text-white" : "text-[#1a2c4e]"
                  }`}
                >
                  {msg.text}
                </StyledText>
              </StyledView>
              <StyledView
                className={`flex-row items-center mt-1 ${
                  msg.sender === "landlord" ? "justify-end" : "justify-start"
                }`}
              >
                <StyledText className="text-[#8395a7] text-xs">
                  {msg.time}
                </StyledText>
                {msg.sender === "landlord" && (
                  <Ionicons
                    name={msg.read ? "checkmark-done" : "checkmark"}
                    size={16}
                    color={msg.read ? "#3498db" : "#8395a7"}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </StyledView>
            </StyledView>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Message Input */}
      <StyledView className="p-4 border-t border-[#e9ecef] bg-white">
        <StyledView className="flex-row items-center">
          <StyledTextInput
            className="flex-1 bg-[#f8f9fa] rounded-full px-4 py-2 mr-2"
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <StyledTouchableOpacity
            className="bg-primary w-12 h-12 rounded-full justify-center items-center"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={20} color="white" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default LandlordChatScreen;
