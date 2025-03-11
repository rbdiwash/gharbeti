import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons"; // For the action button icon
import StatusModal from "./StatusModal";

const maintenanceRequests = [
  {
    id: "1",
    tenantName: "Ram Sharma",
    request: "Leaking pipe in the kitchen",
    date: "2025-01-18",
    time: "10:00 AM",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "2",
    tenantName: "Sita Gurung",
    request: "Broken window in the living room",
    date: "2025-01-17",
    time: "2:00 PM",
    status: "Ongoing",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "3",
    tenantName: "Krishna Bhattarai",
    request: "Clogged drain in the bathroom",
    date: "2025-01-16",
    time: "5:30 PM",
    status: "Fixed",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const MaintenanceScreen = ({ navigation }) => {
  const [requests, setRequests] = useState(maintenanceRequests);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (request) => {
    setSelectedRequest(request);
    setSelectedStatus(request.status);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRequest(null);
  };
  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };
  const saveStatus = () => {
    const updatedRequests = requests.map((request) =>
      request.id === selectedRequest.id
        ? { ...request, status: selectedStatus }
        : request
    );
    setRequests(updatedRequests);
    closeModal();
  };

  const filteredData = maintenanceRequests.filter(
    (notification) =>
      notification.tenantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      notification.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRequest = ({ item }) => (
    <View className="flex-row items-center bg-white shadow-sm rounded-lg p-4 mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">
          {item.tenantName}
        </Text>
        <Text className="text-sm text-gray-600">{item.request}</Text>
        <Text className="text-xs text-gray-400 mt-1">
          {item.date} - {item.time}
        </Text>
        {renderStatusButton(item.status, item.id)}
      </View>
      <View className="gap-2">
        <TouchableOpacity
          className="px-4 w-max py-1 rounded-full"
          onPress={() => openModal(item)}
        >
          <Icon name="edit" size={20} className="text-primary" />
        </TouchableOpacity>
        <TouchableOpacity
          className="px-4 w-max py-1 rounded-full "
          onPress={() =>
            navigation.navigate("Maintenance Request Details", {
              request: item,
            })
          }
        >
          <Icon name="visibility" size={20} className="text-primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderStatusButton = (status, id) => {
    const getStatusColor = (status) => {
      if (status === "Fixed") return "bg-green-500";
      if (status === "Ongoing") return "bg-orange-400";
      return "bg-red-600";
    };

    return (
      <View className={`flex flex-row items-center w-full gap-2`}>
        <View
          className={`h-4 w-4 rounded-full ${getStatusColor(status)}`}
        ></View>
        <Text className="text-primary text-sm">{status}</Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-4">
      <View className="bg-white p-3 mb-4 rounded-lg shadow-md flex-row items-center">
        <Icon name="search" size={24} color="gray" />
        <TextInput
          className="ml-2 flex-1"
          placeholder="Search maintenance requests..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderRequest}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <StatusModal
        selectedRequest={selectedRequest}
        modalVisible={modalVisible}
        saveStatus={saveStatus}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        closeModal={closeModal}
      />
    </View>
  );
};

export default MaintenanceScreen;
