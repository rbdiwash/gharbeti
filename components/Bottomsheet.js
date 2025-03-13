"use client";

import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const { height } = Dimensions.get("window");

const Bottomsheet = ({ visible, onClose, title, children }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-black/50">
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: height * 0.8,
          }}
        >
          {/* Header */}
          <StyledView className="flex-row justify-between items-center p-4 border-b border-[#f0f2f5]">
            <StyledText className="text-[#1a2c4e] text-lg font-bold">
              {title}
            </StyledText>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#8395a7" />
            </TouchableOpacity>
          </StyledView>

          {/* Content */}
          <StyledScrollView>{children}</StyledScrollView>
        </Animated.View>
      </StyledView>
    </Modal>
  );
};

export default Bottomsheet;
