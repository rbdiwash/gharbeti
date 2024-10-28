import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the action button icon

// Mock Tenant Data
const tenantData = {
  id: "1",
  name: "Luke Findel",
  address: "Bhaktapur, Kathmandu",
  phone: "9876543210",
  email: "ram.sharma@example.com",
  imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  dueAmount: 3200,
  totalPaid: 15000,
  totalRooms: 3,
  monthlyRent: 5000,
  isActive: true,
  rentToDate: "15th Oct 2024",
  maintenanceRequests: [
    { title: "Leaky Tap", date: "10th Oct 2024", isFixed: false },
    { title: "Broken Light", date: "12th Oct 2024", isFixed: true },
  ],
};

const TenantDetails = ({ tenant = tenantData, navigation }) => {
  const navigateToPersonalDetails = () => {
    // Mock navigation to personal details page
    alert("Navigating to Personal Details Page");
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      {/* Profile Section */}
      <View className="flex items-center">
        <Image
          source={{ uri: tenant.imageUrl }}
          className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg"
        />
        <Text className="mt-4 text-2xl font-bold text-gray-800">
          {tenant.name}
        </Text>
        <Text className="text-gray-500">{tenant.address}</Text>
      </View>

      {/* Rent Information */}
      <View className="bg-white p-4 mt-6 rounded-lg shadow-sm">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-800">
            Rent Due Date
          </Text>
          <Text className="text-lg text-indigo-600">{tenant.rentToDate}</Text>
        </View>
        <View className="flex-row justify-between mt-4">
          <Text className="text-lg font-semibold text-gray-800">
            Total Rent per Month
          </Text>
          <Text className="text-lg text-indigo-600">
            Rs. {tenant.monthlyRent}
          </Text>
        </View>
      </View>

      {/* Financial Summary */}
      <View className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Financial Details
        </Text>

        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-700">Total Dues</Text>
          <Text className="text-lg font-semibold text-red-600">
            Rs. {tenant.dueAmount}
          </Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-lg text-gray-700">Total Paid</Text>
          <Text className="text-lg font-semibold text-green-600">
            Rs. {tenant.totalPaid}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-lg text-gray-700">Rooms Rented</Text>
          <Text className="text-lg font-semibold text-gray-800">
            {tenant.totalRooms}
          </Text>
        </View>
      </View>

      {/* Maintenance Requests */}
      <View className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Maintenance Requests
        </Text>
        {tenant.maintenanceRequests.map((request, index) => (
          <View
            key={index}
            className="flex-row justify-between items-center mb-3 p-3 bg-gray-100 rounded-lg"
          >
            <Text className="text-gray-800">{request.title}</Text>
            <View className="flex-row items-center">
              <Text
                className={`text-sm mr-2 ${
                  request.isFixed ? "text-green-600" : "text-red-600"
                }`}
              >
                {request.isFixed ? "Fixed" : "Not Fixed"}
              </Text>
              <Text className="text-gray-400">{request.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View className="mt-8 flex-row justify-between">
        <TouchableOpacity
          onPress={() => navigation.navigate("chatScreen")}
          className="flex-1 bg-indigo-500 p-4 rounded-lg mr-2 shadow-sm flex-row justify-center items-center"
        >
          <Icon name="chat" size={20} className="text-primary" />
          <Text className="text-white font-bold ml-2">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToPersonalDetails}
          className="flex-1 bg-gray-800 p-4 rounded-lg ml-2 shadow-sm flex-row justify-center items-center"
        >
          <Text className="text-white font-bold">Personal Details</Text>
          <Icon name="chat" size={20} className="text-primary" />
        </TouchableOpacity>
      </View>

      {/* Tenant Status */}
      <View className="mt-8 bg-white p-4 rounded-lg shadow-sm flex-row justify-between items-center">
        <Text className="text-lg font-semibold text-gray-700">Status</Text>
        <Text
          className={`text-lg font-bold ${
            tenant.isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {tenant.isActive ? "Active" : "Inactive"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default TenantDetails;
