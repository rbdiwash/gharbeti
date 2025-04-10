"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

const AddTenantsScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    document: null,
    profileImage: null,
    rooms: "",
    totalRent: "",
    startDate: new Date(),
    emergencyName: "",
    emergencyNumber: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  // Request gallery permissions on component mount
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // Show the date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle the date selection
  const handleConfirm = (date) => {
    setSelectedDate(
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
    setFormData({
      ...formData,
      startDate: date,
    });
    hideDatePicker();
  };

  // Handle input change
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle profile image upload
  const handleProfileImageUpload = async () => {
    if (!hasGalleryPermission) {
      alert("Permission to access gallery was denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        profileImage: result.assets[0].uri,
      });
    }
  };

  // Handle document upload
  const handleDocumentUpload = async () => {
    if (!hasGalleryPermission) {
      alert("Permission to access gallery was denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        document: result.assets[0].uri,
      });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Tenant added successfully!");
      navigation.goBack();
    }, 1500);
  };

  // Render form field
  const renderFormField = (
    label,
    placeholder,
    name,
    value,
    keyboardType = "default",
    required = false
  ) => (
    <StyledView className="mb-4">
      <StyledView className="flex-row items-center mb-2">
        <StyledText className="text-primary font-bold">{label}</StyledText>
        {required && <StyledText className="text-[#e74c3c] ml-1">*</StyledText>}
      </StyledView>
      <StyledTextInput
        className="border border-[#e9ecef] bg-white p-3 rounded-lg text-[#1a2c4e]"
        placeholder={placeholder}
        placeholderTextColor="#8395a7"
        value={value}
        onChangeText={(text) => handleInputChange(name, text)}
        keyboardType={keyboardType}
      />
    </StyledView>
  );

  return (
    <StyledSafeAreaView className="flex-1 bg-[#f8f9fa]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <StyledView className="bg-primary flex-row items-center justify-between px-4 py-4">
          <StyledTouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </StyledTouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Add Tenant
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>

        <StyledScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Image Upload */}
          <StyledView className="items-center my-4">
            {formData.profileImage ? (
              <StyledTouchableOpacity onPress={handleProfileImageUpload}>
                <StyledImage
                  source={{ uri: formData.profileImage }}
                  className="w-24 h-24 rounded-full"
                />
                <StyledView className="absolute bottom-0 right-0 bg-[#27ae60] p-2 rounded-full border-2 border-white">
                  <Ionicons name="camera" size={14} color="white" />
                </StyledView>
              </StyledTouchableOpacity>
            ) : (
              <StyledTouchableOpacity
                className="w-24 h-24 rounded-full bg-[#e9ecef] items-center justify-center"
                onPress={handleProfileImageUpload}
              >
                <Ionicons name="person" size={40} color="#8395a7" />
                <StyledView className="absolute bottom-0 right-0 bg-[#27ae60] p-2 rounded-full border-2 border-white">
                  <Ionicons name="camera" size={14} color="white" />
                </StyledView>
              </StyledTouchableOpacity>
            )}
            <StyledText className="text-[#8395a7] mt-2">
              Tap to upload profile picture
            </StyledText>
          </StyledView>

          {/* Personal Information Section */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-primary text-lg font-bold mb-4">
              Personal Information
            </StyledText>

            {renderFormField(
              "Name",
              "Enter tenant name",
              "name",
              formData.name,
              "default",
              true
            )}
            {renderFormField(
              "Original Address",
              "Enter original address",
              "address",
              formData.address
            )}
            {renderFormField(
              "Phone Number",
              "Enter phone number",
              "phone",
              formData.phone,
              "phone-pad",
              true
            )}
            {renderFormField(
              "Email",
              "Enter email address",
              "email",
              formData.email,
              "email-address"
            )}
          </StyledView>

          {/* Rental Details Section */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-primary text-lg font-bold mb-4">
              Rental Details
            </StyledText>

            {renderFormField(
              "Number of Rooms",
              "Enter number of rooms",
              "rooms",
              formData.rooms,
              "numeric"
            )}
            {renderFormField(
              "Total Rent (Rs )",
              "Enter total rent amount",
              "totalRent",
              formData.totalRent,
              "numeric"
            )}

            {/* Date Picker */}
            <StyledView className="mb-4">
              <StyledText className="text-primary font-bold mb-2">
                Starting Date
              </StyledText>
              <StyledTouchableOpacity
                className="border border-[#e9ecef] bg-white p-3 rounded-lg flex-row justify-between items-center"
                onPress={showDatePicker}
              >
                <StyledText
                  className={selectedDate ? "text-primary" : "text-[#8395a7]"}
                >
                  {selectedDate || "Select starting date"}
                </StyledText>
                <Ionicons name="calendar" size={20} color="#8395a7" />
              </StyledTouchableOpacity>
            </StyledView>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </StyledView>

          {/* Emergency Contact Section */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-primary text-lg font-bold mb-4">
              Emergency Contact
            </StyledText>

            {renderFormField(
              "Name",
              "Enter emergency contact name",
              "emergencyName",
              formData.emergencyName
            )}
            {renderFormField(
              "Phone Number",
              "Enter emergency contact number",
              "emergencyNumber",
              formData.emergencyNumber,
              "phone-pad"
            )}
          </StyledView>

          {/* Document Upload Section */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <StyledText className="text-primary text-lg font-bold mb-4">
              Document Upload
            </StyledText>

            <StyledText className="text-primary font-bold mb-2">
              ID Proof (Citizenship/License/Passport)
            </StyledText>

            {formData.document ? (
              <StyledView className="mb-4">
                <StyledImage
                  source={{ uri: formData.document }}
                  className="w-full h-48 rounded-lg"
                  resizeMode="cover"
                />
                <StyledTouchableOpacity
                  className="absolute top-2 right-2 bg-primary p-2 rounded-full opacity-80"
                  onPress={handleDocumentUpload}
                >
                  <Ionicons name="camera" size={16} color="white" />
                </StyledTouchableOpacity>
              </StyledView>
            ) : (
              <StyledTouchableOpacity
                className="border-2 border-dashed border-[#e9ecef] p-6 rounded-lg items-center justify-center mb-4"
                onPress={handleDocumentUpload}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={40}
                  color="#8395a7"
                />
                <StyledText className="text-[#8395a7] mt-2">
                  Tap to upload document
                </StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>

          {/* Submit Button */}
          <StyledTouchableOpacity
            className="bg-[#27ae60] p-4 rounded-lg items-center mb-8"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <StyledText className="text-white font-bold text-lg">
                Add Tenant
              </StyledText>
            )}
          </StyledTouchableOpacity>
        </StyledScrollView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default AddTenantsScreen;
