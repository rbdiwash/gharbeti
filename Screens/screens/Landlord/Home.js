"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Dimensions,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AutoScroll from "@homielab/react-native-auto-scroll";

// Payment method images
import esewa from "../../../assets/esewa.png";
import khalti from "../../../assets/khalti.png";
import connectIPS from "../../../assets/connectIPS.png";
import fonePay from "../../../assets/fonepay.png";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isDueVisible, setIsDueVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for tenant
  const tenantData = {
    name: "John Doe",
    profileImage: "https://i.pravatar.cc/150?img=8",
    property: "Apartment 303, Green Valley",
    rentDue: 25000,
    dueDate: "July 1, 2023",
    lastPayment: 25000,
    lastPaymentDate: "June 1, 2023",
    leaseEndDate: "December 31, 2023",
    maintenanceRequests: 2,
    unreadNotices: 3,
    unreadMessages: 1,
  };

  // Format date to display month and year
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    navigation.navigate("OldHome");
    // Simulate data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // Toggle due amount visibility
  const handleToggleDueVisibility = () => {
    setIsDueVisible(!isDueVisible);
  };

  // Render quick action button
  const renderQuickAction = (
    icon,
    label,
    screen,
    iconType = "Ionicons",
    color = "#1a2c4e"
  ) => (
    <StyledTouchableOpacity
      className="bg-white p-4 rounded-xl shadow-sm items-center justify-center w-[30%] mb-3"
      onPress={() => navigation.navigate(screen)}
    >
      <StyledView className="w-12 h-12 rounded-full bg-[#f0f2f5] items-center justify-center mb-2">
        {iconType === "Ionicons" && (
          <Ionicons name={icon} size={24} color={color} />
        )}
        {iconType === "MaterialIcons" && (
          <MaterialIcons name={icon} size={24} color={color} />
        )}
        {iconType === "FontAwesome5" && (
          <FontAwesome5 name={icon} size={20} color={color} />
        )}
      </StyledView>
      <StyledText className="text-[#1a2c4e] text-sm font-medium text-center">
        {label}
      </StyledText>
    </StyledTouchableOpacity>
  );

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-3 px-4 rounded-b-3xl shadow-lg">
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledView className="flex-row items-center">
            <StyledView className="w-10 h-10 rounded-full bg-white justify-center items-center mr-3">
              <StyledText className="text-primary text-lg font-bold">
                {tenantData.name.charAt(0)}
              </StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="text-[#8395a7] text-xs">
                Welcome back
              </StyledText>
              <StyledText className="text-white text-lg font-bold">
                {tenantData.name}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex-row">
            <StyledTouchableOpacity className="mr-4" onPress={onRefresh}>
              <Ionicons name="refresh" size={24} color="white" />
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
            >
              <StyledView className="relative">
                <Ionicons name="notifications" size={24} color="white" />
                {tenantData.unreadNotices > 0 && (
                  <StyledView className="absolute -top-1 -right-1 bg-[#e74c3c] rounded-full w-4 h-4 items-center justify-center">
                    <StyledText className="text-white text-[10px]">
                      {tenantData.unreadNotices}
                    </StyledText>
                  </StyledView>
                )}
              </StyledView>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Property Info */}
        <StyledView className="mb-4">
          <StyledText className="text-[#8395a7] text-xs">
            Your residence
          </StyledText>
          <StyledText className="text-white text-base">
            {tenantData.property}
          </StyledText>
        </StyledView>

        {/* Payment Card */}
        <StyledView className="bg-white rounded-xl p-4 shadow-md mb-4">
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledText className="text-[#1a2c4e] text-base font-bold">
              Payment Overview
            </StyledText>
            <StyledTouchableOpacity onPress={handleToggleDueVisibility}>
              <Ionicons
                name={isDueVisible ? "eye-off" : "eye"}
                size={20}
                color="#8395a7"
              />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledView className="flex-row justify-between items-center">
            <StyledView className="border-r border-[#f0f2f5] pr-4 flex-1">
              <StyledText className="text-[#8395a7] text-xs">
                Due Amount
              </StyledText>
              <StyledText className="text-[#1a2c4e] text-xl font-bold">
                {isDueVisible ? `Rs ${tenantData.rentDue}` : "Rs •••••"}
              </StyledText>
              <StyledText className="text-[#e74c3c] text-xs">
                Due on {tenantData.dueDate}
              </StyledText>
            </StyledView>
            <StyledView className="pl-4 flex-1">
              <StyledText className="text-[#8395a7] text-xs">
                Last Payment
              </StyledText>
              <StyledText className="text-[#1a2c4e] text-xl font-bold">
                {isDueVisible ? `Rs ${tenantData.lastPayment}` : "Rs •••••"}
              </StyledText>
              <StyledText className="text-[#27ae60] text-xs">
                Paid on {tenantData.lastPaymentDate}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Notices/Announcements */}
        <StyledView className="mt-4">
          <AutoScroll duration={10000} endPaddingWidth={10}>
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
              <StyledView className="bg-[#fff8e1] p-3 rounded-lg mr-2 border-l-4 border-[#ffc107]">
                <StyledText className="text-[#1a2c4e] font-medium">
                  Reminder: Rent due on {tenantData.dueDate}
                </StyledText>
              </StyledView>
              <StyledView className="bg-[#e1f5fe] p-3 rounded-lg mr-2 border-l-4 border-[#03a9f4]">
                <StyledText className="text-[#1a2c4e] font-medium">
                  Water supply maintenance on July 5th, 10AM-2PM
                </StyledText>
              </StyledView>
              <StyledView className="bg-[#e8f5e9] p-3 rounded-lg mr-2 border-l-4 border-[#4caf50]">
                <StyledText className="text-[#1a2c4e] font-medium">
                  Community event this weekend in the common area
                </StyledText>
              </StyledView>
            </StyledScrollView>
          </AutoScroll>
        </StyledView>

        {/* Status Cards */}
        {/* <StyledView className="flex-row justify-between mt-6">
          <StyledTouchableOpacity
            className="bg-white p-4 rounded-xl shadow-sm items-center flex-1 mr-2"
            onPress={() => navigation.navigate("MaintenanceList")}
          >
            <Ionicons name="construct" size={24} color="#f1c40f" />
            <StyledText className="text-[#1a2c4e] font-bold mt-1">
              {tenantData.maintenanceRequests}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">
              Maintenance
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="bg-white p-4 rounded-xl shadow-sm items-center flex-1 mx-2"
            onPress={() => navigation.navigate("Notices")}
          >
            <Ionicons name="megaphone" size={24} color="#e74c3c" />
            <StyledText className="text-[#1a2c4e] font-bold mt-1">
              {tenantData.unreadNotices}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">Notices</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="bg-white p-4 rounded-xl shadow-sm items-center flex-1 ml-2"
            onPress={() => navigation.navigate("Chat")}
          >
            <Ionicons name="chatbubble-ellipses" size={24} color="#3498db" />
            <StyledText className="text-[#1a2c4e] font-bold mt-1">
              {tenantData.unreadMessages}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">Messages</StyledText>
          </StyledTouchableOpacity>
        </StyledView> */}

        {/* Quick Actions */}
        <StyledView className="mt-6">
          <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
            Quick Actions
          </StyledText>
          <StyledView className="flex-row flex-wrap justify-between">
            {renderQuickAction(
              "group",
              "Tenants",
              "tenants",
              "MaterialIcons",
              "#27ae60"
            )}
            {renderQuickAction(
              "construct",
              "Maintenance",
              "Maintenance Requests",
              "Ionicons",
              "#f1c40f"
            )}
            {renderQuickAction(
              "document-text",
              "Lease",
              "LeaseDetails",
              "Ionicons",
              "#3498db"
            )}
            {renderQuickAction(
              "chatbubble-ellipses",
              "Chat",
              "Chat",
              "Ionicons",
              "#9b59b6"
            )}
            {renderQuickAction(
              "notifications",
              "Notices",
              "Announcements",
              "Ionicons",
              "#e74c3c"
            )}
            {renderQuickAction(
              "user-alt",
              "Profile",
              "Profile",
              "FontAwesome5",
              "#7f8c8d"
            )}
          </StyledView>
        </StyledView>

        {/* Lease Summary */}
        <StyledTouchableOpacity
          className="mt-6 bg-white p-4 rounded-xl shadow-sm"
          onPress={() => navigation.navigate("LeaseDetails")}
        >
          <StyledView className="flex-row justify-between items-center mb-2">
            <StyledText className="text-[#1a2c4e] text-base font-bold">
              Lease Summary
            </StyledText>
            <Ionicons name="chevron-forward" size={20} color="#8395a7" />
          </StyledView>

          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="text-[#8395a7]">Monthly Rent</StyledText>
            <StyledText className="text-[#1a2c4e] font-medium">
              Rs {tenantData.rentDue}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between">
            <StyledText className="text-[#8395a7]">Lease Ends</StyledText>
            <StyledText className="text-[#1a2c4e] font-medium">
              {tenantData.leaseEndDate}
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>

        {/* Payment Methods */}
        <StyledView className="mt-6 bg-white p-4 rounded-xl shadow-sm">
          <StyledText className="text-[#1a2c4e] text-base font-bold mb-3">
            Payment Methods
          </StyledText>
          <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
            <StyledView className="mr-4 items-center">
              <StyledView className="w-16 h-16 border border-[#e9ecef] rounded-lg p-2 items-center justify-center mb-1">
                <StyledImage
                  source={esewa}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </StyledView>
              <StyledText className="text-[#8395a7] text-xs">Esewa</StyledText>
            </StyledView>

            <StyledView className="mr-4 items-center">
              <StyledView className="w-16 h-16 border border-[#e9ecef] rounded-lg p-2 items-center justify-center mb-1">
                <StyledImage
                  source={khalti}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </StyledView>
              <StyledText className="text-[#8395a7] text-xs">Khalti</StyledText>
            </StyledView>

            <StyledView className="mr-4 items-center">
              <StyledView className="w-16 h-16 border border-[#e9ecef] rounded-lg p-2 items-center justify-center mb-1">
                <StyledImage
                  source={connectIPS}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </StyledView>
              <StyledText className="text-[#8395a7] text-xs">
                ConnectIPS
              </StyledText>
            </StyledView>

            <StyledView className="mr-4 items-center">
              <StyledView className="w-16 h-16 border border-[#e9ecef] rounded-lg p-2 items-center justify-center mb-1">
                <StyledImage
                  source={fonePay}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </StyledView>
              <StyledText className="text-[#8395a7] text-xs">
                Fonepay
              </StyledText>
            </StyledView>
          </StyledScrollView>
        </StyledView>

        {/* Sponsored Ad */}
        <StyledView className="mt-6 bg-[#fff8e1] p-4 rounded-xl shadow-sm overflow-hidden mb-6">
          <StyledText className="text-[#f39c12] text-sm font-bold">
            SPONSORED
          </StyledText>
          <StyledText className="text-[#1a2c4e] text-base font-bold mt-1">
            Find your dream home with Gharbeti
          </StyledText>
          <StyledText className="text-[#8395a7] mt-1 mb-3">
            Discover the best rental properties in your area
          </StyledText>

          <StyledImage
            source={{ uri: "https://picsum.photos/id/29/4000/2670" }}
            className="w-full h-40 rounded-lg"
          />

          <StyledTouchableOpacity
            className="bg-[#f39c12] py-2 rounded-lg mt-3 items-center"
            onPress={() => {}}
          >
            <StyledText className="text-white font-bold">
              Explore Now
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
};

export default HomeScreen;
