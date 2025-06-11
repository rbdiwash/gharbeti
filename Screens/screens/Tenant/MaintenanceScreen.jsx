"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMaintenance } from "../../../hooks/useMaintenance";
import { useStateData } from "../../../hooks/useStateData";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const MaintenanceScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRequests, setFilteredRequests] = useState({
    active: [],
    completed: [],
  });

  const { profile } = useStateData();

  const {
    data: activeRequests,
    isLoading: isActiveLoading,
    isError: isActiveError,
    error: activeError,
    refetch: refetchActive,
  } = useMaintenance().getMaintenanceRequests({
    landlordId: profile?.landlord?._id,
    tenantId: profile?._id,
    status: "Pending",
  });

  console.log(activeRequests);

  console.log("activeRequests", activeRequests);

  const {
    data: completedRequests,
    isLoading: isCompletedLoading,
    isError: isCompletedError,
    error: completedError,
    refetch: refetchCompleted,
  } = useMaintenance().getMaintenanceRequests({
    landlordId: profile?.landlord?._id,
    tenantId: profile?._id,
    status: "Completed",
  });

  useEffect(() => {
    if (activeRequests || completedRequests) {
      const filterRequests = (requests, query) => {
        if (!requests) return [];
        if (!query.trim()) return requests;

        const lowerCaseQuery = query.toLowerCase();
        return requests.filter(
          (request) =>
            request.title.toLowerCase().includes(lowerCaseQuery) ||
            request.description.toLowerCase().includes(lowerCaseQuery) ||
            request.status.toLowerCase().includes(lowerCaseQuery) ||
            request.priority.toLowerCase().includes(lowerCaseQuery)
        );
      };

      setFilteredRequests({
        active: filterRequests(activeRequests || [], searchQuery),
        completed: filterRequests(completedRequests || [], searchQuery),
      });
    }
  }, [searchQuery, activeRequests, completedRequests]);

  // Handle pull-to-refresh
  const handleRefresh = () => {
    if (activeTab === "active") {
      refetchActive();
    } else {
      refetchCompleted();
    }
  };

  // Handle error states
  useEffect(() => {
    if (isActiveError) {
      Alert.alert(
        "Error",
        activeError?.message || "Failed to fetch active maintenance requests"
      );
    }
    if (isCompletedError) {
      Alert.alert(
        "Error",
        completedError?.message ||
          "Failed to fetch completed maintenance requests"
      );
    }
  }, [isActiveError, activeError, isCompletedError, completedError]);

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

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledText className="text-white text-xl font-bold">
            Maintenance Requests
          </StyledText>
          <StyledTouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => navigation.navigate("NewMaintenance")}
          >
            <Ionicons name="add" size={24} color="black" />
          </StyledTouchableOpacity>
        </StyledView>

        {/* Search Bar */}
        <StyledView className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#8395a7" />
          <StyledTextInput
            className="flex-1 ml-2 text-[#1a2c4e]"
            placeholder="Search requests..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8395a7" />
            </TouchableOpacity>
          )}
        </StyledView>
      </StyledView>

      {/* Tabs */}
      <StyledView className="flex-row px-4 mt-4">
        <StyledTouchableOpacity
          className={`flex-1 py-2 ${
            activeTab === "active" ? "border-b-2 border-secondary" : ""
          }`}
          onPress={() => setActiveTab("active")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "active" ? "text-secondary" : "text-[#8395a7]"
            }`}
          >
            Active ({filteredRequests.active.length || 0})
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className={`flex-1 py-2 ${
            activeTab === "completed" ? "border-b-2 border-secondary" : ""
          }`}
          onPress={() => setActiveTab("completed")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "completed" ? "text-secondary" : "text-[#8395a7]"
            }`}
          >
            Completed ({filteredRequests.completed.length || 0})
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Request List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {filteredRequests[activeTab] &&
        filteredRequests[activeTab].length > 0 ? (
          filteredRequests[activeTab].map((request) => (
            <StyledTouchableOpacity
              key={request._id}
              className="bg-white p-4 rounded-xl mb-4 shadow"
              onPress={() => {
                // @ts-ignore - Ignore type checking for navigation params
                navigation.navigate("MaintenanceDetails", {
                  requestId: request._id,
                });
              }}
            >
              <StyledView className="flex-row justify-between items-start mb-2">
                <StyledView className="flex-1">
                  <StyledText className="text-[#1a2c4e] text-lg font-bold mb-1">
                    {request.title}
                  </StyledText>
                  <StyledText className="text-[#8395a7]">
                    {request.description}
                  </StyledText>
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
              <StyledView className="flex-row justify-between items-center mt-3">
                <StyledText className="text-[#8395a7]">
                  {activeTab === "completed" && request.completedDate
                    ? `Completed: ${new Date(
                        request.completedDate
                      ).toLocaleDateString()}`
                    : `Reported: ${new Date(
                        request.createdAt
                      ).toLocaleString()}`}
                </StyledText>
                <StyledText
                  className={`font-medium ${getPriorityColor(
                    request.priority
                  )}`}
                >
                  {request.priority} Priority
                </StyledText>
              </StyledView>
            </StyledTouchableOpacity>
          ))
        ) : (
          <StyledView className="items-center justify-center py-10">
            <Ionicons name="search" size={50} color="#e9ecef" />
            <StyledText className="text-[#8395a7] mt-2 text-center">
              {searchQuery
                ? "No maintenance requests found matching your search"
                : `No ${activeTab} maintenance requests`}
            </StyledText>
          </StyledView>
        )}
      </ScrollView>
    </StyledView>
  );
};

export default MaintenanceScreen;
