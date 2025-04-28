"use client";

import { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Alert,
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

const AnnouncementList = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Use React Query to fetch notices with type filtering
  const {
    data: notices = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useNotice(filterType).getNoticeRequests();

  const { mutate: deleteNotice, isLoading: isDeleting } =
    useNotice().deleteNoticeRequest();

  // Filter notices by search query
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

  const filterTypes = [
    { id: "all", label: "All" },
    { id: "Maintenance", label: "Maintenance" },
    { id: "Security", label: "Security" },
    { id: "Payment", label: "Payment" },
    { id: "Events", label: "Events" },
  ];

  console.log(notices);

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
      case "events":
        return <Ionicons name="calendar" size={20} color="#27ae60" />;
      default:
        return <Entypo name="notification" size={20} color="#8395a7" />;
    }
  };

  const navigateToNoticeDetails = (noticeId) => {
    // @ts-ignore - Ignore type checking for navigation params
    navigation.navigate("AnnouncementDetails", { noticeId });
  };

  const handleDeleteNotice = (noticeId) => {
    Alert.alert(
      "Delete Notice",
      "Are you sure you want to delete this notice? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDeletingId(noticeId);
            deleteNotice(noticeId, {
              onSuccess: () => {
                setDeletingId(null);
                Alert.alert("Success", "Notice deleted successfully");
                refetch();
              },
              onError: (err) => {
                setDeletingId(null);
                Alert.alert("Error", err.message || "Failed to delete notice");
              },
            });
          },
        },
      ]
    );
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-6 px-4">
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
              className={`mr-2 px-4 py-2 rounded-full ${
                filterType === type.id
                  ? "bg-[#27ae60]"
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

                {/* Admin Actions */}
                <StyledView className="flex-row border-t border-[#f0f2f5]">
                  <StyledTouchableOpacity
                    className="flex-1 py-3 flex-row justify-center items-center"
                    onPress={() =>
                      navigation.navigate("AddAnnouncement", {
                        noticeId: notice._id,
                        data: notice,
                      })
                    }
                  >
                    <Ionicons name="pencil" size={16} color="#3498db" />
                    <StyledText className="text-[#3498db] ml-1 font-medium">
                      Edit
                    </StyledText>
                  </StyledTouchableOpacity>

                  <StyledView className="w-[1px] bg-[#f0f2f5]" />

                  <StyledTouchableOpacity
                    className="flex-1 py-3 flex-row justify-center items-center"
                    onPress={() => handleDeleteNotice(notice._id)}
                    disabled={isDeleting && deletingId === notice.id}
                  >
                    {isDeleting && deletingId === notice.id ? (
                      <ActivityIndicator size="small" color="#e74c3c" />
                    ) : (
                      <>
                        <Ionicons name="trash-bin" size={16} color="#e74c3c" />
                        <StyledText className="text-[#e74c3c] ml-1 font-medium">
                          Delete
                        </StyledText>
                      </>
                    )}
                  </StyledTouchableOpacity>
                </StyledView>
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

      {/* Add Notice Button (for admin/landlord) */}
      <StyledTouchableOpacity
        className="absolute bottom-6 right-6 bg-[#27ae60] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => navigation.navigate("AddAnnouncement")}
      >
        <Ionicons name="add" size={30} color="white" />
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default AnnouncementList;
