"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

const TenantPaymentDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tenant } = route.params || {};

  const [receiptModalVisible, setReceiptModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [activeTab, setActiveTab] = useState("history"); // history, stats

  // Calculate payment statistics
  const totalPaid = tenant?.paymentHistory.reduce((sum, payment) => {
    return payment.status === "Paid" || payment.status === "Late"
      ? sum + payment.amount
      : sum;
  }, 0);

  const onTimePayments = tenant?.paymentHistory.filter(
    (payment) => payment.status === "Paid"
  ).length;
  const latePayments = tenant?.paymentHistory.filter(
    (payment) => payment.status === "Late"
  ).length;
  const paymentRate =
    tenant?.paymentHistory.length > 0
      ? ((onTimePayments / tenant.paymentHistory.length) * 100).toFixed(0)
      : 0;

  // Handle viewing receipt
  const viewReceipt = (payment) => {
    setSelectedPayment(payment);
    setReceiptModalVisible(true);
  };

  // Handle downloading receipt
  const downloadReceipt = () => {
    // Here you would typically generate and download a PDF receipt
    Alert.alert("Success", "Receipt downloaded successfully");
    setReceiptModalVisible(false);
  };

  // Handle recording a payment
  const recordPayment = () => {
    navigation.navigate("RecordPayment", { tenant });
  };

  // Handle opening reminder modal
  const openReminderModal = (tenant) => {
    Alert.alert(
      "Send Reminder",
      `Send a reminder to ${tenant.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Send",
          onPress: () =>
            Alert.alert("Reminder Sent", `Reminder sent to ${tenant.name}.`),
        },
      ],
      { cancelable: false }
    );
  };

  if (!tenant) {
    return (
      <StyledSafeAreaView className="flex-1 bg-[#f8f9fa] justify-center items-center">
        <Ionicons name="alert-circle-outline" size={60} color="#8395a7" />
        <StyledText className="text-[#1a2c4e] text-lg mt-4">
          Tenant information not found
        </StyledText>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] px-4 py-4">
        <StyledView className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold ml-4">
            Payment Details
          </StyledText>
        </StyledView>

        {/* Tenant Info */}
        <StyledView className="flex-row items-center mt-4">
          {tenant.image ? (
            <StyledImage
              source={{ uri: tenant.image }}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <StyledView className="w-16 h-16 rounded-full bg-[#3498db] items-center justify-center">
              <StyledText className="text-white text-2xl font-bold">
                {tenant.name.charAt(0)}
              </StyledText>
            </StyledView>
          )}

          <StyledView className="ml-4">
            <StyledText className="text-white text-lg font-bold">
              {tenant.name}
            </StyledText>
            <StyledText className="text-[#8395a7]">
              {tenant.property}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Current Due Card */}
      <StyledView className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
        <StyledView className="flex-row justify-between items-center mb-2">
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            Current Due
          </StyledText>
          <StyledView
            className={`px-3 py-1 rounded-full ${
              tenant.daysOverdue > 0 ? "bg-[#ffebee]" : "bg-[#e8f5e9]"
            }`}
          >
            <StyledText
              className={
                tenant.daysOverdue > 0 ? "text-[#e74c3c]" : "text-[#27ae60]"
              }
            >
              {tenant.daysOverdue > 0
                ? `${tenant.daysOverdue} days overdue`
                : "On time"}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex-row justify-between items-center">
          <StyledView>
            <StyledText className="text-[#1a2c4e] text-2xl font-bold">
              Rs {tenant.dueAmount}
            </StyledText>
            <StyledText className="text-[#8395a7]">
              Due on {tenant.dueDate}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row">
            <StyledTouchableOpacity
              className="bg-[#3498db] px-4 py-2 rounded-lg mr-2"
              onPress={recordPayment}
            >
              <StyledText className="text-white font-bold">Record</StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="bg-[#27ae60] px-4 py-2 rounded-lg"
              onPress={() => openReminderModal(tenant)}
            >
              <StyledText className="text-white font-bold">Buzz</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Tabs */}
      <StyledView className="flex-row px-4 mt-4">
        <StyledTouchableOpacity
          className={`flex-1 py-2 ${
            activeTab === "history" ? "border-b-2 border-[#27ae60]" : ""
          }`}
          onPress={() => setActiveTab("history")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "history" ? "text-[#27ae60]" : "text-[#8395a7]"
            }`}
          >
            Payment History
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className={`flex-1 py-2 ${
            activeTab === "stats" ? "border-b-2 border-[#27ae60]" : ""
          }`}
          onPress={() => setActiveTab("stats")}
        >
          <StyledText
            className={`text-center font-bold ${
              activeTab === "stats" ? "text-[#27ae60]" : "text-[#8395a7]"
            }`}
          >
            Statistics
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView className="flex-1 px-4 pt-4">
        {/* Payment History Tab */}
        {activeTab === "history" && (
          <>
            {tenant.paymentHistory.map((payment, index) => (
              <StyledView
                key={index}
                className="bg-white p-4 rounded-xl mb-4 shadow-sm"
              >
                <StyledView className="flex-row justify-between items-start mb-2">
                  <StyledView>
                    <StyledText className="text-[#1a2c4e] text-lg font-bold">
                      Rs {payment.amount}
                    </StyledText>
                    <StyledText className="text-[#8395a7]">
                      {payment.date}
                    </StyledText>
                  </StyledView>

                  <StyledView
                    className={`px-3 py-1 rounded-full ${
                      payment.status === "Paid"
                        ? "bg-[#e8f5e9]"
                        : payment.status === "Late"
                        ? "bg-[#fff8e1]"
                        : "bg-[#ffebee]"
                    }`}
                  >
                    <StyledText
                      className={
                        payment.status === "Paid"
                          ? "text-[#27ae60]"
                          : payment.status === "Late"
                          ? "text-[#f39c12]"
                          : "text-[#e74c3c]"
                      }
                    >
                      {payment.status}
                    </StyledText>
                  </StyledView>
                </StyledView>

                <StyledView className="flex-row justify-between items-center">
                  <StyledView className="flex-row items-center">
                    <FontAwesome5
                      name={
                        payment.method === "Bank Transfer"
                          ? "university"
                          : payment.method === "UPI"
                          ? "mobile-alt"
                          : "money-bill-wave"
                      }
                      size={14}
                      color="#8395a7"
                    />
                    <StyledText className="text-[#8395a7] ml-2">
                      {payment.method}
                    </StyledText>
                  </StyledView>

                  {(payment.status === "Paid" || payment.status === "Late") && (
                    <StyledTouchableOpacity
                      className="flex-row items-center"
                      onPress={() => viewReceipt(payment)}
                    >
                      <FontAwesome5
                        name="file-invoice"
                        size={14}
                        color="#3498db"
                      />
                      <StyledText className="text-[#3498db] ml-2">
                        View Receipt
                      </StyledText>
                    </StyledTouchableOpacity>
                  )}
                </StyledView>

                {payment.lateFee && (
                  <StyledView className="mt-2 p-2 bg-[#fff8e1] rounded-lg">
                    <StyledText className="text-[#f39c12]">
                      Late fee: Rs {payment.lateFee}
                    </StyledText>
                  </StyledView>
                )}
              </StyledView>
            ))}

            {tenant.paymentHistory.length === 0 && (
              <StyledView className="items-center justify-center py-10">
                <Ionicons
                  name="document-text-outline"
                  size={60}
                  color="#e9ecef"
                />
                <StyledText className="text-[#8395a7] mt-4 text-center">
                  No payment history found
                </StyledText>
              </StyledView>
            )}
          </>
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <>
            <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-sm">
              <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                Payment Overview
              </StyledText>

              <StyledView className="flex-row justify-between mb-4">
                <StyledView className="items-center flex-1">
                  <StyledText className="text-[#8395a7] mb-1">
                    Total Paid
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] text-xl font-bold">
                    Rs {totalPaid}
                  </StyledText>
                </StyledView>

                <StyledView className="items-center flex-1">
                  <StyledText className="text-[#8395a7] mb-1">
                    On-time Rate
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] text-xl font-bold">
                    {paymentRate}%
                  </StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="flex-row justify-between">
                <StyledView className="items-center flex-1">
                  <StyledText className="text-[#8395a7] mb-1">
                    On-time
                  </StyledText>
                  <StyledText className="text-[#27ae60] text-xl font-bold">
                    {onTimePayments}
                  </StyledText>
                </StyledView>

                <StyledView className="items-center flex-1">
                  <StyledText className="text-[#8395a7] mb-1">Late</StyledText>
                  <StyledText className="text-[#f39c12] text-xl font-bold">
                    {latePayments}
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>

            <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-sm">
              <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                Payment Methods
              </StyledText>

              {/* Payment methods chart would go here - simplified for this example */}
              <StyledView className="mb-4">
                <StyledView className="flex-row justify-between items-center mb-2">
                  <StyledText className="text-[#1a2c4e]">
                    Bank Transfer
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-bold">
                    40%
                  </StyledText>
                </StyledView>
                <StyledView className="bg-[#e9ecef] h-2 rounded-full overflow-hidden">
                  <StyledView
                    className="bg-[#3498db] h-full rounded-full"
                    style={{ width: "40%" }}
                  />
                </StyledView>
              </StyledView>

              <StyledView className="mb-4">
                <StyledView className="flex-row justify-between items-center mb-2">
                  <StyledText className="text-[#1a2c4e]">UPI</StyledText>
                  <StyledText className="text-[#1a2c4e] font-bold">
                    35%
                  </StyledText>
                </StyledView>
                <StyledView className="bg-[#e9ecef] h-2 rounded-full overflow-hidden">
                  <StyledView
                    className="bg-[#9b59b6] h-full rounded-full"
                    style={{ width: "35%" }}
                  />
                </StyledView>
              </StyledView>

              <StyledView>
                <StyledView className="flex-row justify-between items-center mb-2">
                  <StyledText className="text-[#1a2c4e]">Cash</StyledText>
                  <StyledText className="text-[#1a2c4e] font-bold">
                    25%
                  </StyledText>
                </StyledView>
                <StyledView className="bg-[#e9ecef] h-2 rounded-full overflow-hidden">
                  <StyledView
                    className="bg-[#27ae60] h-full rounded-full"
                    style={{ width: "25%" }}
                  />
                </StyledView>
              </StyledView>
            </StyledView>

            <StyledView className="bg-white p-4 rounded-xl mb-8 shadow-sm">
              <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                Payment Trends
              </StyledText>

              {/* Payment trends chart would go here - simplified for this example */}
              <StyledView className="h-40 flex-row items-end justify-between">
                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#27ae60] w-8 rounded-t-lg"
                    style={{ height: "80%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    Jan
                  </StyledText>
                </StyledView>

                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#27ae60] w-8 rounded-t-lg"
                    style={{ height: "100%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    Feb
                  </StyledText>
                </StyledView>

                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#27ae60] w-8 rounded-t-lg"
                    style={{ height: "90%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    Mar
                  </StyledText>
                </StyledView>

                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#27ae60] w-8 rounded-t-lg"
                    style={{ height: "100%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    Apr
                  </StyledText>
                </StyledView>

                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#f39c12] w-8 rounded-t-lg"
                    style={{ height: "70%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    May
                  </StyledText>
                </StyledView>

                <StyledView className="items-center">
                  <StyledView
                    className="bg-[#27ae60] w-8 rounded-t-lg"
                    style={{ height: "100%" }}
                  />
                  <StyledText className="text-[#8395a7] text-xs mt-1">
                    Jun
                  </StyledText>
                </StyledView>
              </StyledView>

              <StyledView className="flex-row justify-between mt-4">
                <StyledView className="flex-row items-center">
                  <StyledView className="w-3 h-3 rounded-full bg-[#27ae60] mr-1" />
                  <StyledText className="text-[#8395a7] text-xs">
                    On Time
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row items-center">
                  <StyledView className="w-3 h-3 rounded-full bg-[#f39c12] mr-1" />
                  <StyledText className="text-[#8395a7] text-xs">
                    Late
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row items-center">
                  <StyledView className="w-3 h-3 rounded-full bg-[#e74c3c] mr-1" />
                  <StyledText className="text-[#8395a7] text-xs">
                    Missed
                  </StyledText>
                </StyledView>
              </StyledView>
            </StyledView>
          </>
        )}
      </StyledScrollView>

      {/* Receipt Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={receiptModalVisible}
        onRequestClose={() => setReceiptModalVisible(false)}
      >
        <StyledView className="flex-1 justify-end bg-black/50">
          <StyledView className="bg-white rounded-t-xl p-4">
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledText className="text-[#1a2c4e] text-lg font-bold">
                Payment Receipt
              </StyledText>
              <TouchableOpacity onPress={() => setReceiptModalVisible(false)}>
                <Ionicons name="close" size={24} color="#8395a7" />
              </TouchableOpacity>
            </StyledView>

            {selectedPayment && (
              <>
                <StyledView className="bg-[#f8f9fa] p-4 rounded-lg mb-4">
                  <StyledView className="flex-row justify-between mb-2">
                    <StyledText className="text-[#8395a7]">Amount</StyledText>
                    <StyledText className="text-[#1a2c4e] font-bold">
                      Rs {selectedPayment.amount}
                    </StyledText>
                  </StyledView>

                  <StyledView className="flex-row justify-between mb-2">
                    <StyledText className="text-[#8395a7]">Date</StyledText>
                    <StyledText className="text-[#1a2c4e]">
                      {selectedPayment.date}
                    </StyledText>
                  </StyledView>

                  <StyledView className="flex-row justify-between mb-2">
                    <StyledText className="text-[#8395a7]">
                      Payment Method
                    </StyledText>
                    <StyledText className="text-[#1a2c4e]">
                      {selectedPayment.method}
                    </StyledText>
                  </StyledView>

                  <StyledView className="flex-row justify-between mb-2">
                    <StyledText className="text-[#8395a7]">Status</StyledText>
                    <StyledText
                      className={
                        selectedPayment.status === "Paid"
                          ? "text-[#27ae60]"
                          : selectedPayment.status === "Late"
                          ? "text-[#f39c12]"
                          : "text-[#e74c3c]"
                      }
                    >
                      {selectedPayment.status}
                    </StyledText>
                  </StyledView>

                  {selectedPayment.lateFee && (
                    <StyledView className="flex-row justify-between">
                      <StyledText className="text-[#8395a7]">
                        Late Fee
                      </StyledText>
                      <StyledText className="text-[#f39c12]">
                        Rs {selectedPayment.lateFee}
                      </StyledText>
                    </StyledView>
                  )}
                </StyledView>

                <StyledView className="items-center mb-4">
                  <FontAwesome5 name="check-circle" size={60} color="#27ae60" />
                  <StyledText className="text-[#27ae60] text-lg font-bold mt-2">
                    Payment Confirmed
                  </StyledText>
                </StyledView>
              </>
            )}

            <StyledTouchableOpacity
              className="bg-[#3498db] p-3 rounded-lg items-center"
              onPress={downloadReceipt}
            >
              <StyledText className="text-white font-bold">
                Download Receipt
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default TenantPaymentDetailsScreen;
