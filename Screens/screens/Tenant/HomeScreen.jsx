"use client";

import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  PrimaryButton,
  OutlinedButton,
  TextButton,
  IconButton,
  FloatingActionButton,
  ButtonGroup,
  SecondaryButton,
} from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const HomeScreen = () => {
  const navigation = useNavigation();
  const translateY = new Animated.Value(50);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const AnimatedView = Animated.createAnimatedComponent(StyledView);

  return (
    <ScrollView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-6 px-4 rounded-b-3xl shadow-lg">
        <StyledView className="flex-row justify-between items-center mb-6">
          <StyledView className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="mr-3"
            >
              <StyledView className="w-12 h-12 rounded-full bg-white justify-center items-center">
                <Text className="text-primary text-lg font-bold">DR</Text>
              </StyledView>
            </TouchableOpacity>
            <StyledView>
              <StyledText className="text-[#8395a7] text-sm">
                Welcome back
              </StyledText>
              <StyledText className="text-white text-xl font-bold">
                Divash Ranabhat
              </StyledText>
            </StyledView>
          </StyledView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>

        {/* Payment Overview Card */}
        <AnimatedView
          className="bg-white rounded-2xl p-4 shadow-lg mb-4"
          style={{
            transform: [{ translateY }],
            opacity,
          }}
        >
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledText className="text-[#1a2c4e] text-lg font-bold">
              Payment Overview
            </StyledText>
            <TouchableOpacity
              onPress={() => navigation.navigate("PaymentHistory")}
            >
              <StyledText className="text-primary">View History</StyledText>
            </TouchableOpacity>
          </StyledView>
          <StyledView className="flex-row justify-between items-center">
            <StyledView>
              <StyledText className="text-[#8395a7] mb-1">
                Due Amount
              </StyledText>
              <StyledText className="text-[#1a2c4e] text-2xl font-bold">
                ₹25,000
              </StyledText>
              <StyledText className="text-red">Due on July 1st</StyledText>
            </StyledView>

            <PrimaryButton
              text="Pay Now"
              onPress={() => navigation.navigate("MakePayment")}
            />
          </StyledView>
        </AnimatedView>
      </StyledView>

      {/* Quick Actions */}
      <StyledView className="px-4 py-6">
        <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
          Quick Actions
        </StyledText>
        <StyledView className="flex-row flex-wrap justify-between">
          {[
            {
              icon: <FontAwesome5 name="tools" size={24} color="#27ae60" />,
              title: "Maintenance",
              screen: "NewMaintenance",
            },
            {
              icon: <Entypo name="documents" size={24} color="#3498db" />,
              title: "Lease Details",
              screen: "LeaseDetails",
            },
            {
              icon: (
                <Ionicons
                  name="chatbubble-ellipses"
                  size={24}
                  color="#9b59b6"
                />
              ),
              title: "Chat Owner",
              screen: "Chat",
            },
            {
              icon: <Entypo name="notification" size={24} color="#e74c3c" />,
              title: "Notices",
              screen: "Notices",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="w-[48%] bg-white p-4 rounded-xl mb-4 shadow"
              onPress={() => navigation.navigate(item.screen)}
            >
              <StyledView className="items-center">
                <StyledView className="bg-[#f8f9fa] p-3 rounded-full mb-2">
                  {item.icon}
                </StyledView>
                <StyledText className="text-[#1a2c4e] font-medium">
                  {item.title}
                </StyledText>
              </StyledView>
            </TouchableOpacity>
          ))}
        </StyledView>
      </StyledView>
      {/* Recent Activity */}
      <StyledView className="px-4 pb-6">
        <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
          Recent Activity
        </StyledText>
        {[
          {
            icon: (
              <FontAwesome5 name="money-bill-wave" size={20} color="#27ae60" />
            ),
            title: "Rent Payment",
            description: "June rent paid successfully",
            time: "2 days ago",
          },
          {
            icon: <FontAwesome5 name="tools" size={20} color="#e74c3c" />,
            title: "Maintenance Request",
            description: "Plumbing issue reported",
            time: "5 days ago",
          },
        ].map((item, index) => (
          <StyledView
            key={index}
            className="bg-white p-4 rounded-xl mb-4 shadow flex-row items-center"
          >
            <StyledView className="bg-[#f8f9fa] p-3 rounded-full mr-3">
              {item.icon}
            </StyledView>
            <StyledView className="flex-1">
              <StyledText className="text-[#1a2c4e] font-bold">
                {item.title}
              </StyledText>
              <StyledText className="text-[#8395a7]">
                {item.description}
              </StyledText>
            </StyledView>
            <StyledText className="text-[#8395a7] text-sm">
              {item.time}
            </StyledText>
          </StyledView>
        ))}
      </StyledView>
    </ScrollView>
  );
};

export default HomeScreen;
