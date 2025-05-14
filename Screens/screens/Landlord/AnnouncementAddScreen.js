"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { useNotice } from "../../../hooks/useNotice";
import { PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);

const AddNoticeScreen = () => {
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { createNoticeRequest, updateNoticeRequest } = useNotice();
  const { mutate } = createNoticeRequest();

  const { refetch } = useNotice("all").getNoticeRequests();
  const { mutate: editNotice } = updateNoticeRequest();
  const route = useRoute();
  const { noticeId, data } = route.params || { noticeId: null, data: {} };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "general", // general, maintenance, security, payment, event
    isImportant: false,
    effectiveDate: new Date(),
    images: [],
    contactPerson: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (noticeId) {
      setFormData({
        title: data.title,
        description: data.description,
        type: data.type,
        isImportant: data.isImportant,
        effectiveDate: new Date(data.effectiveDate),
        images: data.images,
        contactPerson: data.contactPerson,
        contactNumber: data.contactNumber,
      });
    }
  }, [noticeId]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setFormData({
      ...formData,
      effectiveDate: date,
    });
    hideDatePicker();
  };

  // Handle image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permissions to upload images."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, result.assets[0].uri],
      });
    }
  };

  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!formData?.title?.trim()) {
      Alert.alert("Error", "Please enter a title for the notice");
      return;
    }

    if (!formData?.description?.trim()) {
      Alert.alert("Error", "Please enter a description for the notice");
      return;
    }

    // Use the mutation to create a new notice

    if (noticeId) {
      editNotice(
        { id: noticeId, data: formData },
        {
          onSuccess: (data) => {
            refetch();
            Alert.alert("Success", "Notice has been updated successfully", [
              {
                text: "OK",
                onPress: () => navigation.navigate("AnnouncementList"),
              },
            ]);
          },
          onError: (error) => {
            Alert.alert("Error", error.message || "Failed to update notice");
          },
        }
      );
    } else {
      mutate(formData, {
        onSuccess: (data) => {
          Alert.alert("Success", "Notice has been published successfully", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("AnnouncementList");
                refetch();
              },
            },
          ]);
        },
        onError: (error) => {
          Alert.alert(
            "Error",
            error.message || "Failed to publish notice. Please try again."
          );
        },
      });
    }
  };
  // Get notice type icon
  const getNoticeTypeIcon = (type, id) => {
    switch (id) {
      case "maintenance":
        return (
          <FontAwesome5
            name="tools"
            size={20}
            color={type !== id ? "#3498db" : "#fff"}
          />
        );
      case "security":
        return (
          <Ionicons
            name="shield-checkmark"
            size={20}
            color={type !== id ? "#9b59b6" : "#fff"}
          />
        );
      case "payment":
        return (
          <FontAwesome5
            name="money-bill-wave"
            size={20}
            color={type !== id ? "#e74c3c" : "#fff"}
          />
        );
      case "events":
        return (
          <Ionicons
            name="calendar"
            size={20}
            color={type !== id ? "#27ae60" : "#fff"}
          />
        );
      default:
        return (
          <Ionicons
            name="information-circle"
            size={20}
            color={type !== id ? "#8395a7" : "#fff"}
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StyledView className="flex-1 bg-[#f8f9fa]">
        {/* Header */}
        <StyledView className="bg-[#1a2c4e] py-6 px-4">
          <StyledView className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <StyledText className="text-white text-xl font-bold">
              Add Notice
            </StyledText>
            <StyledView style={{ width: 24 }} />
          </StyledView>
        </StyledView>

        <StyledScrollView className="flex-1 px-4 pt-6">
          {/* Notice Type Selection */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-[#1a2c4e] font-bold mb-3">
              Notice Type
            </StyledText>
            <StyledView className="flex-row flex-wrap justify-between">
              {[
                { id: "General", label: "General" },
                { id: "Maintenance", label: "Maintenance" },
                { id: "Security", label: "Security" },
                { id: "Payment", label: "Payment" },
                { id: "Events", label: "Events" },
              ].map((type) => (
                <StyledTouchableOpacity
                  key={type.id}
                  className={`mb-2 p-3 rounded-lg items-center justify-center w-[30%] ${
                    formData?.type?.toLowerCase() === type.id?.toLowerCase()
                      ? "bg-[#27ae60]"
                      : "bg-[#f0f2f5] border border-[#e9ecef]"
                  }`}
                  onPress={() => handleInputChange("type", type.id)}
                >
                  <StyledView className="items-center">
                    {getNoticeTypeIcon(
                      formData?.type?.toLowerCase(),
                      type.id?.toLowerCase()
                    )}
                    <StyledText
                      className={`text-xs mt-1 ${
                        formData?.type?.toLowerCase() === type.id?.toLowerCase()
                          ? "text-white"
                          : "text-[#1a2c4e]"
                      }`}
                    >
                      {type.label}
                    </StyledText>
                  </StyledView>
                </StyledTouchableOpacity>
              ))}
            </StyledView>
          </StyledView>
          {/* Notice Details */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-[#1a2c4e] font-bold mb-3">
              Notice Details
            </StyledText>

            {/* Title Input */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Title <StyledText className="text-[#e74c3c]">*</StyledText>
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3"
                placeholder="Enter notice title"
                value={formData.title}
                onChangeText={(text) => handleInputChange("title", text)}
              />
            </StyledView>

            {/* Description Input */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Description{" "}
                <StyledText className="text-[#e74c3c]">*</StyledText>
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 h-32"
                placeholder="Enter notice description"
                multiline
                textAlignVertical="top"
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
              />
            </StyledView>

            {/* Important Toggle */}
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledText className="text-[#1a2c4e]">
                Mark as Important
              </StyledText>
              <Switch
                value={formData.isImportant}
                onValueChange={(value) =>
                  handleInputChange("isImportant", value)
                }
                trackColor={{ false: "#e9ecef", true: "#27ae60" }}
                thumbColor={"#ffffff"}
              />
            </StyledView>

            {/* Date Picker */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Effective Date
              </StyledText>
              <StyledTouchableOpacity
                className="border border-[#e9ecef] rounded-lg p-3 flex-row justify-between items-center"
                onPress={showDatePicker}
              >
                <StyledText className="text-[#1a2c4e]">
                  {new Date(formData?.effectiveDate)?.toLocaleDateString()}
                </StyledText>
                <Ionicons name="calendar" size={20} color="#8395a7" />
              </StyledTouchableOpacity>
            </StyledView>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              date={new Date(formData?.effectiveDate)}
              defaultDate={new Date()}
            />
          </StyledView>
          {/* Image Upload */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-[#1a2c4e] font-bold mb-3">
              Add Images (Optional)
            </StyledText>

            <StyledView className="flex-row flex-wrap">
              {formData?.images?.map((image, index) => (
                <StyledView key={index} className="w-24 h-24 m-1 relative">
                  <StyledImage
                    source={{ uri: image }}
                    className="w-full h-full rounded-lg"
                  />
                  <StyledTouchableOpacity
                    className="absolute top-1 right-1 bg-[#e74c3c] rounded-full p-1"
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </StyledTouchableOpacity>
                </StyledView>
              ))}

              <StyledTouchableOpacity
                className="w-24 h-24 border-2 border-dashed border-[#e9ecef] rounded-lg m-1 justify-center items-center"
                onPress={pickImage}
              >
                <Ionicons name="add" size={32} color="#8395a7" />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
          {/* Contact Information */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <StyledText className="text-[#1a2c4e] font-bold mb-3">
              Contact Information (Optional)
            </StyledText>

            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Contact Person
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3"
                placeholder="Enter contact person name"
                value={formData.contactPerson}
                onChangeText={(text) =>
                  handleInputChange("contactPerson", text)
                }
              />
            </StyledView>

            <StyledView>
              <StyledText className="text-[#1a2c4e] mb-2">
                Contact Number
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3"
                placeholder="Enter contact number"
                keyboardType="phone-pad"
                value={formData.contactNumber}
                onChangeText={(text) =>
                  handleInputChange("contactNumber", text)
                }
              />
            </StyledView>
          </StyledView>
          {/* Submit Button */}

          <PrimaryButton
            text={"Submit Notice"}
            onPress={handleSubmit}
            parentClass={"mb-8"}
          />
        </StyledScrollView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default AddNoticeScreen;
