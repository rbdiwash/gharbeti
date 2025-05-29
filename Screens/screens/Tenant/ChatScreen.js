"use client";

import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useChat } from "../../../hooks/useChat";
import { useStateData } from "../../../hooks/useStateData";
import { getInitials } from "../../helper/const";
// import { useChat } from "../../../hooks/useChat";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const { profile, initializeData } = useStateData();
  const scrollViewRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { mutate: postChat, isLoading } = useChat().postChat();
  const {
    data: messageArray,
    isLoading: isMessageLoading,
    refetch,
  } = useChat().getChats(profile?._id, profile?.landlord?._id);

  useEffect(() => {
    refetch();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (messageArray?.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [messageArray]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const payload = {
      senderId: profile?._id,
      receiverId: profile?.landlord?._id,
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-[#f8f9fa]"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      style={{ flex: 1 }}
    >
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row items-center">
          <StyledView className="w-10 h-10 rounded-full bg-white justify-center items-center mr-3">
            <StyledText className="text-primary font-bold">
              {getInitials(profile?.landlord?.name)}
            </StyledText>
          </StyledView>
          <StyledView>
            <StyledText className="text-white text-lg font-bold">
              {profile?.landlord?.name}
            </StyledText>
            <StyledView className="flex-row items-center">
              <StyledView className="mr-2 w-2 h-2 rounded-full bg-green"></StyledView>
              <StyledText className="text-[#8395a7]">Online</StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        // keyboardShouldPersistTaps="handled"
        // keyboardDismissMode="on-drag"
        // contentContainerStyle={{ flexGrow: 1 }}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {messageArray?.map((msg, index) => (
            <StyledView
              key={index}
              className={`mb-4 max-w-[80%] ${
                message?.senderId !== profile?._id
                  ? "self-end ml-auto"
                  : "self-start"
              }`}
            >
              <StyledView
                className={`p-3 rounded-2xl ${
                  message?.senderId !== profile?._id
                    ? "bg-primary rounded-br-none"
                    : "bg-[#e9ecef] rounded-tl-none"
                }`}
              >
                <StyledText
                  className={`${
                    message?.senderId !== profile?._id
                      ? "text-white"
                      : "text-[#1a2c4e]"
                  }`}
                >
                  {msg.message}
                </StyledText>
              </StyledView>
              <StyledView
                className={`flex-row items-center mt-1 ${
                  message?.senderId === profile?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <StyledText className="text-[#8395a7] text-xs">
                  {new Date(msg.createdAt).toLocaleString()}
                </StyledText>
                {message?.senderId === profile?._id && (
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
      <StyledView className="p-2 border-t border-[#e9ecef] bg-white">
        <StyledView className="flex-row items-center">
          <StyledTextInput
            className="flex-1 bg-[#f8f9fa] rounded-full px-4 py-2 mr-2"
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={{ maxHeight: 100 }}
            textAlignVertical="center"
          />
          <StyledTouchableOpacity
            className="bg-primary w-10 h-10 rounded-full justify-center items-center"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={20} color="white" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
