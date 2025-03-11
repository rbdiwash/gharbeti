"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native"
import { styled } from "nativewind"
import { Ionicons } from "@expo/vector-icons"

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledTextInput = styled(TextInput)

const ChatScreen = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello John, how can I help you today?",
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
  ])

  const scrollViewRef = useRef()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  const sendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "tenant",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate landlord response
    setTimeout(() => {
      const landlordResponse = {
        id: messages.length + 2,
        text: "I'll make a note of that. Is there anything else you need help with?",
        sender: "landlord",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      }

      setMessages((prevMessages) => [...prevMessages, landlordResponse])
    }, 2000)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-4 px-4">
        <StyledView className="flex-row items-center">
          <StyledView className="w-10 h-10 rounded-full bg-[#3498db] justify-center items-center mr-3">
            <StyledText className="text-white font-bold">RL</StyledText>
          </StyledView>
          <StyledView>
            <StyledText className="text-white text-lg font-bold">Raj Landlord</StyledText>
            <StyledText className="text-[#8395a7]">Online</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Chat Messages */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {messages.map((msg, index) => (
            <StyledView
              key={msg.id}
              className={`mb-4 max-w-[80%] ${msg.sender === "tenant" ? "self-end ml-auto" : "self-start"}`}
            >
              <StyledView
                className={`p-3 rounded-2xl ${
                  msg.sender === "tenant" ? "bg-[#27ae60] rounded-tr-none" : "bg-[#e9ecef] rounded-tl-none"
                }`}
              >
                <StyledText className={`${msg.sender === "tenant" ? "text-white" : "text-[#1a2c4e]"}`}>
                  {msg.text}
                </StyledText>
              </StyledView>
              <StyledView
                className={`flex-row items-center mt-1 ${msg.sender === "tenant" ? "justify-end" : "justify-start"}`}
              >
                <StyledText className="text-[#8395a7] text-xs">{msg.time}</StyledText>
                {msg.sender === "tenant" && (
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
            className="bg-[#27ae60] w-12 h-12 rounded-full justify-center items-center"
            onPress={sendMessage}
          >
            <Ionicons name="send" size={20} color="white" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </KeyboardAvoidingView>
  )
}

export default ChatScreen

