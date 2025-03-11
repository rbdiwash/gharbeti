import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnnouncementList = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([
    {
      id: "1",
      title: "New Rent Policy",
      status: "Active",
      date: "2024-10-27",
      time: "10:30 AM",
    },
    {
      id: "2",
      title: "Maintenance Update",
      status: "Inactive",
      date: "2024-10-20",
      time: "02:15 PM",
    },
    {
      id: "3",
      title: "Water Supply Notice",
      status: "Active",
      date: "2024-10-15",
      time: "08:00 AM",
    },
  ]);

  const renderAnnouncement = ({ item }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm border border-gray-300 flex flex-row justify-between items-start">
      <View>
        <Text className="text-lg font-bold text-gray-800">{item.title}</Text>
        <Text className="text-gray-600">
          {item.date} | {item.time}
        </Text>
        <Text
          className={`text-sm mt-1 ${
            item.status === "Active" ? "text-green-600" : "text-red-500"
          }`}
        >
          {item.status}
        </Text>
      </View>
      <View>
        <Icon
          name="edit"
          size={20}
          className="mt-2 shadow-lg"
          onPress={() => navigation.navigate("AddAnnouncement")}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <>
        <FlatList
          data={announcements}
          renderItem={renderAnnouncement}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />
      </>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-8 bg-primary p-4 rounded-full shadow-lg"
        onPress={() => navigation.navigate("AddAnnouncement")}
      >
        <Icon name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AnnouncementList;
