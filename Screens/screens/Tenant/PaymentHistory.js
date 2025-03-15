"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Share,
  Alert,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PaymentHistory = () => {
  const navigation = useNavigation();
  const [year, setYear] = useState("2023");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  const payments = {
    2023: [
      {
        id: 1,
        month: "June",
        amount: 25000,
        status: "Pending",
        dueDate: "July 1, 2023",
      },
      {
        id: 2,
        month: "May",
        amount: 25000,
        status: "Paid",
        paidDate: "May 1, 2023",
        transactionId: "TXN123456789",
        paymentMethod: "UPI",
      },
      {
        id: 3,
        month: "April",
        amount: 25000,
        status: "Paid",
        paidDate: "April 1, 2023",
        transactionId: "TXN123456788",
        paymentMethod: "Bank Transfer",
      },
      {
        id: 4,
        month: "March",
        amount: 25000,
        status: "Paid",
        paidDate: "March 1, 2023",
        transactionId: "TXN123456787",
        paymentMethod: "UPI",
      },
      {
        id: 5,
        month: "February",
        amount: 25000,
        status: "Paid",
        paidDate: "February 1, 2023",
        transactionId: "TXN123456786",
        paymentMethod: "Bank Transfer",
      },
      {
        id: 6,
        month: "January",
        amount: 25000,
        status: "Paid",
        paidDate: "January 1, 2023",
        transactionId: "TXN123456785",
        paymentMethod: "UPI",
      },
    ],
    2022: [
      {
        id: 7,
        month: "December",
        amount: 23000,
        status: "Paid",
        paidDate: "December 1, 2022",
        transactionId: "TXN123456784",
        paymentMethod: "UPI",
      },
      {
        id: 8,
        month: "November",
        amount: 23000,
        status: "Paid",
        paidDate: "November 1, 2022",
        transactionId: "TXN123456783",
        paymentMethod: "Bank Transfer",
      },
    ],
  };

  const getFilteredPayments = () => {
    let filtered = [...payments[year]];

    if (dateFilter === "last3") {
      filtered = filtered.slice(0, 3);
    } else if (dateFilter === "last6") {
      filtered = filtered.slice(0, 6);
    } else if (dateFilter === "custom") {
      // In a real app, you would implement date range filtering here
      // This is a simplified example
      filtered = filtered.filter((_, index) => index % 2 === 0);
    }

    return filtered;
  };

  const downloadReceipt = async (payment) => {
    try {
      if (!FileSystem || !Sharing) {
        Alert.alert(
          "Feature Not Available",
          "Receipt download is not available in this environment."
        );
        return;
      }
      // In a real app, you would generate a PDF receipt here
      // For this example, we'll simulate downloading by creating a text file

      const receiptContent = `
        PAYMENT RECEIPT
        ------------------------------
        Transaction ID: ${payment.transactionId}
        Date: ${payment.paidDate}
        Amount: Rs ${payment.amount}
        Payment Method: ${payment.paymentMethod}
        Month: ${payment.month} ${year}
        ------------------------------
        Thank you for your payment!
      `;

      const fileUri =
        FileSystem.documentDirectory + `receipt_${payment.transactionId}.txt`;

      await FileSystem.writeAsStringAsync(fileUri, receiptContent);

      if (Platform.OS === "android") {
        const UTI = "public.text";
        const shareResult = await Sharing.shareAsync(fileUri, {
          mimeType: "text/plain",
          dialogTitle: "Download Receipt",
          UTI: UTI,
        });

        if (shareResult.action === Sharing.SharedAction.SHARED) {
          Alert.alert("Success", "Receipt downloaded successfully");
        }
      } else {
        // For iOS, we can use Share API
        await Share.share({
          title: "Payment Receipt",
          message: receiptContent,
        });
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to download receipt. Please try again later."
      );
      console.error("Error downloading receipt:", error);
    }
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
            Payment History
          </StyledText>
          <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      {/* Year Selector */}
      <StyledView className="flex-row px-4 pt-4">
        {Object.keys(payments).map((yearOption) => (
          <StyledTouchableOpacity
            key={yearOption}
            className={`mr-4 pb-2 ${
              year === yearOption ? "border-b-2 border-[#27ae60]" : ""
            }`}
            onPress={() => setYear(yearOption)}
          >
            <StyledText
              className={`text-lg ${
                year === yearOption
                  ? "text-[#27ae60] font-bold"
                  : "text-[#8395a7]"
              }`}
            >
              {yearOption}
            </StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledView>

      {/* Filter Indicator */}
      {dateFilter !== "all" && (
        <StyledView className="flex-row items-center px-4 pt-2">
          <StyledText className="text-[#8395a7] mr-2">Filtered by:</StyledText>
          <StyledView className="bg-[#e9ecef] px-2 py-1 rounded-full flex-row items-center">
            <StyledText className="text-[#1a2c4e] text-sm">
              {dateFilter === "last3"
                ? "Last 3 months"
                : dateFilter === "last6"
                ? "Last 6 months"
                : "Custom range"}
            </StyledText>
            <TouchableOpacity
              className="ml-1"
              onPress={() => setDateFilter("all")}
            >
              <Ionicons name="close-circle" size={16} color="#8395a7" />
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      )}

      {/* Payment List */}
      <ScrollView className="flex-1 px-4 pt-4">
        {getFilteredPayments().map((payment) => (
          <StyledTouchableOpacity
            key={payment.id}
            className="bg-white p-4 rounded-xl mb-4 shadow-md"
          >
            <StyledView className="flex-row justify-between items-start mb-3">
              <StyledView>
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  {payment.month} {year}
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  {payment.status === "Paid"
                    ? `Paid on ${payment.paidDate}`
                    : `Due on ${payment.dueDate}`}
                </StyledText>
              </StyledView>
              <StyledView>
                <StyledText className="text-[#1a2c4e] text-lg font-bold text-right">
                  Rs {payment.amount}
                </StyledText>
                <StyledText
                  className={`text-right ${
                    payment.status === "Paid"
                      ? "text-[#27ae60]"
                      : "text-[#e74c3c]"
                  }`}
                >
                  {payment.status}
                </StyledText>
              </StyledView>
            </StyledView>

            {payment.status === "Paid" && (
              <StyledView className="border-t border-[#e9ecef] pt-3">
                <StyledView className="flex-row justify-between mb-1">
                  <StyledText className="text-[#8395a7]">
                    Transaction ID
                  </StyledText>
                  <StyledText className="text-[#1a2c4e]">
                    {payment.transactionId}
                  </StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between mb-2">
                  <StyledText className="text-[#8395a7]">
                    Payment Method
                  </StyledText>
                  <StyledText className="text-[#1a2c4e]">
                    {payment.paymentMethod}
                  </StyledText>
                </StyledView>
                <StyledTouchableOpacity
                  className="flex-row items-center justify-center mt-1"
                  onPress={() => downloadReceipt(payment)}
                >
                  <FontAwesome5 name="file-invoice" size={16} color="#3498db" />
                  <StyledText className="text-[#3498db] ml-2">
                    Download Receipt
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            )}
          </StyledTouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-3xl p-6">
            <StyledView className="flex-row justify-between items-center mb-6">
              <StyledText className="text-[#1a2c4e] text-xl font-bold">
                Filter Payments
              </StyledText>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color="#8395a7" />
              </TouchableOpacity>
            </StyledView>

            <StyledText className="text-[#1a2c4e] font-bold mb-3">
              Date Range
            </StyledText>

            {[
              { id: "all", label: "All Payments" },
              { id: "last3", label: "Last 3 Months" },
              { id: "last6", label: "Last 6 Months" },
              { id: "custom", label: "Custom Range" },
            ].map((option) => (
              <StyledTouchableOpacity
                key={option.id}
                className={`flex-row items-center p-3 mb-2 rounded-lg ${
                  dateFilter === option.id ? "bg-[#e9ecef]" : ""
                }`}
                onPress={() => setDateFilter(option.id)}
              >
                <StyledView
                  className={`w-6 h-6 rounded-full border-2 mr-3 items-center justify-center ${
                    dateFilter === option.id
                      ? "border-[#27ae60] bg-[#27ae60]"
                      : "border-[#8395a7]"
                  }`}
                >
                  {dateFilter === option.id && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </StyledView>
                <StyledText className="text-[#1a2c4e]">
                  {option.label}
                </StyledText>
              </StyledTouchableOpacity>
            ))}

            {/* Custom date range fields would go here */}

            <StyledTouchableOpacity
              className="bg-[#27ae60] p-4 rounded-xl mt-4"
              onPress={() => setFilterModalVisible(false)}
            >
              <StyledText className="text-white font-bold text-center">
                Apply Filter
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default PaymentHistory;
