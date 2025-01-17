import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import Icon from "react-native-vector-icons/MaterialIcons";
import divash from "../../../assets/divash.jpeg";

const Settings = ({ navigation }) => {
  const [user] = useState({
    name: "Divash Ranabhat",
    imageUrl: divash,
  });

  // Helper function to render each option row
  const renderOption = (iconName, label, onPress) => (
    <TouchableOpacity
      className="flex-row items-center p-4 border-b border-gray-300"
      onPress={onPress}
    >
      <Icon name={iconName} size={24} color="#0e2f4f" className="mr-4" />
      <Text className="text-lg text-gray-800">{label}</Text>
    </TouchableOpacity>
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User logged out") },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header with Profile Info */}
      <View className="bg-primary p-6 flex-row items-center">
        <Image source={divash} className="w-16 h-16 rounded-full mr-4" />
        <View>
          <Text className="text-2xl font-bold text-white">{user.name}</Text>
          <Text className="text-lg text-white">Landlord</Text>
        </View>
      </View>

      {/* My Information Section */}
      <View className="mt-6">
        <Text className="text-xl font-semibold text-gray-700 px-4 mb-2">
          My Information
        </Text>
        {renderOption("account-circle", "My Information", () =>
          navigation.navigate("MyInformation")
        )}
        {renderOption("language", "Change Language", () =>
          navigation.navigate("ChangeLanguage")
        )}
        {renderOption("lock", "Change Password", () =>
          navigation.navigate("ChangePassword")
        )}
        {renderOption("fingerprint", "Setup Biometrics", () =>
          navigation.navigate("SetupBiometrics")
        )}
      </View>

      {/* Help & Support Section */}
      <View className="mt-6">
        <Text className="text-xl font-semibold text-gray-700 px-4 mb-2">
          Help & Support
        </Text>
        {renderOption("help", "Help and Support", () =>
          navigation.navigate("HelpSupport")
        )}
        {renderOption("question-answer", "FAQs", () =>
          navigation.navigate("FAQs")
        )}
      </View>

      {/* Logout */}
      <View className="mt-6">
        {renderOption("exit-to-app", "Logout", handleLogout)}
      </View>
    </ScrollView>
  );
};

export default Settings;
