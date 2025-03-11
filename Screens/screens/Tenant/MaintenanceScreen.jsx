"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

  useEffect(() => {
    // Initialize filteredRequests with allRequests on first render
    setFilteredRequests(allRequests);
  }, []);

  const allRequests = {
    active: [
      {
        id: 1,
        title: "Plumbing Issue",
        description: "Leaking tap in kitchen sink",
        status: "In Progress",
        date: "June 15, 2023",
        priority: "High",
      },
      {
        id: 2,
        title: "Electrical Issue",
        description: "Power fluctuation in bedroom",
        status: "Pending",
        date: "June 14, 2023",
        priority: "Medium",
      },
      {
        id: 3,
        title: "Door Lock Problem",
        description: "Main door lock is not working properly",
        status: "Pending",
        date: "June 12, 2023",
        priority: "High",
      },
    ],
    completed: [
      {
        id: 4,
        title: "AC Repair",
        description: "AC not cooling properly",
        status: "Completed",
        date: "June 10, 2023",
        priority: "High",
        completedDate: "June 11, 2023",
      },
      {
        id: 5,
        title: "Bathroom Tiles",
        description: "Loose tiles in bathroom floor",
        status: "Completed",
        date: "May 25, 2023",
        priority: "Medium",
        completedDate: "May 28, 2023",
      },
      {
        id: 6,
        title: "Window Repair",
        description: "Bedroom window not closing properly",
        status: "Completed",
        date: "May 20, 2023",
        priority: "Low",
        completedDate: "May 22, 2023",
      },
    ],
  };

  useEffect(() => {
    filterRequests();
  }, [searchQuery, activeTab]);

  const filterRequests = () => {
    if (!searchQuery.trim()) {
      setFilteredRequests(allRequests);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {
      active: allRequests.active.filter(
        (request) =>
          request.title.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query) ||
          request.status.toLowerCase().includes(query) ||
          request.priority.toLowerCase().includes(query)
      ),
      completed: allRequests.completed.filter(
        (request) =>
          request.title.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query) ||
          request.status.toLowerCase().includes(query) ||
          request.priority.toLowerCase().includes(query)
      ),
    };

    setFilteredRequests(filtered);
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

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-6 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledText className="text-white text-xl font-bold">
            Maintenance Requests
          </StyledText>
          <StyledTouchableOpacity
            className="bg-[#27ae60] p-3 rounded-full"
            onPress={() => navigation.navigate("NewMaintenance")}
          >
            <Ionicons name="add" size={24} color="white" />
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
            activeTab === "active" ? "border-b-2 border-[#27ae60]" : ""
          }`}
          onPress={() => setActiveTab("active")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "active" ? "text-[#27ae60]" : "text-[#8395a7]"
            }`}
          >
            Active ({filteredRequests.active.length})
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          className={`flex-1 py-2 ${
            activeTab === "completed" ? "border-b-2 border-[#27ae60]" : ""
          }`}
          onPress={() => setActiveTab("completed")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "completed" ? "text-[#27ae60]" : "text-[#8395a7]"
            }`}
          >
            Completed ({filteredRequests.completed.length})
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Request List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {filteredRequests[activeTab] &&
        filteredRequests[activeTab].length > 0 ? (
          filteredRequests[activeTab].map((request) => (
            <StyledTouchableOpacity
              key={request.id}
              className="bg-white p-4 rounded-xl mb-4 shadow"
              onPress={() => {
                // @ts-ignore - Ignore type checking for navigation params
                navigation.navigate("MaintenanceDetails", {
                  requestId: request.id,
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
                    ? `Completed: ${request.completedDate}`
                    : `Reported: ${request.date}`}
                </StyledText>
                <StyledText
                  className={`font-bold ${getPriorityColor(request.priority)}`}
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
