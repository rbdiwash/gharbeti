"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
} from "react-native";
import { styled } from "nativewind";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const MaintenanceDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const requestId =
    route.params && "requestId" in route.params ? route.params.requestId : 1;

  // Also add a useEffect to log when the component mounts to help with debugging
  useEffect(() => {
    console.log("MaintenanceDetails mounted with requestId:", requestId);
  }, []);

  // In a real app, you would fetch this data from an API based on requestId
  const [request, setRequest] = useState({
    id: requestId,
    title: "Plumbing Issue",
    description:
      "Leaking tap in kitchen sink. Water is continuously dripping and causing water wastage.",
    status: "In Progress",
    date: "June 15, 2023",
    priority: "High",
    category: "plumbing",
    images: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      "https://images.unsplash.com/photo-1603380680632-fac7bed18b13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    ],
    updates: [
      {
        id: 1,
        date: "June 15, 2023",
        time: "10:30 AM",
        text: "Maintenance request submitted",
        type: "system",
      },
      {
        id: 2,
        date: "June 15, 2023",
        time: "11:45 AM",
        text: "Your request has been assigned to a technician",
        type: "system",
      },
      {
        id: 3,
        date: "June 16, 2023",
        time: "09:15 AM",
        text: "Technician will visit between 2 PM and 4 PM today",
        type: "landlord",
      },
      {
        id: 4,
        date: "June 16, 2023",
        time: "02:30 PM",
        text: "Technician has arrived and is working on the issue",
        type: "system",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState({ ...request });
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const categories = [
    { id: "plumbing", name: "Plumbing", icon: "water" },
    { id: "electrical", name: "Electrical", icon: "flash" },
    { id: "appliance", name: "Appliance", icon: "desktop" },
    { id: "structural", name: "Structural", icon: "home" },
    { id: "hvac", name: "HVAC", icon: "thermometer" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
  ];

  const priorities = ["Low", "Medium", "High"];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-[#3498db]";
      case "Pending":
        return "bg-[#f1c40f]";
      case "Completed":
        return "bg-[#27ae60]";
      default:
        return "bg-[#8395a7]";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-[#e74c3c]";
      case "Medium":
        return "text-[#f1c40f]";
      case "Low":
        return "text-[#27ae60]";
      default:
        return "text-[#8395a7]";
    }
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.icon : "ellipsis-horizontal";
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Other";
  };

  const handleInputChange = (field, value) => {
    setEditedRequest({ ...editedRequest, [field]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setEditedRequest({
        ...editedRequest,
        images: [...editedRequest.images, result.assets[0].uri],
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...editedRequest.images];
    updatedImages.splice(index, 1);
    setEditedRequest({ ...editedRequest, images: updatedImages });
  };

  const saveChanges = () => {
    if (!editedRequest.title.trim()) {
      Alert.alert("Error", "Please enter a title for your request");
      return;
    }

    if (!editedRequest.description.trim()) {
      Alert.alert("Error", "Please describe the issue");
      return;
    }

    // Add a system update about the edit
    const newUpdate = {
      id: request.updates.length + 1,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: "Request details updated by tenant",
      type: "system",
    };

    const updatedRequest = {
      ...editedRequest,
      updates: [...editedRequest.updates, newUpdate],
    };

    setRequest(updatedRequest);
    setIsEditing(false);

    Alert.alert(
      "Success",
      "Your maintenance request has been updated successfully"
    );
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const newUpdate = {
      id: request.updates.length + 1,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      text: newComment,
      type: "tenant",
    };

    const updatedRequest = {
      ...request,
      updates: [...request.updates, newUpdate],
    };

    setRequest(updatedRequest);
    setNewComment("");
  };

  const cancelEdit = () => {
    setEditedRequest({ ...request });
    setIsEditing(false);
  };

  const viewImage = (imageUri) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
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
            Maintenance Details
          </StyledText>
          {!isEditing ? (
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={cancelEdit}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          )}
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Request Details */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          {!isEditing ? (
            <>
              <StyledView className="flex-row justify-between items-start mb-4">
                <StyledView className="flex-1">
                  <StyledText className="text-[#1a2c4e] text-xl font-bold mb-1">
                    {request.title}
                  </StyledText>
                  <StyledView className="flex-row items-center">
                    <Ionicons
                      name={getCategoryIcon(request.category)}
                      size={16}
                      color="#8395a7"
                    />
                    <StyledText className="text-[#8395a7] ml-1">
                      {getCategoryName(request.category)}
                    </StyledText>
                  </StyledView>
                </StyledView>
                <StyledView
                  className={`${getStatusColor(
                    request.status
                  )} px-3 py-1 rounded-full ml-2`}
                >
                  <StyledText className="text-white text-sm">
                    {request.status}
                  </StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="mb-4">
                <StyledText className="text-[#1a2c4e] font-bold mb-1">
                  Description
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  {request.description}
                </StyledText>
              </StyledView>

              <StyledView className="flex-row justify-between items-center mb-4">
                <StyledView>
                  <StyledText className="text-[#8395a7]">
                    Date Submitted
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {request.date}
                  </StyledText>
                </StyledView>
                <StyledView>
                  <StyledText className="text-[#8395a7] text-right">
                    Priority
                  </StyledText>
                  <StyledText
                    className={`font-bold text-right ${getPriorityColor(
                      request.priority
                    )}`}
                  >
                    {request.priority}
                  </StyledText>
                </StyledView>
              </StyledView>

              {request.images.length > 0 && (
                <StyledView>
                  <StyledText className="text-[#1a2c4e] font-bold mb-2">
                    Photos
                  </StyledText>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <StyledView className="flex-row">
                      {request.images.map((image, index) => (
                        <TouchableOpacity
                          key={index}
                          className="w-24 h-24 mr-2 rounded-lg overflow-hidden"
                          onPress={() => viewImage(image)}
                        >
                          <Image
                            source={{ uri: image }}
                            className="w-full h-full"
                          />
                        </TouchableOpacity>
                      ))}
                    </StyledView>
                  </ScrollView>
                </StyledView>
              )}
            </>
          ) : (
            <>
              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Title
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 mb-4"
                value={editedRequest.title}
                onChangeText={(text) => handleInputChange("title", text)}
              />

              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Category
              </StyledText>
              <StyledView className="flex-row flex-wrap justify-between mb-4">
                {categories.map((category) => (
                  <StyledTouchableOpacity
                    key={category.id}
                    className={`w-[31%] p-3 rounded-lg mb-3 items-center ${
                      editedRequest.category === category.id
                        ? "bg-[#27ae60]"
                        : "bg-[#f8f9fa] border border-[#e9ecef]"
                    }`}
                    onPress={() => handleInputChange("category", category.id)}
                  >
                    <Ionicons
                      name={category.icon}
                      size={24}
                      color={
                        editedRequest.category === category.id
                          ? "white"
                          : "#8395a7"
                      }
                    />
                    <StyledText
                      className={`mt-1 text-sm ${
                        editedRequest.category === category.id
                          ? "text-white"
                          : "text-[#1a2c4e]"
                      }`}
                    >
                      {category.name}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>

              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Description
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 mb-4 h-24"
                multiline
                textAlignVertical="top"
                value={editedRequest.description}
                onChangeText={(text) => handleInputChange("description", text)}
              />

              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Priority
              </StyledText>
              <StyledView className="flex-row justify-between mb-4">
                {priorities.map((priority) => (
                  <StyledTouchableOpacity
                    key={priority}
                    className={`flex-1 p-3 rounded-lg mx-1 items-center ${
                      editedRequest.priority === priority
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
                        editedRequest.priority === priority
                          ? "text-white"
                          : "text-[#1a2c4e]"
                      }`}
                    >
                      {priority}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>

              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Photos
              </StyledText>
              <StyledView className="flex-row flex-wrap">
                {editedRequest.images.map((image, index) => (
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

              <StyledView className="flex-row justify-end mt-4">
                <StyledTouchableOpacity
                  className="bg-[#e74c3c] px-4 py-2 rounded-lg mr-2"
                  onPress={cancelEdit}
                >
                  <StyledText className="text-white font-bold">
                    Cancel
                  </StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity
                  className="bg-[#27ae60] px-4 py-2 rounded-lg"
                  onPress={saveChanges}
                >
                  <StyledText className="text-white font-bold">
                    Save Changes
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </>
          )}
        </StyledView>

        {/* Status Timeline */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
            Status Updates
          </StyledText>

          {request.updates.map((update, index) => (
            <StyledView key={update.id} className="mb-4 last:mb-0">
              <StyledView className="flex-row">
                <StyledView className="items-center mr-3">
                  <StyledView
                    className={`w-10 h-10 rounded-full justify-center items-center ${
                      update.type === "system"
                        ? "bg-[#3498db]"
                        : update.type === "landlord"
                        ? "bg-[#9b59b6]"
                        : "bg-[#27ae60]"
                    }`}
                  >
                    {update.type === "system" ? (
                      <Ionicons name="notifications" size={20} color="white" />
                    ) : update.type === "landlord" ? (
                      <FontAwesome5 name="user" size={16} color="white" />
                    ) : (
                      <Ionicons name="person" size={20} color="white" />
                    )}
                  </StyledView>
                  {index < request.updates.length - 1 && (
                    <StyledView className="w-0.5 flex-1 bg-[#e9ecef] my-1" />
                  )}
                </StyledView>

                <StyledView className="flex-1 pb-4">
                  <StyledView className="flex-row justify-between items-center mb-1">
                    <StyledText className="text-[#1a2c4e] font-bold">
                      {update.type === "system"
                        ? "System Update"
                        : update.type === "landlord"
                        ? "Landlord"
                        : "You"}
                    </StyledText>
                    <StyledText className="text-[#8395a7] text-sm">
                      {update.date} at {update.time}
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-[#8395a7]">
                    {update.text}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          ))}

          {/* Add Comment */}
          <StyledView className="mt-4 pt-4 border-t border-[#e9ecef]">
            <StyledText className="text-[#1a2c4e] font-bold mb-2">
              Add Comment
            </StyledText>
            <StyledTextInput
              className="border border-[#e9ecef] rounded-lg p-3 mb-2 h-20"
              placeholder="Type your comment here..."
              multiline
              textAlignVertical="top"
              value={newComment}
              onChangeText={setNewComment}
            />
            <StyledTouchableOpacity
              className="bg-[#27ae60] p-3 rounded-lg self-end"
              onPress={addComment}
            >
              <StyledText className="text-white font-bold">
                Send Comment
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </ScrollView>

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <StyledView className="flex-1 bg-black/90 justify-center items-center">
          <TouchableOpacity
            className="absolute top-12 right-4 z-10"
            onPress={() => setImageModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              className="w-full h-2/3"
              resizeMode="contain"
            />
          )}
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default MaintenanceDetails;
