"use client";

import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useNotice } from "../../../hooks/useNotice";
import { trimWithEllipsis } from "../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

const NoticesScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  // const allNotices = [
  //   {
  //     id: 1,
  //     title: "Water Supply Interruption",
  //     description:
  //       "Due to maintenance work, water supply will be interrupted on July 5th from 10 AM to 2 PM. Please store water accordingly.",
  //     date: "June 28, 2023",
  //     type: "maintenance",
  //     isImportant: true,
  //   },
  //   {
  //     id: 2,
  //     title: "New Security Measures",
  //     description:
  //       "We have installed new security cameras in the common areas. Please ensure you carry your ID card at all times.",
  //     date: "June 20, 2023",
  //     type: "security",
  //     isImportant: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Rent Revision Notice",
  //     description:
  //       "As per the lease agreement, there will be a 5% increase in rent starting from August 1, 2023.",
  //     date: "June 15, 2023",
  //     type: "payment",
  //     isImportant: true,
  //   },
  //   {
  //     id: 4,
  //     title: "Community Event",
  //     description:
  //       "We are organizing a community gathering on July 10th at 6 PM in the common area. All tenants are welcome to join.",
  //     date: "June 10, 2023",
  //     type: "event",
  //     isImportant: false,
  //   },
  //   {
  //     id: 5,
  //     title: "Pest Control Service",
  //     description:
  //       "Pest control service will be conducted on July 8th. Please ensure your presence or make arrangements for access.",
  //     date: "June 25, 2023",
  //     type: "maintenance",
  //     isImportant: true,
  //   },
  //   {
  //     id: 6,
  //     title: "Parking Rules Update",
  //     description:
  //       "Please note that parking in visitor spots for more than 24 hours is not allowed. Vehicles will be towed at owner's expense.",
  //     date: "June 18, 2023",
  //     type: "security",
  //     isImportant: false,
  //   },
  // ];

  const {
    data: notices = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useNotice(filterType).getNoticeRequests();

  const filterTypes = [
    { id: "all", label: "All" },
    { id: "maintenance", label: "Maintenance" },
    { id: "security", label: "Security" },
    { id: "payment", label: "Payment" },
    { id: "event", label: "Events" },
  ];

  const navigateToNoticeDetails = (noticeId) => {
    // @ts-ignore - Ignore type checking for navigation params
    navigation.navigate("NoticeDetails", { noticeId });
  };
  const filteredNotices = useMemo(() => {
    if (!notices) return [];

    if (!searchQuery.trim()) return notices;

    const query = searchQuery.toLowerCase();
    return notices.filter(
      (notice) =>
        notice.title.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query)
    );
  }, [notices, searchQuery]);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const getNoticeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "maintenance":
        return <FontAwesome5 name="tools" size={20} color="#3498db" />;
      case "security":
        return <Ionicons name="shield-checkmark" size={20} color="#9b59b6" />;
      case "payment":
        return (
          <FontAwesome5 name="money-bill-wave" size={20} color="#e74c3c" />
        );
      case "event":
        return <Ionicons name="calendar" size={20} color="#27ae60" />;
      default:
        return <Entypo name="notification" size={20} color="#8395a7" />;
    }
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Notices & Announcements
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>

        {/* Search Bar */}
        <StyledView className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#8395a7" />
          <StyledTextInput
            className="flex-1 ml-2 text-[#1a2c4e]"
            placeholder="Search notices..."
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

      {/* Filter Tabs */}
      <View className="px-4 pt-4 pb-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {filterTypes.map((type) => (
            <StyledTouchableOpacity
              key={type.id}
              className={`mr-2 px-4 py-1 rounded-full ${
                filterType.toLowerCase() === type.id.toLowerCase()
                  ? "bg-secondary"
                  : "bg-[#f0f2f5] border border-[#e9ecef]"
              }`}
              onPress={() => setFilterType(type.id)}
            >
              <StyledText
                className={`${
                  filterType === type.id ? "text-white" : "text-[#1a2c4e]"
                } font-medium`}
              >
                {type.label}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content Area */}
      {isLoading && !refreshing ? (
        <StyledView className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#27ae60" />
          <StyledText className="text-[#8395a7] mt-2">
            Loading notices...
          </StyledText>
        </StyledView>
      ) : isError ? (
        <StyledView className="flex-1 items-center justify-center px-4">
          <Ionicons name="alert-circle-outline" size={50} color="#e74c3c" />
          <StyledText className="text-[#1a2c4e] text-lg font-bold mt-2">
            Something went wrong
          </StyledText>
          <StyledText className="text-[#8395a7] text-center mb-4">
            {error instanceof Error ? error.message : "Failed to load notices"}
          </StyledText>
          <StyledTouchableOpacity
            className="bg-[#27ae60] px-4 py-2 rounded-lg"
            onPress={() => refetch()}
          >
            <StyledText className="text-white font-medium">
              Try Again
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      ) : (
        <StyledScrollView
          className="flex-1 px-4 pt-4"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#27ae60"]}
            />
          }
        >
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <StyledView
                key={notice._id}
                className="bg-white rounded-xl mb-4 shadow-md overflow-hidden"
              >
                <StyledTouchableOpacity
                  className="p-4"
                  onPress={() => navigateToNoticeDetails(notice._id)}
                >
                  <StyledView className="flex-row items-start">
                    <StyledView className="bg-[#f8f9fa] p-3 rounded-full mr-3">
                      {getNoticeIcon(notice.type)}
                    </StyledView>
                    <StyledView className="flex-1">
                      <StyledView className="flex-row justify-between items-center mb-2">
                        <StyledText className="text-[#1a2c4e] text-lg font-bold flex-1 pr-2">
                          {notice.title}
                        </StyledText>
                        {notice.isImportant && (
                          <StyledView className="bg-[#e74c3c] px-2 py-1 rounded">
                            <StyledText className="text-white text-xs">
                              Important
                            </StyledText>
                          </StyledView>
                        )}
                      </StyledView>
                      <StyledText className="text-[#8395a7] mb-3">
                        {trimWithEllipsis(notice.description, 100)}
                      </StyledText>
                      <StyledText className="text-[#8395a7] text-sm">
                        {new Date(notice.createdAt).toLocaleString()}
                      </StyledText>
                    </StyledView>
                  </StyledView>
                </StyledTouchableOpacity>
              </StyledView>
            ))
          ) : (
            <StyledView className="items-center justify-center py-10">
              <Ionicons name="notifications-off" size={50} color="#e9ecef" />
              <StyledText className="text-[#8395a7] mt-2 text-center">
                No notices found matching your criteria
              </StyledText>
            </StyledView>
          )}
        </StyledScrollView>
      )}
    </StyledView>
  );
};

export default NoticesScreen;
