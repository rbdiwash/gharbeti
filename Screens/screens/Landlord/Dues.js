import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the action button icon

const tenants = [
  {
    id: "1",
    name: "Ram Sharma",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    dueAmount: 5000,
    dueDate: "2025-01-31",
    cycleDate: "1st of Every Month",
  },
  {
    id: "2",
    name: "Sita Gurung",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    dueAmount: 3000,
    dueDate: "2025-01-28",
    cycleDate: "15th of Every Month",
  },
  {
    id: "3",
    name: "Krishna Bhattarai",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    dueAmount: 0,
    dueDate: "",
    cycleDate: "5th of Every Month",
  },
];

const Dues = () => {
  const handleNotify = (name) => {
    alert(`Notification sent to ${name}!`);
    // Add actual notification logic here
  };
  const navigation = useNavigation();

  const renderTenant = ({ item }) => (
    <View className="bg-white shadow-lg rounded-xl p-5 mb-4">
      {/* Profile and Basic Details */}
      <View className="flex-row items-start">
        <Image
          source={{ uri: item.profileImage }}
          className="w-16 h-16 rounded-full border-2 border-gray-200"
        />
        <View className="flex-1 ml-4">
          <Text className="text-xl font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text
            className={`${
              item.dueAmount > 0 ? "text-red-500" : "text-green-500"
            } font-medium mt-1`}
          >
            {item.dueAmount > 0 ? `Due: Rs ${item.dueAmount} ` : "No Dues"}
          </Text>
          <Text className="text-gray-500 mt-1">Cycle: {item.cycleDate}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Icon name="chat" size={28} className="text-primary" />
        </TouchableOpacity>
      </View>

      {/* Notify Section */}
      {item.dueAmount > 0 && (
        <View className="mt-4">
          <Text className="text-gray-500 text-sm mb-2">
            Notify the tenant about their pending dues.
          </Text>
          <TouchableOpacity
            onPress={() => handleNotify(item.name)}
            className="bg-secondary rounded-lg px-2 py-2 w-24"
          >
            <Text className="text-white text-sm font-semibold text-center">
              Buzz Tenant
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 py-6">
      <FlatList
        data={tenants}
        renderItem={renderTenant}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Dues;
