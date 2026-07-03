"use client";

import { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const UnderConstructionScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      // Bounce animation for the smiley
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),

      // Rotate animation for the gear
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),

      // Fade in animation for the content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Interpolate animations
  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Coming Soon
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>
      </StyledView>

      {/* Content */}
      <Animated.View
        className="flex-1 justify-center items-center px-6"
        style={{ opacity: fadeAnim }}
      >
        <StyledView className="items-center mb-8">
          {/* Animated smiley face */}
          <Animated.View style={{ transform: [{ translateY }] }}>
            <StyledView className="w-32 h-32 rounded-full bg-[#27ae60] justify-center items-center mb-6">
              <Ionicons name="happy" size={80} color="white" />
            </StyledView>
          </Animated.View>

          {/* Animated gears */}
          <StyledView className="flex-row justify-center items-center absolute">
            <Animated.View
              style={{
                transform: [{ rotate }],
                position: "absolute",
                top: -60,
                right: -40,
              }}
            >
              <Ionicons name="cog" size={40} color="#3498db" />
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: rotate.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["360deg", "0deg"],
                    }),
                  },
                ],
                position: "absolute",
                top: -40,
                right: -80,
              }}
            >
              <Ionicons name="cog" size={30} color="#e74c3c" />
            </Animated.View>
          </StyledView>
        </StyledView>

        <StyledText className="text-[#1a2c4e] text-3xl font-bold mb-4 text-center">
          Under Construction
        </StyledText>

        <StyledText className="text-[#8395a7] text-lg text-center mb-8">
          We're working hard to bring you something amazing! This page is still
          under construction and will be available soon.
        </StyledText>

        <StyledView className="w-16 h-1 bg-[#27ae60] rounded-full mb-8" />

        <StyledText className="text-[#8395a7] text-center mb-8">
          Thank you for your patience as we continue to improve your experience.
        </StyledText>

        <PrimaryButton
          text="Go Back"
          variant="primary"
          iconName="arrow-back"
          iconPosition="left"
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
    </StyledView>
  );
};

export default UnderConstructionScreen;
