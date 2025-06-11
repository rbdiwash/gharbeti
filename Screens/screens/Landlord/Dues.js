"use client";

import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStateData } from "../../../hooks/useStateData";
import { useTenants } from "../../../hooks/useTenants";
import { usePayments } from "../../../hooks/usePayments";
import { formatDate, getInitials } from "../../helper/const";
import { useNotification } from "../../../hooks/useNotification";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledTextInput = styled(TextInput);
const StyledSafeAreaView = styled(SafeAreaView);

// Mock data for tenants with dues
const tenantDuesData = [
  {
    id: "1",
    name: "Divash Ranabhat",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    property: "Apartment 303, Green Valley",
    dueAmount: 25000,
    dueDate: "July 1, 2023",
    daysOverdue: 0,
    paymentHistory: [
      {
        id: 1,
        amount: 25000,
        date: "June 1, 2023",
        status: "Paid",
        method: "Bank Transfer",
      },
      {
        id: 2,
        amount: 25000,
        date: "May 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
      {
        id: 3,
        amount: 25000,
        date: "April 1, 2023",
        status: "Paid",
        method: "Cash",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    property: "Apartment 205, Green Valley",
    dueAmount: 18000,
    dueDate: "June 28, 2023",
    daysOverdue: 3,
    paymentHistory: [
      {
        id: 1,
        amount: 18000,
        date: "June 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
      {
        id: 2,
        amount: 18000,
        date: "May 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
      {
        id: 3,
        amount: 18000,
        date: "April 1, 2023",
        status: "Late",
        method: "Cash",
        lateFee: 900,
      },
    ],
  },
  {
    id: "3",
    name: "Michael Brown",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    property: "Apartment 410, Green Valley",
    dueAmount: 30000,
    dueDate: "June 25, 2023",
    daysOverdue: 6,
    paymentHistory: [
      {
        id: 1,
        amount: 30000,
        date: "June 1, 2023",
        status: "Paid",
        method: "Bank Transfer",
      },
      {
        id: 2,
        amount: 30000,
        date: "May 1, 2023",
        status: "Late",
        method: "Bank Transfer",
        lateFee: 1500,
      },
      {
        id: 3,
        amount: 30000,
        date: "April 1, 2023",
        status: "Paid",
        method: "Bank Transfer",
      },
    ],
  },
  {
    id: "4",
    name: "Emily Wilson",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    property: "Apartment 112, Green Valley",
    dueAmount: 22000,
    dueDate: "July 5, 2023",
    daysOverdue: -5,
    paymentHistory: [
      {
        id: 1,
        amount: 22000,
        date: "June 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
      {
        id: 2,
        amount: 22000,
        date: "May 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
      {
        id: 3,
        amount: 22000,
        date: "April 1, 2023",
        status: "Paid",
        method: "Esewa",
      },
    ],
  },
  {
    id: "5",
    name: "Luke Findel",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    property: "Apartment 501, Green Valley",
    dueAmount: 28000,
    dueDate: "June 20, 2023",
    daysOverdue: 11,
    paymentHistory: [
      {
        id: 1,
        amount: 28000,
        date: "June 1, 2023",
        status: "Paid",
        method: "Cash",
      },
      {
        id: 2,
        amount: 28000,
        date: "May 1, 2023",
        status: "Paid",
        method: "Cash",
      },
      {
        id: 3,
        amount: 28000,
        date: "April 1, 2023",
        status: "Paid",
        method: "Cash",
      },
    ],
  },
];

const Dues = () => {
  const navigation = useNavigation();
  const [tenantDues, setTenantDues] = useState(tenantDuesData);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, overdue, upcoming

  const { profile } = useStateData();

  const { data: tenants = [] } = useTenants().getTenantByLandlordId(
    profile?._id
  );

  const { data: payments } = usePayments().getPayments(profile?._id);

  // Calculate total dues
  const totalDues = payments?.payments?.reduce(
    (sum, tenant) => sum + tenant?.nextDueAmount || 0,
    0
  );

  // Filter tenants based on selected filter
  const filteredTenants = tenantDues.filter((tenant) => {
    if (filterType === "all") return true;
    if (filterType === "overdue") return tenant.daysOverdue > 0;
    if (filterType === "upcoming") return tenant.daysOverdue <= 0;
    return true;
  });
  const { mutate: createNotification } = useNotification().createNotification();

  // Handle sending reminder
  const handleSendReminder = () => {
    if (!selectedTenant) return;

    const payload = {
      senderId: profile?._id,
      recipientId: selectedTenant?._id,
      title: "Payment Reminder",
      message:
        "Dear tenant, your rent is due on " +
        formatDate(selectedTenant?.nextDueDate) +
        " and the amount is " +
        selectedTenant?.nextDueAmount,
      type: "reminder",
    };
    createNotification(payload, {
      onSuccess: (data) => {
        console.log(data);
        Alert.alert("Success", "Notification sent successfully");
      },
      onError: (error) => {
        Alert.alert("Error", error.message);
      },
    });

    // Here you would typically make an API call to send the notification

    setReminderModalVisible(false);
    setSelectedTenant(null);
    setCustomMessage("");
  };

  // Open reminder modal
  const openReminderModal = (tenant, calculateDueAmount) => {
    setSelectedTenant({ ...tenant, nextDueAmount: calculateDueAmount });
    setCustomMessage(
      `Dear ${tenant.name}, this is a reminder that your rent payment of Rs ${
        calculateDueAmount || 0
      } is due on ${formatDate(tenant.nextDueDate)}.`
    );
    setReminderModalVisible(true);
  };

  // Navigate to tenant payment details
  const navigateToPaymentDetails = (tenant) => {
    navigation.navigate("TenantPaymentDetails", { tenant });
  };

  // Render tenant item
  const renderTenantItem = ({ item }) => {
    const isOverdue = item.daysOverdue > 0;
    const calculateDueAmount =
      payments?.payments
        ?.filter((payment) => payment?.tenantId?._id === item?._id)
        .reduce((sum, args) => sum + args?.nextDueAmount, 0) || 0;

    return (
      <StyledTouchableOpacity
        className="bg-white p-4 mb-3 rounded-xl shadow-sm"
        onPress={() => navigateToPaymentDetails(item)}
      >
        <StyledView className="flex-row items-center">
          {/* Tenant Image */}
          {item.image ? (
            <StyledImage
              source={{ uri: item.image }}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <StyledView className="w-14 h-14 rounded-full bg-[#3498db] items-center justify-center">
              <StyledText className="text-white text-xl font-bold">
                {getInitials(item.name)}
              </StyledText>
            </StyledView>
          )}

          {/* Tenant Info */}
          <StyledView className="flex-1 ml-4">
            <StyledText className="text-[#1a2c4e] text-lg font-bold">
              {item.name}
            </StyledText>
            <StyledText className="text-[#8395a7] text-sm">
              {item?.address || "-"}
            </StyledText>
            <StyledView className="flex-row items-center mt-1">
              <StyledText
                className={`font-bold ${
                  isOverdue ? "text-[#e74c3c]" : "text-[#27ae60]"
                }`}
              >
                Rs {calculateDueAmount || 0}
              </StyledText>
              <StyledView className="w-1 h-1 rounded-full bg-[#8395a7] mx-2" />
              <StyledText
                className={`text-sm ${
                  isOverdue ? "text-[#e74c3c]" : "text-[#8395a7]"
                }`}
              >
                {item.dueAmount > 0 && isOverdue
                  ? `${item.daysOverdue} days overdue`
                  : `Due on ${formatDate(item?.nextDueDate) || "-"}`}
              </StyledText>
            </StyledView>
          </StyledView>

          {/* Buzz Button */}
          <StyledTouchableOpacity
            className="bg-[#27ae60] px-4 py-2 rounded-lg"
            onPress={() => openReminderModal(item, calculateDueAmount)}
          >
            <StyledView className="flex-row items-center">
              <Ionicons name="notifications" size={16} color="white" />
              <StyledText className="text-white font-bold ml-1">
                Buzz
              </StyledText>
            </StyledView>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledTouchableOpacity>
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] px-4 py-4">
        <StyledText className="text-white text-2xl font-bold">
          Rent Dues
        </StyledText>
        <StyledView className="flex-row justify-between items-center mt-4">
          <StyledView>
            <StyledText className="text-[#8395a7] text-sm">
              Total Dues
            </StyledText>
            <StyledText className="text-white text-xl font-bold">
              Rs {totalDues?.toLocaleString() || 0}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row">
            <StyledTouchableOpacity
              className={`px-3 py-1 rounded-lg mr-2 ${
                filterType === "all" ? "bg-[#27ae60]" : "bg-[#2c3e50]"
              }`}
              onPress={() => setFilterType("all")}
            >
              <StyledText className="text-white">All</StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className={`px-3 py-1 rounded-lg mr-2 ${
                filterType === "overdue" ? "bg-[#e74c3c]" : "bg-[#2c3e50]"
              }`}
              onPress={() => setFilterType("overdue")}
            >
              <StyledText className="text-white">Overdue</StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className={`px-3 py-1 rounded-lg ${
                filterType === "upcoming" ? "bg-[#3498db]" : "bg-[#2c3e50]"
              }`}
              onPress={() => setFilterType("upcoming")}
            >
              <StyledText className="text-white">Upcoming</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Tenant List */}
      <FlatList
        data={tenants}
        renderItem={renderTenantItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <StyledView className="items-center justify-center py-10">
            <Ionicons name="cash-outline" size={60} color="#e9ecef" />
            <StyledText className="text-[#8395a7] mt-4 text-center">
              No dues found
            </StyledText>
          </StyledView>
        }
      />

      {/* Reminder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reminderModalVisible}
        onRequestClose={() => setReminderModalVisible(false)}
      >
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-xl p-4">
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledText className="text-[#1a2c4e] text-lg font-bold">
                Send Payment Reminder
              </StyledText>
              <TouchableOpacity onPress={() => setReminderModalVisible(false)}>
                <Ionicons name="close" size={24} color="#8395a7" />
              </TouchableOpacity>
            </StyledView>

            {selectedTenant && (
              <StyledView className="mb-4">
                <StyledText className="text-[#8395a7] mb-1">
                  Sending to:
                </StyledText>
                <StyledView className="flex-row items-center">
                  {selectedTenant.image ? (
                    <StyledImage
                      source={{ uri: selectedTenant.image }}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  ) : (
                    <StyledView className="w-8 h-8 rounded-full bg-[#3498db] items-center justify-center mr-2">
                      <StyledText className="text-white font-bold">
                        {selectedTenant.name.charAt(0)}
                      </StyledText>
                    </StyledView>
                  )}
                  <StyledText className="text-[#1a2c4e] font-bold">
                    {selectedTenant.name}
                  </StyledText>
                </StyledView>
              </StyledView>
            )}

            <StyledView className="mb-4">
              <StyledText className="text-[#8395a7] mb-1">Message:</StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 h-32"
                multiline
                textAlignVertical="top"
                value={customMessage}
                onChangeText={setCustomMessage}
              />
            </StyledView>

            <StyledView className="flex-row justify-end">
              <StyledTouchableOpacity
                className="bg-[#e9ecef] px-4 py-2 rounded-lg mr-2"
                onPress={() => setReminderModalVisible(false)}
              >
                <StyledText className="text-[#8395a7] font-bold">
                  Cancel
                </StyledText>
              </StyledTouchableOpacity>

              <StyledTouchableOpacity
                className="bg-[#27ae60] px-4 py-2 rounded-lg"
                onPress={handleSendReminder}
              >
                <StyledText className="text-white font-bold">
                  Send Reminder
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default Dues;
