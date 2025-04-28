"use client";

import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useMaintenance } from "../../../../hooks/useMaintenance";
import StatusModal from "./StatusModal";
import { PrimaryButton } from "../../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const MaintenanceDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const requestId = route.params?.requestId;

  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [changeStatusModalVisible, setChangeStatusModalVisible] =
    useState(false);

  // Using hooks to fetch data and perform mutations
  const {
    data: request,
    isLoading,
    isError,
    error,
    refetch,
  } = useMaintenance().getMaintenanceRequestById(requestId);

  console.log(request);

  const { mutate: addComment, isLoading: isAddingComment } =
    useMaintenance().addMaintenanceComment();

  const { mutate: deleteRequest, isLoading: isDeleting } =
    useMaintenance().deleteMaintenanceRequest();

  // Refresh data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Error handling
  useEffect(() => {
    if (isError) {
      Alert.alert(
        "Error",
        error?.message || "Failed to load maintenance request details",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    }
  }, [isError, error, navigation]);

  // Handle adding a comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(
      { id: requestId, comment: newComment },
      {
        onSuccess: () => {
          setNewComment("");
        },
        onError: (error) => {
          Alert.alert("Error", error.message || "Failed to add comment");
        },
      }
    );
  };

  // Handle deleting a request
  const handleDeleteRequest = () => {
    Alert.alert(
      "Delete Request",
      "Are you sure you want to delete this maintenance request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteRequest(requestId, {
              onSuccess: () => {
                Alert.alert(
                  "Success",
                  "Maintenance request deleted successfully"
                );
                navigation.navigate("Maintenance");
              },
              onError: (error) => {
                Alert.alert(
                  "Error",
                  error.message || "Failed to delete request"
                );
              },
            });
          },
        },
      ]
    );
  };

  const viewImage = (imageUri) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  // If loading, show a loading spinner
  if (isLoading) {
    return (
      <StyledView className="flex-1 bg-[#f8f9fa] justify-center items-center">
        <ActivityIndicator size="large" color="#27ae60" />
        <StyledText className="text-[#8395a7] mt-4">
          Loading request details...
        </StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-6 px-4">
        <StyledView className="flex-row justify-start items-center gap-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Maintenance Details
          </StyledText>
          {/* <TouchableOpacity onPress={handleDeleteRequest} disabled={isDeleting}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={isDeleting ? "#8395a7" : "white"}
            />
          </TouchableOpacity> */}
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Request Details */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row justify-between items-start mb-4">
            <StyledView className="flex-1">
              <StyledText className="text-[#1a2c4e] text-xl font-bold mb-1">
                {request?.title}
              </StyledText>
              <StyledView className="flex-row items-center">
                <Ionicons
                  name={getCategoryIcon(request?.category)}
                  size={16}
                  color="#8395a7"
                />
                <StyledText className="text-[#8395a7] ml-1">
                  {getCategoryName(request?.category)}
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView
              className={`${getStatusColor(
                request?.status
              )} px-3 py-1 rounded-full ml-2`}
            >
              <StyledText className="text-white text-sm">
                {request?.status}
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="mb-4">
            <StyledText className="text-[#1a2c4e] font-bold mb-1">
              Description
            </StyledText>
            <StyledText className="text-[#8395a7]">
              {request?.description}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledView>
              <StyledText className="text-[#8395a7]">Date Submitted</StyledText>
              <StyledText className="text-[#1a2c4e] font-medium">
                {new Date(request?.createdAt).toLocaleString()}
              </StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="text-[#8395a7] text-right">
                Priority
              </StyledText>
              <StyledText
                className={`font-bold text-right ${getPriorityColor(
                  request?.priority
                )}`}
              >
                {request?.priority}
              </StyledText>
            </StyledView>
          </StyledView>

          {/* {request?.images?.length > 0 && ( */}
          <StyledView>
            <StyledText className="text-[#1a2c4e] font-bold mb-2">
              Photos
            </StyledText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <StyledView className="flex-row">
                {request?.images?.length > 0 ? (
                  request.images.map((image, index) => (
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
                  ))
                ) : (
                  <StyledText>No Photos Available</StyledText>
                )}
              </StyledView>
            </ScrollView>
          </StyledView>
          {/* )} */}
        </StyledView>

        {/* Status Timeline */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row justify-between items-center">
            <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
              Status Updates
            </StyledText>
            <PrimaryButton
              onPress={() => setChangeStatusModalVisible(true)}
              text="Change Status"
              parentClass="self-end"
            />
          </StyledView>
          {request?.updates?.map((update, index) => (
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
              editable={!isAddingComment}
            />
            <StyledTouchableOpacity
              className="bg-[#27ae60] p-3 rounded-lg self-end flex-row items-center"
              onPress={handleAddComment}
              disabled={!newComment.trim() || isAddingComment}
              style={{
                opacity: !newComment.trim() || isAddingComment ? 0.7 : 1,
              }}
            >
              {isAddingComment ? (
                <>
                  <ActivityIndicator size="small" color="white" />
                  <StyledText className="text-white font-bold ml-2">
                    Sending...
                  </StyledText>
                </>
              ) : (
                <StyledText className="text-white font-bold">
                  Send Comment
                </StyledText>
              )}
            </StyledTouchableOpacity>
          </StyledView>
          <StatusModal
            modalVisible={changeStatusModalVisible}
            closeModal={() => setChangeStatusModalVisible(false)}
            selectedRequest={request}
            selectedStatus={request?.status}
          />
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

// Utility functions
const getCategoryIcon = (categoryId) => {
  const categories = {
    plumbing: "water",
    electrical: "flash",
    appliance: "desktop",
    structural: "home",
    hvac: "thermometer",
  };

  return categories[categoryId.toLowerCase()] || "ellipsis-horizontal";
};

const getCategoryName = (categoryId) => {
  const categories = {
    plumbing: "Plumbing",
    electrical: "Electrical",
    appliance: "Appliance",
    structural: "Structural",
    hvac: "HVAC",
    other: "Other",
  };

  return categories[categoryId.toLowerCase()] || "Other";
};

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

export default MaintenanceDetailsScreen;
