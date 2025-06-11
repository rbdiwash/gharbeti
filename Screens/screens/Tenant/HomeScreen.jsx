"use client";

import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import AutoScroll from "@homielab/react-native-auto-scroll";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { PrimaryButton } from "../../../components/Buttons";
import { useAuth } from "../../../context/AuthContext";
import { useStateData } from "../../../hooks/useStateData";
import { getInitials } from "../../helper/const";
import { useNotice } from "../../../hooks/useNotice";
import { useNotification } from "../../../hooks/useNotification";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const HomeScreen = () => {
  const navigation = useNavigation();
  const translateY = new Animated.Value(50);
  const opacity = new Animated.Value(0);

  const { state } = useAuth();
  const {
    profile,
    notifications,
    activities,
    isLoading,
    isError,
    error,
    initializeData,
    refreshAllData,
  } = useStateData();
  const { data: notificationsList = [] } = useNotification().getNotifications(
    profile?._id
  );

  const tenantData = profile?.tenantDetails || {};

  useEffect(() => {
    initializeData();
    // Animated.parallel([
    //   Animated.timing(translateY, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(opacity, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  }, [tenantData, state]);

  const AnimatedView = Animated.createAnimatedComponent(StyledView);

  const calculateDueAmount = () => {
    const dueDate = new Date(tenantData?.startingDate);
    const today = new Date();
    const timeDiff = today.getTime() - dueDate.getTime();
    const daysDiff =
      timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
    return daysDiff * tenantData?.totalRentPerMonth || 0;
  };

  const calculateDueDate = () => {
    if (!tenantData?.startingDate) return "";
    const startDate = new Date(tenantData.startingDate);
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + 1);
    return dueDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { data: notices = [] } = useNotice().getNoticeRequests();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAllData();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <StyledView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </StyledView>
    );
  }

  // if (isError) {
  //   return (
  //     <StyledView className="flex-1 justify-center items-center">
  //       <Text>Error: {error?.message}</Text>
  //     </StyledView>
  //   );
  // }

  return (
    <ScrollView
      className="flex-1 bg-[#f8f9fa]"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4 rounded-b-3xl shadow-lg">
        <StyledView className="flex-row justify-between items-center mb-6">
          <StyledView className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              className="mr-3"
            >
              <StyledView className="w-12 h-12 rounded-full bg-white justify-center items-center">
                <Text className="text-primary text-lg font-bold">
                  {getInitials(state?.userData?.name)}
                </Text>
              </StyledView>
            </TouchableOpacity>
            <StyledView>
              <StyledText className="text-[#8395a7] text-sm">
                Welcome back
              </StyledText>
              <StyledText className="text-white text-xl font-bold">
                {state?.userData?.name}
              </StyledText>
              {state?.userData?.landlord?.name && (
                <StyledText className="text-[#8395a7] text-sm">
                  {state?.userData?.landlord?.name}'s Home
                </StyledText>
              )}
            </StyledView>
          </StyledView>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>

        {/* Payment Overview Card */}
        <View
          className="bg-white rounded-2xl p-4 shadow-lg mb-4"
          // style={{
          //   transform: [{ translateY }],
          //   opacity,
          // }}
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
                Rs {calculateDueAmount()}
              </StyledText>
              <StyledText className="text-red-500">
                Due on {calculateDueDate()}
              </StyledText>
            </StyledView>

            <PrimaryButton
              text="Pay Now"
              onPress={() => navigation.navigate("MakePayment")}
            />
          </StyledView>
        </View>
      </StyledView>

      {/* Notices/Announcements */}
      <StyledView className="mt-4">
        <AutoScroll duration={10000} endPaddingWidth={10}>
          <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
            {notices?.map((notice, index) => (
              <StyledView
                className={`p-3 rounded-lg mr-2 border-l-4 ${
                  index % 2 === 0
                    ? "bg-[#fff8e1] border-[#ffc107]"
                    : "bg-[#e1f5fe] border-[#03a9f4]"
                }`}
                key={notice._id}
              >
                <StyledText className="text-[#1a2c4e] font-medium">
                  {notice.title}
                </StyledText>
              </StyledView>
            ))}
            {/* <StyledView className="bg-[#e1f5fe] p-3 rounded-lg mr-2 border-l-4 border-[#03a9f4]">
              <StyledText className="text-[#1a2c4e] font-medium">
                Water supply maintenance on July 5th, 10AM-2PM
              </StyledText>
            </StyledView>
            <StyledView className="bg-[#e8f5e9] p-3 rounded-lg mr-2 border-l-4 border-[#4caf50]">
              <StyledText className="text-[#1a2c4e] font-medium">
                Community event this weekend in the common area
              </StyledText>
            </StyledView> */}
          </StyledScrollView>
        </AutoScroll>
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
              screen: "Maintenance",
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
