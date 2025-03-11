import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import Divash from "../../../../assets/divash.jpeg";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const [landlordDetails, setLandlordDetails] = useState({
    name: "Divash Ranabhat",
    email: "rbdiwash@gmail.com",
    phone: "+123456789",
    address: "123 Main Street, City, Country",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    current: true,
    new: true,
    confirm: true,
  });
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const [expandedSections, setExpandedSections] = useState({
    changePassword: false,
    changeLanguage: false,
    biometric: false,
  });

  const handleInputChange = (key, value) => {
    setLandlordDetails((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Profile Picture */}
      <View className="items-center mb-6">
        <Image
          source={
            Divash // Replace with actual profile picture URL
          }
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-bold mt-4">{landlordDetails.name}</Text>
      </View>

      {/* Editable Personal Information */}
      <View className="mb-6 border rounded-lg p-4 bg-gray-100">
        <Text className="text-lg font-bold mb-4">Personal Information</Text>
        {Object.keys(landlordDetails).map((key) => (
          <View key={key} className="mb-4">
            <Text className="text-sm font-semibold capitalize">{key}</Text>
            <TextInput
              value={landlordDetails[key]}
              onChangeText={(value) => handleInputChange(key, value)}
              className="border border-gray-300 rounded-lg p-2 mt-1"
            />
          </View>
        ))}
      </View>
      <View className="mb-6 border rounded-lg p-4 bg-gray-100">
        <Text className="text-lg font-bold mb-4">Room Information</Text>

        <View className="mb-4">
          <Text className="text-sm font-semibold capitalize">Total Rooms</Text>
          <TextInput className="border border-gray-300 rounded-lg p-2 mt-1" />
        </View>
        <View className="mb-4">
          <Text className="text-sm font-semibold capitalize">Vacant Rooms</Text>
          <TextInput className="border border-gray-300 rounded-lg p-2 mt-1" />
        </View>
      </View>

      {/* Change Password Section */}
      <View className="mb-4">
        <TouchableOpacity
          onPress={() => toggleSection("changePassword")}
          className="flex-row justify-between items-center py-3"
        >
          <Text className="text-lg font-semibold">Change Password</Text>
          <Icon
            name={
              expandedSections.changePassword
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={30}
            color="black"
          />
        </TouchableOpacity>
        {expandedSections.changePassword && (
          <View className="border-t border-gray-300 pt-4">
            {["current", "new", "confirm"].map((field, index) => (
              <View key={index} className="relative mb-4">
                <TextInput
                  placeholder={`Enter ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  } Password`}
                  secureTextEntry={passwordVisibility[field]}
                  className="border border-gray-300 rounded-lg p-2 pr-10"
                />
                <TouchableOpacity
                  onPress={() => togglePasswordVisibility(field)}
                  className="absolute right-3 top-2.5"
                >
                  <Feather
                    name={passwordVisibility[field] ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Change Language Section */}
      <View className="mb-4">
        <TouchableOpacity
          onPress={() => toggleSection("changeLanguage")}
          className="flex-row justify-between items-center py-3"
        >
          <Text className="text-lg font-semibold">Change Language</Text>
          <Icon
            name={
              expandedSections.changeLanguage
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={30}
            color="black"
          />
        </TouchableOpacity>
        {expandedSections.changeLanguage && (
          <View className="border-t border-gray-300 pt-4">
            {[
              { language: "English", flag: "🇺🇸" },
              { language: "Nepali", flag: "🇳🇵" },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedLanguage(item.language)}
                className="flex-row items-center mb-4"
              >
                <Text className="mr-4 text-lg">{item.flag}</Text>
                <Text className="text-base">{item.language}</Text>
                <View className="ml-auto">
                  {selectedLanguage === item.language && (
                    <Icon name="checkcircle" size={20} color="green" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Turn on Biometric Section */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => toggleSection("biometric")}
          className="flex-row justify-between items-center py-3"
        >
          <Text className="text-lg font-semibold">Turn on Biometric</Text>
          <Icon
            name={
              expandedSections.biometric
                ? "keyboard-arrow-up"
                : "keyboard-arrow-down"
            }
            size={30}
            color="black"
          />
        </TouchableOpacity>
        {expandedSections.biometric && (
          <View className="border-t border-gray-300 pt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-base">Enable Biometric Login</Text>
              <Switch />
            </View>
          </View>
        )}
      </View>

      {/* Save Button */}
      <TouchableOpacity className="bg-blue-500 py-3 rounded-lg mb-10">
        <Text className="text-center text-white font-bold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
