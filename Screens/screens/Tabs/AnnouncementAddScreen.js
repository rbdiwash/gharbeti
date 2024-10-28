import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddAnnouncementScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [extra, setExtra] = useState("");

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active"); // Default status as 'Active'

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    Alert.alert("Success", "Announcement added successfully!");
    navigation.goBack(); // Return to the list screen
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-6">
      {/* <Text className="text-2xl font-bold text-indigo-500 mb-4">
        Add Announcement
      </Text> */}

      {/* Title Input */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Title</Text>
        <TextInput
          className="p-3 bg-white border border-gray-300 rounded-lg"
          placeholder="Enter announcement title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description Input */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Description
        </Text>
        <TextInput
          className="p-3 bg-white border border-gray-300 rounded-lg"
          placeholder="Enter description"
          multiline
          numberOfLines={5}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Extra Information
        </Text>
        <TextInput
          className="p-3 bg-white border border-gray-300 rounded-lg"
          placeholder="Enter extra information"
          value={extra}
          onChangeText={setExtra}
        />
      </View>
      {/* Status Selection */}
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Status</Text>
        <TouchableOpacity
          className={`p-3 rounded-lg ${
            status === "Active" ? "bg-green-500" : "bg-red-500"
          }`}
          onPress={() => setStatus(status === "Active" ? "Inactive" : "Active")}
        >
          <Text className="text-white text-center text-lg">
            {status === "Active" ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg mt-4"
        onPress={handleSubmit}
      >
        <Text className="text-white text-center text-lg">Add Announcement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddAnnouncementScreen;
