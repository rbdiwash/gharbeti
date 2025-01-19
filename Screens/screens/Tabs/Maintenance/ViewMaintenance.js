import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import StatusModal from "./StatusModal";

const MaintenanceDetailsScreen = ({ route, navigation }) => {
  const { request } = route?.params; // Passing the request as a parameter to the screen
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(request.status);
  const [isVisible, setIsVisibility] = useState(false);
  console.log("🚀  isVisible:", isVisible);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveStatus = () => {
    request.status = selectedStatus; // Update the status in the data
    closeModal();
  };

  const getStatusColor = () => {
    switch (request.status) {
      case "Pending":
        return "bg-red-500";
      case "Ongoing":
        return "bg-yellow-500";
      case "Fixed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  const images = [
    {
      url: "https://randomuser.me/api/portraits/women/2.jpg",
      width: 240,
      height: 240,
    },
    {
      url: "https://randomuser.me/api/portraits/women/3.jpg",
      width: 240,
      height: 240,
    },
    {
      url: "https://randomuser.me/api/portraits/women/4.jpg",
      width: 240,
      height: 240,
    },
  ];
  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Details */}
      <View className="flex flex-row items-center gap-2">
        <Text className="text-xl font-bold text-gray-800 mb-1">
          {request.tenantName}
        </Text>
        <View className={`px-3 py-1 rounded-full ${getStatusColor()} mr-4`}>
          <Text className="text-white text-sm font-semibold">
            {request.status}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-gray-400 mb-4">
        {request.date} - {request.time}
      </Text>
      <Text className="text-sm text-gray-600 mb-2">{request.request}</Text>
      <TouchableOpacity onPress={() => setIsVisibility(true)}>
        <Image
          source={{ uri: images[0].url }}
          className="w-1/2 h-1/2 rounded"
        />
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisibility(false)}
      >
        <ImageViewer
          imageUrls={images}
          backgroundColor="black"
          enableSwipeDown={true}
          onCancel={() => setIsVisibility(false)}
        />
      </Modal>
      {/* Status */}
      <View className="flex-row items-center my-6 mt-12">
        <TouchableOpacity
          onPress={openModal}
          className="px-4 py-2 rounded-lg bg-primary"
        >
          <Text className="text-white text-sm font-semibold">Edit Status</Text>
        </TouchableOpacity>
      </View>

      <StatusModal
        selectedRequest={request}
        modalVisible={modalVisible}
        saveStatus={saveStatus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        closeModal={closeModal}
      />
    </View>
  );
};

export default MaintenanceDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
  },
});
