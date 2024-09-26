import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ username = "Divash" }) => {
  const [isDueVisible, setIsDueVisible] = useState(true);
  const navigation = useNavigation();

  const handleToggleDueVisibility = () => {
    setIsDueVisible(!isDueVisible);
  };

  const renderActionBlock = (icon, label, screen) => (
    <TouchableOpacity
      className="bg-white p-4 m-2 rounded-lg shadow-lg items-center justify-center"
      onPress={() => navigation.navigate(screen)}
      style={{ width: "30%" }} // Ensures 3 blocks in a row
    >
      <Icon name={icon} size={28} color="#F59A73" />
      <Text className="mt-2 text-gray-800 font-bold text-center">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Greeting */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-gray-800">Hi, {username}</Text>
      </View>

      {/* Total Due Block */}
      <View className="bg-white p-4 rounded-lg shadow-md flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-gray-500">Total Due</Text>
          <Text className="text-2xl font-bold text-gray-800">
            {isDueVisible ? "Rs. 25,000" : "****"}
          </Text>
        </View>
        <TouchableOpacity onPress={handleToggleDueVisibility}>
          <Icon
            name={isDueVisible ? "visibility" : "visibility-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Action Blocks */}
      <View className=" flex-row flex-wrap gap-0 justify-between">
        {renderActionBlock("group", "Tenants", "Tenants")}
        {renderActionBlock("person-add", "Add Tenants", "addTenants")}
        {renderActionBlock("build", "Maintenance", "MaintenanceScreen")}
        {renderActionBlock("account-balance", "Dues", "DuesScreen")}
        {renderActionBlock("message", "Message", "ProfileScreen")}
        {renderActionBlock("account-circle", "Profile", "ProfileScreen")}
        {/* Add more action blocks as needed */}
      </View>

      {/* Add Other Custom Sections */}
      <View className="bg-white p-4 rounded-lg shadow-lg mt-6">
        <Text className="text-lg font-bold text-gray-800">Summary</Text>
        <Text className="text-sm text-gray-500 mt-2">
          Quick summary of activities and updates.
        </Text>
      </View>

      <View className="bg-white p-4 rounded-lg shadow-lg mt-6">
        <Text className="text-lg font-bold text-gray-800">Recent Activity</Text>
        <Text className="text-sm text-gray-500 mt-2">
          Display recent actions or notifications.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
