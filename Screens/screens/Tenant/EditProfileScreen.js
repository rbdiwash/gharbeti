"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { OutlinedButton, PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

const EditProfileScreen = () => {
  const navigation = useNavigation();

  // User profile data
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "Apartment 303, Green Valley, Bangalore",
    profileImage: null,
  });

  // Handle input change
  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  // Pick image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileData({
        ...profileData,
        profileImage: result.assets[0].uri,
      });
    }
  };

  // Save profile changes
  const saveChanges = () => {
    // Implement save logic here
    Alert.alert("Success", "Profile updated successfully");
    navigation.goBack();
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-6 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Edit Profile
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>
      </StyledView>

      <StyledScrollView className="flex-1 px-4 pt-6">
        {/* Profile Image */}
        <StyledView className="items-center mb-6">
          <StyledView className="relative">
            {profileData.profileImage ? (
              <Image
                source={{ uri: profileData.profileImage }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <StyledView className="w-24 h-24 rounded-full bg-[#27ae60] justify-center items-center">
                <StyledText className="text-white text-3xl font-bold">
                  {profileData.firstName.charAt(0)}
                  {profileData.lastName.charAt(0)}
                </StyledText>
              </StyledView>
            )}

            <StyledTouchableOpacity
              className="absolute bottom-0 right-0 bg-[#3498db] p-2 rounded-full border-2 border-white"
              onPress={pickImage}
            >
              <Ionicons name="camera" size={16} color="white" />
            </StyledTouchableOpacity>
          </StyledView>

          <StyledText className="text-[#8395a7] mt-2">
            Tap to change profile picture
          </StyledText>
        </StyledView>

        {/* Form Fields */}
        <StyledView className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              First Name
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3"
              value={profileData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              placeholder="Enter first name"
            />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Last Name
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3"
              value={profileData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              placeholder="Enter last name"
            />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Email
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3"
              value={profileData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder="Enter email address"
              keyboardType="email-address"
            />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Phone Number
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3"
              value={profileData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-medium mb-2">
              Address
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3"
              value={profileData.address}
              onChangeText={(text) => handleInputChange("address", text)}
              placeholder="Enter address"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </StyledView>
        </StyledView>

        {/* Action Buttons */}
        <StyledView className="flex-row justify-between mb-8">
          <OutlinedButton
            text="Cancel"
            borderColor="#8395a7"
            textColor="#8395a7"
            style={{ flex: 1, marginRight: 8 }}
            onPress={() => navigation.goBack()}
          />
          <PrimaryButton
            text="Save Changes"
            style={{ flex: 1, marginLeft: 8 }}
            onPress={saveChanges}
          />
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
};

export default EditProfileScreen;
