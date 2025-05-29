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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useChat } from "../../../hooks/useChat";
import { useStateData } from "../../../hooks/useStateData";
import { getInitials } from "../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledImage = styled(Image);

// Mock tenants data

const LandlordChatScreen = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const { profile, initializeData } = useStateData();
  const [selectedTenant, setSelectedTenant] = useState(profile?.tenants[0]);
  const [showTenantSelector, setShowTenantSelector] = useState(false);

  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  const { tenantId, tenantData } = useRoute().params || {};

  useEffect(() => {
    if (tenantData) {
      setSelectedTenant(tenantData);
    }
  }, [tenantData]);

  const {
    data: messageArray,
    isLoading: isMessageLoading,
    refetch,
  } = useChat().getChats(profile?._id, selectedTenant?._id);
  const { mutate: postChat, isLoading } = useChat().postChat();

  useEffect(() => {
    if (messageArray?.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messageArray]);

  useEffect(() => {
    initializeData();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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

    const payload = {
      senderId: profile?._id,
      receiverId: selectedTenant?._id,
      message: message,
    };
    setMessage("");
    postChat(payload, {
      onSuccess: (response) => {
        refetch();
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
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
            {getInitials(item.name)}
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
          {item?.tenantDetails?.address ?? item?.address}
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
          {selectedTenant?.image ? (
            <StyledImage
              source={{ uri: selectedTenant?.image }}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <StyledView className="w-8 h-8 rounded-full bg-[#3498db] justify-center items-center">
              <StyledText className="text-white font-bold">
                {getInitials(selectedTenant?.name)}
              </StyledText>
            </StyledView>
          )}

          <StyledView className="flex-1 ml-2">
            <StyledText className="text-white font-bold">
              {selectedTenant?.name}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">
              {selectedTenant?.tenantDetails?.address ??
                selectedTenant?.address}
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
              data={profile?.tenants}
              renderItem={renderTenantItem}
              keyExtractor={(item) => item._id.toString()}
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
          {messageArray?.map((msg, index) => (
            <StyledView
              key={msg._id + index}
              className={`mb-4 max-w-[80%] ${
                msg.receiverId !== profile?._id
                  ? "self-end ml-auto"
                  : "self-start"
              }`}
            >
              <StyledView
                className={`p-3 rounded-2xl w-full ${
                  msg.senderId === profile?._id
                    ? "bg-primary rounded-br-none ml-auto"
                    : "bg-[#e9ecef] rounded-bl-none"
                }`}
              >
                <StyledText
                  className={`${
                    msg.senderId === profile?._id
                      ? "text-white "
                      : "text-[#1a2c4e]"
                  }`}
                >
                  {msg.message}
                </StyledText>
              </StyledView>
              <StyledView
                className={`flex-row items-center mt-1 ${
                  msg.senderId !== profile?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <StyledText className="text-[#8395a7] text-xs">
                  {new Date(msg.createdAt).toLocaleString()}
                </StyledText>
                {msg.senderId !== profile?._id && (
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
