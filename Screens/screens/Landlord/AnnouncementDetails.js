"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
  Linking,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OutlinedButton, PrimaryButton } from "../../../components/Buttons";
import { useNotice } from "../../../hooks/useNotice";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AnnouncementDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noticeId } = route.params || { noticeId: 1 };
  const [isRead, setIsRead] = useState(false);

  const {
    data: notice = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useNotice().getNoticeRequestById(noticeId);

  const getNoticeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "maintenance":
        return <FontAwesome5 name="tools" size={24} color="#3498db" />;
      case "security":
        return <Ionicons name="shield-checkmark" size={24} color="#9b59b6" />;
      case "payment":
        return (
          <FontAwesome5 name="money-bill-wave" size={24} color="#e74c3c" />
        );
      case "event":
        return <Ionicons name="calendar" size={24} color="#27ae60" />;
      default:
        return <Entypo name="notification" size={24} color="#8395a7" />;
    }
  };

  const getNoticeTypeText = (type) => {
    switch (type?.toLowerCase()) {
      case "maintenance":
        return "Maintenance";
      case "security":
        return "Security";
      case "payment":
        return "Payment";
      case "event":
        return "Event";
      default:
        return "General";
    }
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FontAwesome5 name="file-pdf" size={20} color="#e74c3c" />;
      case "doc":
        return <FontAwesome5 name="file-word" size={20} color="#3498db" />;
      case "xls":
        return <FontAwesome5 name="file-excel" size={20} color="#27ae60" />;
      default:
        return <FontAwesome5 name="file-alt" size={20} color="#8395a7" />;
    }
  };

  const toggleReadStatus = () => {
    setIsRead(!isRead);
  };

  const deleteNotice = () => {
    useNotice().deleteNoticeRequest(noticeId);
  };

  const shareNotice = async () => {
    if (!notice) return;

    try {
      await Share.share({
        title: notice.title,
        message: `${notice.title}\n\n${notice.description}\n\nDate: ${notice.date}`,
      });
    } catch (error) {
      console.error("Error sharing notice:", error);
    }
  };

  if (!notice) {
    return (
      <StyledView className="flex-1 bg-[#f8f9fa] justify-center items-center">
        <Ionicons name="alert-circle-outline" size={50} color="#8395a7" />
        <StyledText className="text-[#1a2c4e] text-lg mt-4">
          Notice not found
        </StyledText>
      </StyledView>
    );
  }

  // This function will be triggered when user clicks "Call" button
  const makePhoneCall = (phoneNumber) => {
    if (!phoneNumber) {
      Alert.alert("Phone number not available");
      return;
    }

    let phoneUrl = `tel:${phoneNumber}`;

    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone call is not supported on this device");
        } else {
          return Linking.openURL(phoneUrl);
        }
      })
      .catch((err) => console.error("Error opening dialer", err));
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Notice Details
          </StyledText>
          <TouchableOpacity onPress={shareNotice}>
            <Ionicons name="share" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1">
        {/* Notice Header */}
        <StyledView className="px-4 py-6 bg-white">
          <StyledView className="flex-row items-center mb-2">
            <StyledView className="bg-[#f8f9fa] p-3 rounded-full mr-3">
              {getNoticeIcon(notice.type)}
            </StyledView>
            <StyledView className="flex-1">
              <StyledView className="flex-row justify-between items-center">
                <StyledText className="text-[#8395a7]">
                  {getNoticeTypeText(notice.type)}
                </StyledText>
                {notice.isImportant && (
                  <StyledView className="bg-[#e74c3c] px-2 py-1 rounded">
                    <StyledText className="text-white text-xs">
                      Important
                    </StyledText>
                  </StyledView>
                )}
              </StyledView>
              <StyledText className="text-[#1a2c4e] text-xl font-bold">
                {notice.title}
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="flex-row justify-between items-center mt-2 mb-4">
            <StyledText className="text-[#8395a7]">
              {notice.date} at {notice.time}
            </StyledText>

            {/* <TouchableOpacity onPress={toggleReadStatus}>
              <StyledView className="flex-row items-center">
                <Ionicons
                  name={
                    isRead ? "checkmark-circle" : "checkmark-circle-outline"
                  }
                  size={18}
                  color={isRead ? "#27ae60" : "#8395a7"}
                />
                <StyledText
                  className={`ml-1 ${
                    isRead ? "text-primary" : "text-[#8395a7]"
                  }`}
                >
                  {isRead ? "Read" : "Mark as read"}
                </StyledText>
              </StyledView>
            </TouchableOpacity> */}
          </StyledView>

          {/* Notice Images */}
          {notice.images && notice.images.length > 0 ? (
            <StyledView className="mb-4">
              {notice.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  className="w-full h-48 rounded-lg mb-2"
                  resizeMode="cover"
                />
              ))}
            </StyledView>
          ) : (
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e]">No images</StyledText>
            </StyledView>
          )}

          {/* Notice Description */}
          <StyledText className="text-[#1a2c4e] leading-6 mb-4">
            {notice.description}
          </StyledText>

          {/* Attachments */}
          {notice.attachments && notice.attachments.length > 0 && (
            <StyledView className="mt-2">
              <StyledText className="text-[#1a2c4e] font-bold mb-2">
                Attachments
              </StyledText>
              {notice.attachments.map((attachment) => (
                <StyledTouchableOpacity
                  key={attachment.id}
                  className="flex-row items-center bg-[#f8f9fa] p-3 rounded-lg mb-2"
                >
                  {getAttachmentIcon(attachment.type)}
                  <StyledView className="flex-1 ml-3">
                    <StyledText className="text-[#1a2c4e] font-medium">
                      {attachment.name}
                    </StyledText>
                    <StyledText className="text-[#8395a7] text-sm">
                      {attachment.size}
                    </StyledText>
                  </StyledView>
                  <Ionicons name="download-outline" size={20} color="#3498db" />
                </StyledTouchableOpacity>
              ))}
            </StyledView>
          )}
        </StyledView>

        {/* Contact Information */}
        {notice.contactPerson && (
          <StyledView className="px-4 py-4 mt-2 bg-white">
            <StyledText className="text-[#1a2c4e] font-bold mb-2">
              Contact Information
            </StyledText>
            <StyledView className="flex-row justify-between items-center">
              <StyledView>
                <StyledText className="text-[#1a2c4e]">
                  {notice.contactPerson}
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  {notice.contactNumber}
                </StyledText>
              </StyledView>
              <StyledTouchableOpacity
                className="bg-primary p-3 rounded-full"
                onPress={() => makePhoneCall(notice?.contactNumber)}
              >
                <Ionicons name="call" size={20} color="white" />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        )}

        {/* Action Buttons */}
        <StyledView className="px-4 py-6 flex-row justify-between">
          <OutlinedButton
            text="Back to Notices"
            size="small"
            onPress={() => navigation.goBack()}
          />
          <PrimaryButton
            text="Share Notice"
            size="small"
            onPress={shareNotice}
          />
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default AnnouncementDetails;
