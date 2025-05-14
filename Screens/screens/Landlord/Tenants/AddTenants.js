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
  Share,
  Modal,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import {
  OutlinedButton,
  PrimaryButton,
  SecondaryButton,
} from "../../../../components/Buttons";
import { useTenants } from "../../../../hooks/useTenants";
import { useAuth } from "../../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    name: "Divash Ranabhat",
    address: "123 Main Street, Kathmandu, Nepal",
    phoneNumber: "9841234567",
    email: "rbdiwash@gmail.com",
    document: null, // This would be a URI in real usage
    profileImage: null, // This would be a URI in real usage
    noOfRooms: "2",
    totalRentPerMonth: "25000",
    startingDate: new Date("2024-04-01"),
    emergencyContactName: "Rajiv Sodari",
    emergencyContactNumber: "9849876543",
    landlordId: null, // Initialize as null, will be set when userData is loaded
  });
  const { createTenant, updateTenant } = useTenants();
  const { mutate } = createTenant();
  const { mutate: updateMutate } = updateTenant();
  const route = useRoute();
  const { tenantData } = route.params || {};

  useEffect(() => {
    if (tenantData) {
      // Format the date if it exists
      const startingDate = tenantData.startingDate
        ? new Date(tenantData.startingDate)
        : new Date();

      // Set the selected date for display
      setSelectedDate(
        startingDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );

      // Set form data with proper type conversion
      setFormData({
        ...tenantData,
        noOfRooms: tenantData.noOfRooms?.toString() || "0",
        totalRentPerMonth: tenantData.totalRentPerMonth?.toString() || "0",
      });
    }
  }, [tenantData]);

  const { refetch } = useTenants().getTenantByLandlordId(userData?._id);
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

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
          setFormData((prev) => ({
            ...prev,
            landlordId: parsedData._id,
          }));
        }
      } catch (error) {
        console.error("Error reading userData from AsyncStorage:", error);
      }
    };

    getUserData();
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
      startingDate: date,
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
    setIsLoading(true);

    // Validate form
    if (!formData.name || !formData.phoneNumber) {
      alert("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!tenantData) {
      mutate(formData, {
        onSuccess: (response) => {
          if (response?.data) {
            setInvitationCode(response?.data?.invitationCode);
            setShowInvitationModal(true);
            refetch();
          }
          setIsLoading(false);
        },
        onError: (error) => {
          console.log("Error response:", error?.response?.data?.error);
          setIsLoading(false);
          alert(error?.response?.data?.error);
        },
      });
    } else {
      updateMutate(
        { id: tenantData._id, data: formData },
        {
          onSuccess: (response) => {
            alert("Tenant updated successfully");
            navigation.goBack();
            setIsLoading(false);
            refetch();
          },
          onError: (error) => {
            console.log("Error response:", error?.response?.data?.error);
            setIsLoading(false);
            alert(error?.response?.data?.error);
          },
        }
      );
    }
  };

  const handleShareInvitation = async () => {
    try {
      const message = `Hello ${formData.name},\n\nYou have been invited to join Gharbeti. Use this invitation code to complete your registration:\n\n${invitationCode}\n\nPlease download the Gharbeti app and use this code to set up your account.`;

      await Share.share({
        message,
        title: "Gharbeti Invitation Code",
      });
    } catch (error) {
      alert("Error sharing invitation code");
    }
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
        value={value?.toString()}
        onChangeText={(text) => handleInputChange(name, text)}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </StyledView>
  );

  const renderInvitationModal = () => (
    <Modal
      visible={showInvitationModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowInvitationModal(false)}
    >
      <StyledView className="flex-1 justify-center items-center bg-black/50">
        <StyledView className="bg-white p-6 rounded-xl w-[90%] max-w-[400px]">
          <StyledText className="text-primary text-xl font-bold mb-4 text-center">
            Tenant Added Successfully!
          </StyledText>

          <StyledText className="text-gray-600 mb-4 text-center">
            Share this invitation code with the tenant:
          </StyledText>

          <StyledView className="bg-gray-100 p-4 rounded-lg mb-6">
            <StyledText className="text-2xl font-bold text-center text-primary">
              {invitationCode}
            </StyledText>
          </StyledView>

          <PrimaryButton
            onPress={handleShareInvitation}
            text="Share Invitation"
            rightIcon={
              <Ionicons name="share-outline" size={24} color="white" />
            }
            parentClass={"w-full mb-2"}
          ></PrimaryButton>

          <OutlinedButton
            onPress={() => {
              setShowInvitationModal(false);
              navigation.goBack();
            }}
            text="Close"
            parentClass={"w-full"}
          ></OutlinedButton>
        </StyledView>
      </StyledView>
    </Modal>
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
            {tenantData ? "Edit Tenant" : "Add Tenant"}
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
              "phoneNumber",
              formData.phoneNumber,
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
              "noOfRooms",
              formData.noOfRooms,
              "numeric"
            )}
            {renderFormField(
              "Total Rent (Rs )",
              "Enter total rent amount",
              "totalRentPerMonth",
              formData.totalRentPerMonth,
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
              "emergencyContactName",
              formData.emergencyContactName
            )}
            {renderFormField(
              "Phone Number",
              "Enter emergency contact number",
              "emergencyContactNumber",
              formData.emergencyContactNumber,
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
                {tenantData ? "Update Tenant" : "Add Tenant"}
              </StyledText>
            )}
          </StyledTouchableOpacity>
        </StyledScrollView>
      </KeyboardAvoidingView>
      {renderInvitationModal()}
    </StyledSafeAreaView>
  );
};

export default AddTenantsScreen;
