"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { OutlinedButton, PrimaryButton } from "../../../components/Buttons";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const AnnouncementDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { noticeId } = route.params || { noticeId: 1 };
  const [notice, setNotice] = useState(null);
  const [isRead, setIsRead] = useState(false);

  // Sample notices data - in a real app, this would come from an API or context
  const allNotices = [
    {
      id: 1,
      title: "Water Supply Interruption",
      description:
        "Due to maintenance work, water supply will be interrupted on July 5th from 10 AM to 2 PM. Please store water accordingly.\n\nThe maintenance team will be working on the main water supply line to fix a leak that has been reported. This is a preventive measure to avoid any major issues in the future.\n\nWe recommend storing enough water for your needs during this period. The maintenance work is expected to be completed within the specified time frame, but we will notify you if there are any changes to the schedule.\n\nWe apologize for any inconvenience this may cause and appreciate your understanding and cooperation.",
      date: "June 28, 2023",
      time: "09:15 AM",
      type: "maintenance",
      isImportant: true,
      attachments: [
        {
          id: 1,
          name: "Maintenance_Schedule.pdf",
          type: "pdf",
          size: "245 KB",
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1584677626646-7c8f83690304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      contactPerson: "John Maintenance",
      contactNumber: "+91 98765 43210",
    },
    {
      id: 2,
      title: "New Security Measures",
      description:
        "We have installed new security cameras in the common areas. Please ensure you carry your ID card at all times.\n\nThe new security system includes facial recognition technology and 24/7 monitoring to ensure the safety of all residents. The cameras have been installed at all entry and exit points, as well as in the lobby, elevators, and parking areas.\n\nAll residents are required to update their information and photos at the management office by the end of this month. This will help us maintain an up-to-date database for the new security system.\n\nThank you for your cooperation in making our community safer.",
      date: "June 20, 2023",
      time: "02:30 PM",
      type: "security",
      isImportant: false,
      attachments: [
        {
          id: 1,
          name: "Security_Guidelines.pdf",
          type: "pdf",
          size: "320 KB",
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      contactPerson: "Security Manager",
      contactNumber: "+91 98765 43211",
    },
    {
      id: 3,
      title: "Rent Revision Notice",
      description:
        "As per the lease agreement, there will be a 5% increase in rent starting from August 1, 2023.\n\nThis increase is in line with the annual rent revision clause mentioned in your lease agreement. The new rent amount will be reflected in your August invoice.\n\nIf you have any questions or concerns regarding this increase, please contact the management office during working hours.\n\nWe value you as our tenant and look forward to your continued stay with us.",
      date: "June 15, 2023",
      time: "11:00 AM",
      type: "payment",
      isImportant: true,
      attachments: [
        {
          id: 1,
          name: "Rent_Revision_Details.pdf",
          type: "pdf",
          size: "180 KB",
        },
      ],
      images: [],
      contactPerson: "Finance Manager",
      contactNumber: "+91 98765 43212",
    },
    {
      id: 4,
      title: "Community Event",
      description:
        "We are organizing a community gathering on July 10th at 6 PM in the common area. All tenants are welcome to join.\n\nThe event will include refreshments, music, and activities for children. This is a great opportunity to meet your neighbors and build a stronger community.\n\nWe will also be discussing upcoming community initiatives and collecting feedback on how we can improve our services.\n\nPlease RSVP by July 5th by contacting the management office or using the community app.",
      date: "June 10, 2023",
      time: "04:45 PM",
      type: "event",
      isImportant: false,
      attachments: [
        {
          id: 1,
          name: "Event_Details.pdf",
          type: "pdf",
          size: "210 KB",
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      contactPerson: "Event Coordinator",
      contactNumber: "+91 98765 43213",
    },
    {
      id: 5,
      title: "Pest Control Service",
      description:
        "Pest control service will be conducted on July 8th. Please ensure your presence or make arrangements for access.\n\nThe pest control team will be treating all apartments for common household pests. The treatment is safe for humans and pets, but we recommend staying out of the apartment for at least 2 hours after the treatment.\n\nIf you have any specific concerns or if anyone in your household has allergies, please inform the management office in advance.\n\nThank you for your cooperation.",
      date: "June 25, 2023",
      time: "10:20 AM",
      type: "maintenance",
      isImportant: true,
      attachments: [
        {
          id: 1,
          name: "Pest_Control_Info.pdf",
          type: "pdf",
          size: "275 KB",
        },
      ],
      images: [],
      contactPerson: "Maintenance Manager",
      contactNumber: "+91 98765 43214",
    },
    {
      id: 6,
      title: "Parking Rules Update",
      description:
        "Please note that parking in visitor spots for more than 24 hours is not allowed. Vehicles will be towed at owner's expense.\n\nWe have noticed an increase in the misuse of visitor parking spots. Each apartment is allocated specific parking spots as per the lease agreement, and visitor spots are meant for temporary use by guests only.\n\nVehicles parked in visitor spots for more than 24 hours without prior permission will be towed at the owner's expense. If you need additional parking, please contact the management office to discuss available options.\n\nThank you for your understanding and cooperation.",
      date: "June 18, 2023",
      time: "03:10 PM",
      type: "security",
      isImportant: false,
      attachments: [
        {
          id: 1,
          name: "Parking_Rules.pdf",
          type: "pdf",
          size: "195 KB",
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      ],
      contactPerson: "Parking Manager",
      contactNumber: "+91 98765 43215",
    },
  ];

  useEffect(() => {
    // Find the notice with the matching ID
    const foundNotice = allNotices.find((n) => n.id === noticeId);
    if (foundNotice) {
      setNotice(foundNotice);
    }
  }, [noticeId]);

  const getNoticeIcon = (type) => {
    switch (type) {
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
    switch (type) {
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
            <Ionicons name="share-outline" size={24} color="white" />
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
            <TouchableOpacity onPress={toggleReadStatus}>
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
            </TouchableOpacity>
          </StyledView>

          {/* Notice Images */}
          {notice.images && notice.images.length > 0 && (
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
              <StyledTouchableOpacity className="bg-primary p-3 rounded-full">
                <Ionicons name="call" size={20} color="white" />
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        )}

        {/* Action Buttons */}
        <StyledView className="px-4 py-6 flex-row justify-between">
          <OutlinedButton
            text="Back to Notices"
            onPress={() => navigation.goBack()}
          />
          <PrimaryButton text="Share Notice" onPress={shareNotice} />
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default AnnouncementDetails;
