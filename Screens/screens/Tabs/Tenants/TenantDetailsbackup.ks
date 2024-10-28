import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the action button icon

const TenantDetails = ({ tenant = tenantData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(tenant.name);
  const [address, setAddress] = useState(tenant.address);
  const [phone, setPhone] = useState(tenant.phone);
  const [email, setEmail] = useState(tenant.email);

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Profile Section */}
      <View className="flex items-center">
        <Image
          source={{ uri: tenant.imageUrl }}
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <TouchableOpacity onPress={toggleEdit} className="mt-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-semibold text-gray-700">
              Edit Details
            </Text>
            <Icon name="edit" size={20} className="text-primary" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Personal Details */}
      <View className="mt-8 space-y-4">
        <Text className="text-2xl font-bold text-gray-800">
          Personal Details
        </Text>

        <View className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <Text className="text-sm font-semibold text-gray-500">Name</Text>
          {isEditing ? (
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-white mt-2 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <Text className="mt-2 text-lg text-gray-800">{tenant.name}</Text>
          )}
        </View>

        <View className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <Text className="text-sm font-semibold text-gray-500">Address</Text>
          {isEditing ? (
            <TextInput
              value={address}
              onChangeText={setAddress}
              className="bg-white mt-2 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <Text className="mt-2 text-lg text-gray-800">{tenant.address}</Text>
          )}
        </View>

        <View className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <Text className="text-sm font-semibold text-gray-500">Phone</Text>
          {isEditing ? (
            <TextInput
              value={phone}
              onChangeText={setPhone}
              className="bg-white mt-2 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <Text className="mt-2 text-lg text-gray-800">{tenant.phone}</Text>
          )}
        </View>

        <View className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <Text className="text-sm font-semibold text-gray-500">Email</Text>
          {isEditing ? (
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="bg-white mt-2 p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <Text className="mt-2 text-lg text-gray-800">{tenant.email}</Text>
          )}
        </View>
      </View>

      {/* Dues and Maintenance Requests */}
      <View className="mt-10">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Financial Details
        </Text>

        <View className="flex-row justify-between bg-blue-100 p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-blue-800">
            Total Dues
          </Text>
          <Text className="text-lg font-bold text-blue-900">
            Rs. {tenant.dueAmount}
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Maintenance Requests
          </Text>
          {tenant.maintenanceRequests.length > 0 ? (
            tenant.maintenanceRequests.map((request, index) => (
              <View
                key={index}
                className="bg-red-100 p-4 rounded-lg shadow-sm mb-3 flex-row justify-between"
              >
                <Text className="text-gray-800">{request.title}</Text>
                <Text className="text-red-500">{request.date}</Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600">
              No pending maintenance requests
            </Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="bg-green-500 p-4 rounded-lg shadow-sm">
          <Text className="text-white font-bold">Message Tenant</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-500 p-4 rounded-lg shadow-sm">
          <Text className="text-white font-bold">Remove Tenant</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TenantDetails;

// Sample tenant object to pass as props
const tenantData = {
  id: "1",
  name: "Ram Sharma",
  address: "Bhaktapur, Kathmandu",
  phone: "9876543210",
  email: "ram.sharma@example.com",
  imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  dueAmount: 3200,
  maintenanceRequests: [
    { title: "Leaky Tap", date: "2024-10-10" },
    { title: "Broken Light", date: "2024-10-12" },
  ],
};
