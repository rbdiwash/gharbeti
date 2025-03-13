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
import { PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const NewMaintenanceRequest = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "",
    images: [],
  });

  const categories = [
    { id: "plumbing", name: "Plumbing", icon: "water" },
    { id: "electrical", name: "Electrical", icon: "flash" },
    { id: "appliance", name: "Appliance", icon: "desktop" },
    { id: "structural", name: "Structural", icon: "home" },
    { id: "hvac", name: "HVAC", icon: "thermometer" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
  ];

  const priorities = ["Low", "Medium", "High"];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
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

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const submitRequest = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Please enter a title for your request");
      return;
    }

    if (!formData.category) {
      Alert.alert("Error", "Please select a category");
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert("Error", "Please describe the issue");
      return;
    }

    // Here you would typically send the data to your API
    Alert.alert(
      "Success",
      "Your maintenance request has been submitted successfully",
      [{ text: "OK", onPress: () => navigation.navigate("Maintenance") }]
    );
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
            New Maintenance Request
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Title Input */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] font-bold mb-2">
            Title
          </StyledText>
          <StyledTextInput
            className="border border-[#e9ecef] rounded-lg p-3"
            placeholder="Enter a title for your request"
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />
        </StyledView>

        {/* Category Selection */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] font-bold mb-2">
            Category
          </StyledText>
          <StyledView className="flex-row flex-wrap justify-between">
            {categories.map((category) => (
              <StyledTouchableOpacity
                key={category.id}
                className={`w-[31%] p-3 rounded-lg mb-3 items-center ${
                  formData.category === category.id
                    ? "bg-[#27ae60]"
                    : "bg-[#f8f9fa] border border-[#e9ecef]"
                }`}
                onPress={() => handleInputChange("category", category.id)}
              >
                <Ionicons
                  name={category.icon}
                  size={24}
                  color={
                    formData.category === category.id ? "white" : "#8395a7"
                  }
                />
                <StyledText
                  className={`mt-1 text-sm ${
                    formData.category === category.id
                      ? "text-white"
                      : "text-[#1a2c4e]"
                  }`}
                >
                  {category.name}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>

        {/* Description Input */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] font-bold mb-2">
            Description
          </StyledText>
          <StyledTextInput
            className="border border-[#e9ecef] rounded-lg p-3 h-24"
            placeholder="Describe the issue in detail"
            multiline
            textAlignVertical="top"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
        </StyledView>

        {/* Priority Selection */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] font-bold mb-2">
            Priority
          </StyledText>
          <StyledView className="flex-row justify-between">
            {priorities.map((priority) => (
              <StyledTouchableOpacity
                key={priority}
                className={`flex-1 p-3 rounded-lg mx-1 items-center ${
                  formData.priority === priority
                    ? priority === "High"
                      ? "bg-[#e74c3c]"
                      : priority === "Medium"
                      ? "bg-[#f1c40f]"
                      : "bg-[#27ae60]"
                    : "bg-[#f8f9fa] border border-[#e9ecef]"
                }`}
                onPress={() => handleInputChange("priority", priority)}
              >
                <StyledText
                  className={`font-bold ${
                    formData.priority === priority
                      ? "text-white"
                      : "text-[#1a2c4e]"
                  }`}
                >
                  {priority}
                </StyledText>
              </StyledTouchableOpacity>
            ))}
          </StyledView>
        </StyledView>

        {/* Image Upload */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] font-bold mb-2">
            Add Photos (Optional)
          </StyledText>
          <StyledView className="flex-row flex-wrap">
            {formData.images.map((image, index) => (
              <StyledView key={index} className="w-24 h-24 m-1 relative">
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-lg"
                />
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-[#e74c3c] rounded-full p-1"
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="close" size={16} color="white" />
                </TouchableOpacity>
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

        {/* Submit Button */}

        <PrimaryButton text="Submit Request" onPress={submitRequest} />
      </ScrollView>
    </StyledView>
  );
};

export default NewMaintenanceRequest;
