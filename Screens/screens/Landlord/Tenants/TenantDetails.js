"use client";

import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTenants } from "../../../../hooks/useTenants";
import { formatDate } from "../../../helper/const";
import { useMaintenance } from "../../../../hooks/useMaintenance";
import { usePayments } from "../../../../hooks/usePayments";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);
const StyledSafeAreaView = styled(SafeAreaView);

const TenantDetailsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("overview");
  const route = useRoute();
  const { tenantId, tenantData } = route.params;
  const { deleteTenant } = useTenants();
  const { mutate: deleteMutate } = deleteTenant();
  const { refetch } = useTenants().getTenantByLandlordId(tenantData?._id);
  // Function to handle phone call
  const handleCall = () => {
    Linking.openURL(`tel:${tenantData.phoneNumber}`);
  };
  const paymentMethods = [
    { label: "Bank Transfer", value: "bankTransfer" },
    { label: "Esewa", value: "esewa" },
    { label: "Cash", value: "cash" },
  ];

  const { data: activeMaintenanceRequests } =
    useMaintenance().getMaintenanceRequests({
      landlordId: tenantData?.landlord?._id,
      tenantId: tenantData?._id,
      status: "Pending",
    });

  const { data: paymentHistory } = usePayments().getPaymentById(tenantId);

  // Function to handle email
  const handleEmail = () => {
    Linking.openURL(`mailto:${tenantData.email}`);
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-[#f1c40f]";
      case "In Progress":
        return "bg-[#3498db]";
      case "Completed":
        return "bg-[#27ae60]";
      default:
        return "bg-[#8395a7]";
    }
  };

  // Function to get priority color
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

  const handleDelete = () => {
    Alert.alert(
      "Delete Tenant",
      "Are you sure you want to delete this tenant? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteMutate(tenantId, {
              onSuccess: () => {
                alert("Tenant deleted successfully");
                navigation.goBack();
                refetch();
              },
              onError: (error) => {
                console.error("Error deleting tenant:", error);
                alert(
                  error?.response?.data?.error || "Failed to delete tenant"
                );
              },
            });
          },
        },
      ]
    );
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-[#f8f9fa]">
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />

      {/* Header */}
      <StyledView className="px-4 py-4 flex-row justify-between items-center">
        <StyledTouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1a2c4e" />
        </StyledTouchableOpacity>
        <StyledText className="text-[#1a2c4e] text-xl font-bold">
          Tenant Details
        </StyledText>
        <StyledTouchableOpacity
          onPress={() => navigation.navigate("Edit Tenant", { tenantData })}
        >
          <Ionicons name="create-outline" size={24} color="#1a2c4e" />
        </StyledTouchableOpacity>
      </StyledView>

      <StyledScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <StyledView className="px-4 pb-6 items-center">
          {tenantData?.imageUrl ? (
            <StyledImage
              source={{ uri: tenantData.imageUrl }}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
          ) : (
            <StyledView className="w-24 h-24 rounded-full bg-[#27ae60] items-center justify-center border-4 border-white shadow-md">
              <StyledText className="text-white text-2xl font-bold">
                {tenantData?.name?.charAt(0)}
              </StyledText>
            </StyledView>
          )}

          <StyledText className="mt-3 text-[#1a2c4e] text-xl font-bold">
            {tenantData?.name}
          </StyledText>
          <StyledText className="text-[#8395a7]">
            {tenantData?.address}
          </StyledText>

          <StyledView className="flex-row mt-4">
            <StyledView
              className={`px-3 py-1 rounded-full ${
                tenantData?.isActive ? "bg-[#e8f5e9]" : "bg-[#ffebee]"
              }`}
            >
              <StyledText
                className={
                  tenantData?.isActive
                    ? "text-[#27ae60] font-medium"
                    : "text-[#e74c3c] font-medium"
                }
              >
                {tenantData?.isActive ? "Active" : "Inactive"}
              </StyledText>
            </StyledView>
            {!tenantData?.isAccepted && (
              <StyledView className="flex-row items-center mt-1">
                <StyledView className="bg-yellow-100 px-2 py-1 rounded-full">
                  <StyledText className="text-yellow-600 text-xs font-medium">
                    Pending Invitation
                  </StyledText>
                </StyledView>
              </StyledView>
            )}
          </StyledView>

          {/* Quick Actions */}
          <StyledView className="flex-row mt-4 w-full justify-center">
            <StyledTouchableOpacity
              className="bg-[#e8f5e9] p-3 rounded-full mr-4"
              onPress={handleCall}
            >
              <Ionicons name="call" size={22} color="#27ae60" />
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="bg-[#e3f2fd] p-3 rounded-full mr-4"
              onPress={handleEmail}
            >
              <Ionicons name="mail" size={22} color="#3498db" />
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="bg-[#e8f5e9] p-3 rounded-full"
              onPress={() => navigation.navigate("Chat")}
            >
              <Ionicons name="chatbubble" size={22} color="#27ae60" />
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row px-4 border-b border-[#e9ecef]"
        >
          <StyledTouchableOpacity
            className={`py-3 px-3 ${
              activeTab === "overview" ? "border-b-2 border-[#27ae60]" : ""
            }`}
            onPress={() => setActiveTab("overview")}
          >
            <StyledText
              className={
                activeTab === "overview"
                  ? "text-[#27ae60] font-bold"
                  : "text-[#8395a7]"
              }
            >
              Overview
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className={`py-3 px-4 ${
              activeTab === "maintenance" ? "border-b-2 border-[#27ae60]" : ""
            }`}
            onPress={() => setActiveTab("maintenance")}
          >
            <StyledText
              className={
                activeTab === "maintenance"
                  ? "text-[#27ae60] font-bold"
                  : "text-[#8395a7]"
              }
            >
              Maintenance
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className={`py-3 px-4 ${
              activeTab === "payments" ? "border-b-2 border-[#27ae60]" : ""
            }`}
            onPress={() => setActiveTab("payments")}
          >
            <StyledText
              className={
                activeTab === "payments"
                  ? "text-[#27ae60] font-bold"
                  : "text-[#8395a7]"
              }
            >
              Payments
            </StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className={`py-3 px-4 ${
              activeTab === "documents" ? "border-b-2 border-[#27ae60]" : ""
            }`}
            onPress={() => setActiveTab("documents")}
          >
            <StyledText
              className={
                activeTab === "documents"
                  ? "text-[#27ae60] font-bold"
                  : "text-[#8395a7]"
              }
            >
              Documents
            </StyledText>
          </StyledTouchableOpacity>
        </ScrollView>

        {/* Tab Content */}
        <StyledView className="p-4">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Contact Information */}
              <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                  Contact Information
                </StyledText>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledView className="flex-row items-center">
                    <Ionicons name="call-outline" size={18} color="#8395a7" />
                    <StyledText className="text-[#8395a7] ml-2">
                      Phone
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.phoneNumber}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledView className="flex-row items-center">
                    <Ionicons name="mail-outline" size={18} color="#8395a7" />
                    <StyledText className="text-[#8395a7] ml-2">
                      Email
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.email}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledView className="flex-row items-center">
                    <Ionicons name="home-outline" size={18} color="#8395a7" />
                    <StyledText className="text-[#8395a7] ml-2">
                      Address
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-[#1a2c4e] font-medium text-right flex-1 ml-4">
                    {tenantData?.address}
                  </StyledText>
                </StyledView>
                <StyledView className="flex-row justify-between">
                  <StyledView className="flex-row items-center">
                    <Ionicons name="key-outline" size={18} color="#8395a7" />
                    <StyledText className="text-[#8395a7] ml-2">
                      Invitation Code
                    </StyledText>
                  </StyledView>
                  <StyledText className="text-[#1a2c4e] font-medium text-right flex-1 ml-4">
                    {tenantData?.invitationCode}
                  </StyledText>
                </StyledView>
              </StyledView>

              {/* Rental Information */}
              <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                  Rental Information
                </StyledText>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Monthly Rent
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-bold">
                    Rs {tenantData?.totalRentPerMonth ?? 0}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Rooms Rented
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.noOfRooms ?? 0}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Security Deposit
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    Rs {tenantData?.securityDeposit ?? 0}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Lease Start Date
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.startingDate
                      ? formatDate(tenantData.startingDate)
                      : "N/A"}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between">
                  <StyledText className="text-[#8395a7]">
                    Lease End Date
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.leaseEndDate ?? "N/A"}
                  </StyledText>
                </StyledView>
              </StyledView>

              {/* Financial Summary */}
              <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                  Financial Summary
                </StyledText>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Current Due
                  </StyledText>
                  <StyledText className="text-[#e74c3c] font-bold">
                    Rs {tenantData?.dueAmount ?? 0}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">
                    Next Due Date
                  </StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.rentDueDate ?? 0}
                  </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-between">
                  <StyledText className="text-[#8395a7]">
                    Total Paid (Till Date)
                  </StyledText>
                  <StyledText className="text-[#27ae60] font-bold">
                    Rs {tenantData?.totalPaid ?? 0}
                  </StyledText>
                </StyledView>
              </StyledView>

              {/* Emergency Contact */}
              <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
                  Emergency Contact
                </StyledText>

                <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">Name</StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.emergencyContactName}
                  </StyledText>
                </StyledView>

                {/* <StyledView className="flex-row justify-between mb-3">
                  <StyledText className="text-[#8395a7]">Relation</StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.emergencyContact?.relation}
                  </StyledText>
                </StyledView> */}

                <StyledView className="flex-row justify-between">
                  <StyledText className="text-[#8395a7]">Phone</StyledText>
                  <StyledText className="text-[#1a2c4e] font-medium">
                    {tenantData?.emergencyContactNumber}
                  </StyledText>
                </StyledView>
              </StyledView>
            </>
          )}

          {/* Maintenance Tab */}
          {activeTab === "maintenance" && (
            <>
              <StyledView className="flex-row justify-between items-center mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  Maintenance Requests
                </StyledText>
              </StyledView>

              {activeMaintenanceRequests?.map((request) => (
                <StyledTouchableOpacity
                  key={request._id}
                  className="bg-white p-4 rounded-xl shadow-sm mb-4"
                  onPress={() => {
                    navigation.navigate("Maintenance Request Details", {
                      requestId: request._id,
                    });
                  }}
                >
                  <StyledView className="flex-row justify-between items-start mb-2">
                    <StyledView className="flex-1">
                      <StyledText className="text-[#1a2c4e] text-lg font-bold">
                        {request.title}
                      </StyledText>
                      <StyledText className="text-[#8395a7]">
                        {request.description.slice(0, 50)}...
                      </StyledText>
                    </StyledView>
                    <StyledView
                      className={`${getStatusColor(
                        request.status
                      )} px-3 py-1 rounded-full ml-2`}
                    >
                      <StyledText className="text-white text-xs font-medium">
                        {request.status}
                      </StyledText>
                    </StyledView>
                  </StyledView>

                  <StyledView className="flex-row justify-between items-center mt-2">
                    <StyledText className="text-[#8395a7] text-sm">
                      Reported: {new Date(request.createdAt).toLocaleString()}
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
              ))}

              {tenantData?.maintenanceRequests?.length === 0 && (
                <StyledView className="bg-white p-6 rounded-xl shadow-sm items-center justify-center">
                  <Ionicons
                    name="construct-outline"
                    size={50}
                    color="#e9ecef"
                  />
                  <StyledText className="text-[#8395a7] mt-2">
                    No maintenance requests found
                  </StyledText>
                </StyledView>
              )}
            </>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <>
              <StyledView className="flex-row justify-between items-center mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  Payment History
                </StyledText>
                <StyledTouchableOpacity
                  className="bg-[#27ae60] px-3 py-1 rounded-lg flex-row items-center"
                  onPress={() =>
                    navigation.navigate("RecordPayment", { tenant: tenantData })
                  }
                >
                  <FontAwesome5
                    name="money-bill-wave"
                    size={14}
                    color="white"
                  />
                  <StyledText className="text-white ml-1">Collect</StyledText>
                </StyledTouchableOpacity>
              </StyledView>

              {paymentHistory?.payments?.map((payment) => (
                <StyledView
                  key={payment._id}
                  className="bg-white p-4 rounded-xl shadow-sm mb-4"
                >
                  <StyledView className="flex-row justify-between items-start mb-2">
                    <StyledView>
                      <StyledText className="text-[#1a2c4e] text-lg font-bold">
                        Rs {payment.amount}
                      </StyledText>
                      <StyledText className="text-[#8395a7]">
                        {new Date(payment?.paymentDate).toLocaleString()}
                      </StyledText>
                    </StyledView>
                    <StyledView
                      className={`px-3 py-1 rounded-full ${
                        payment.status === "completed"
                          ? "bg-[#e8f5e9]"
                          : payment.status === "Late"
                          ? "bg-[#fff8e1]"
                          : "bg-[#ffebee]"
                      }`}
                    >
                      <StyledText
                        // className="text-[#27ae60] text-xs font-medium"
                        className={
                          payment.status === "completed"
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

                  <StyledView className="flex-row justify-between items-center mt-2">
                    <StyledText className="text-[#8395a7]">
                      Payment Method
                    </StyledText>
                    <StyledText className="text-[#1a2c4e] font-medium">
                      {
                        paymentMethods.find(
                          (method) => method.value === payment?.paymentMethod
                        )?.label
                      }
                    </StyledText>
                  </StyledView>
                </StyledView>
              ))}

              {paymentHistory?.payments?.length === 0 && (
                <StyledView className="bg-white p-6 rounded-xl shadow-sm items-center justify-center">
                  <FontAwesome5
                    name="money-bill-wave"
                    size={40}
                    color="#e9ecef"
                  />
                  <StyledText className="text-[#8395a7] mt-2">
                    No payment history found
                  </StyledText>
                </StyledView>
              )}
            </>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <>
              <StyledView className="flex-row justify-between items-center mb-4">
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  Documents
                </StyledText>
                <StyledTouchableOpacity
                  className="bg-[#27ae60] px-3 py-1 rounded-lg flex-row items-center"
                  onPress={() => alert("Upload document")}
                >
                  <Ionicons
                    name="cloud-upload-outline"
                    size={18}
                    color="white"
                  />
                  <StyledText className="text-white ml-1">Upload</StyledText>
                </StyledTouchableOpacity>
              </StyledView>

              {tenantData?.documents?.map((document, index) => (
                <StyledTouchableOpacity
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm mb-4 flex-row items-center"
                  onPress={() => alert("View document")}
                >
                  <StyledView className="bg-[#e3f2fd] p-3 rounded-lg mr-3">
                    <Ionicons
                      name="document-text-outline"
                      size={24}
                      color="#3498db"
                    />
                  </StyledView>

                  <StyledView className="flex-1">
                    <StyledText className="text-[#1a2c4e] font-bold">
                      {document.type}
                    </StyledText>
                    <StyledText className="text-[#8395a7] text-sm">
                      Tap to view document
                    </StyledText>
                  </StyledView>

                  {document.verified && (
                    <StyledView className="bg-[#e8f5e9] px-2 py-1 rounded-full flex-row items-center">
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#27ae60"
                      />
                      <StyledText className="text-[#27ae60] text-xs ml-1">
                        Verified
                      </StyledText>
                    </StyledView>
                  )}
                </StyledTouchableOpacity>
              ))}

              {tenantData?.documents?.length === 0 && (
                <StyledView className="bg-white p-6 rounded-xl shadow-sm items-center justify-center">
                  <Ionicons
                    name="document-text-outline"
                    size={50}
                    color="#e9ecef"
                  />
                  <StyledText className="text-[#8395a7] mt-2">
                    No documents found
                  </StyledText>
                </StyledView>
              )}
            </>
          )}
        </StyledView>
      </StyledScrollView>

      {/* Action Buttons */}
      <StyledView className="p-4 border-t border-[#e9ecef] bg-white">
        <StyledView className="flex-row">
          <StyledTouchableOpacity
            className="flex-1 bg-[#e74c3c] py-3 rounded-lg mr-2 items-center justify-center"
            onPress={() => handleDelete()}
          >
            <StyledText className="text-white font-bold">Delete</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity
            className="flex-1 bg-[#e74c3c] py-3 rounded-lg mr-2 items-center justify-center"
            onPress={() =>
              alert("Are you sure you want to deactivate this tenant?")
            }
          >
            <StyledText className="text-white font-bold">Deactivate</StyledText>
          </StyledTouchableOpacity>

          <StyledTouchableOpacity
            className="flex-1 bg-[#27ae60] py-3 rounded-lg ml-2 items-center justify-center"
            onPress={() => navigation.navigate("Edit Tenant", { tenantData })}
          >
            <StyledText className="text-white font-bold">
              Edit Details
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default TenantDetailsScreen;
