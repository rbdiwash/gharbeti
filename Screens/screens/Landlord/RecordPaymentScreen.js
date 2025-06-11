"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useStateData } from "../../../hooks/useStateData";
import { usePayments } from "../../../hooks/usePayments";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);
const StyledScrollView = styled(ScrollView);

const RecordPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tenant } = route.params;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNextDueDatePickerVisible, setNextDueDatePickerVisibility] =
    useState(false);
  console.log("tenant", tenant);
  const [formData, setFormData] = useState({
    amount: tenant?.dueAmount?.toString() || "",
    paymentDate: new Date(),
    paymentMethod: "bankTransfer", // Bank Transfer, Esewa, Cash
    isLatePayment: false,
    lateFee: "0",
    notes: "",
    landlordId: tenant?.landlordId?._id,
    tenantId: tenant?._id,
    nextDueDate: tenant?.rentDueDate,
    nextDueAmount: tenant?.dueAmount,
  });
  const { data: paymentHistory, refetch: refetchPaymentHistory } =
    usePayments().getPaymentById(tenant?._id);
  const { mutate: createPayment } = usePayments().createPayment();
  const paymentMethods = [
    { label: "Bank Transfer", value: "bankTransfer" },
    { label: "Esewa", value: "esewa" },
    { label: "Cash", value: "cash" },
  ];

  // Calculate next due date (30 days from payment date)
  useEffect(() => {
    const calculateNextDueDate = () => {
      const nextDate = new Date(formData.date);
      nextDate.setDate(nextDate.getDate() + 30);
      setFormData((prev) => ({
        ...prev,
        nextDueDate: nextDate,
      }));
    };

    calculateNextDueDate();
  }, [formData.date]);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Handle payment date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
    hideDatePicker();
  };

  // Handle next due date picker
  const showNextDueDatePicker = () => {
    setNextDueDatePickerVisibility(true);
  };

  const hideNextDueDatePicker = () => {
    setNextDueDatePickerVisibility(false);
  };

  const handleConfirmNextDueDate = (date) => {
    setFormData({
      ...formData,
      nextDueDate: date,
    });
    hideNextDueDatePicker();
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (
      !formData.nextDueAmount ||
      Number.parseFloat(formData.nextDueAmount) <= 0
    ) {
      Alert.alert("Error", "Please enter a valid next due amount");
      return;
    }
    if (!formData.nextDueDate) {
      Alert.alert("Error", "Please select a valid next due date");
      return;
    }
    const payload = { ...formData, tenantId: tenant?._id };
    createPayment(payload, {
      onSuccess: () => {
        refetchPaymentHistory();
        Alert.alert("Success", "Payment has been recorded successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      },
      onError: (error) => {
        Alert.alert("Error", error.response.data?.message);
      },
    });
  };

  if (!tenant) {
    return (
      <StyledView className="flex-1 bg-[#f8f9fa] justify-center items-center">
        <Ionicons name="alert-circle-outline" size={60} color="#8395a7" />
        <StyledText className="text-[#1a2c4e] text-lg mt-4">
          Tenant information not found
        </StyledText>
      </StyledView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <StyledView className="flex-1 bg-[#f8f9fa]">
        {/* Header */}
        <StyledView className="bg-[#1a2c4e] pt-4 pb-6 px-4">
          <StyledView className="flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <StyledText className="text-white text-xl font-bold ml-4">
              Record Payment
            </StyledText>
          </StyledView>

          {/* Tenant Info */}
          <StyledView className="flex-row items-center mt-4">
            <StyledText className="text-[#8395a7]">
              Recording payment for:
            </StyledText>
            <StyledText className="text-white font-bold ml-2">
              {tenant.name}
            </StyledText>
          </StyledView>
        </StyledView>

        <StyledScrollView className="flex-1 px-4 pt-6">
          {/* Payment Details */}
          <StyledView className="bg-white p-4 rounded-xl shadow-sm mb-4">
            <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
              Payment Details
            </StyledText>
            <StyledText className="text-[#1a2c4e] text-sm font-bold mb-4">
              Monthly Rent: Rs {tenant?.totalRentPerMonth}
            </StyledText>

            {/* Amount Input */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Amount <StyledText className="text-[#e74c3c]">*</StyledText>
              </StyledText>
              <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg px-3">
                <StyledText className="text-[#1a2c4e] font-bold mr-2">
                  Rs
                </StyledText>
                <StyledTextInput
                  className="flex-1 p-3 text-[#1a2c4e]"
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={formData.amount}
                  onChangeText={(text) => handleInputChange("amount", text)}
                />
              </StyledView>
            </StyledView>

            {/* Date Picker */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Payment Date
              </StyledText>
              <StyledTouchableOpacity
                className="border border-[#e9ecef] rounded-lg p-3 flex-row justify-between items-center"
                onPress={showDatePicker}
              >
                <StyledText className="text-[#1a2c4e]">
                  {formData?.paymentDate?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </StyledText>
                <Ionicons name="calendar" size={20} color="#8395a7" />
              </StyledTouchableOpacity>
            </StyledView>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
              date={formData.paymentDate}
              maximumDate={new Date()}
            />

            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Next Due Amount{" "}
                <StyledText className="text-[#e74c3c]">*</StyledText>
              </StyledText>
              <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg px-3">
                <StyledText className="text-[#1a2c4e] font-bold mr-2">
                  Rs
                </StyledText>
                <StyledTextInput
                  className="flex-1 p-3 text-[#1a2c4e]"
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  value={formData.nextDueAmount}
                  onChangeText={(text) =>
                    handleInputChange("nextDueAmount", text)
                  }
                />
              </StyledView>
            </StyledView>

            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Next Due Date
              </StyledText>
              <StyledTouchableOpacity
                className="border border-[#e9ecef] rounded-lg p-3 flex-row justify-between items-center"
                onPress={showNextDueDatePicker}
              >
                <StyledText className="text-[#1a2c4e]">
                  {formData.nextDueDate?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </StyledText>
                <Ionicons name="calendar" size={20} color="#8395a7" />
              </StyledTouchableOpacity>
            </StyledView>

            <DateTimePickerModal
              isVisible={isNextDueDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmNextDueDate}
              onCancel={hideNextDueDatePicker}
              date={formData.nextDueDate}
              minimumDate={formData.date}
            />

            {/* Payment Method */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Payment Method
              </StyledText>
              <StyledView className="flex-row justify-between">
                {paymentMethods?.map((method) => (
                  <StyledTouchableOpacity
                    key={method?.value}
                    className={`flex-1 p-3 rounded-lg mx-1 items-center justify-center ${
                      formData.paymentMethod === method?.value
                        ? "bg-[#27ae60]"
                        : "bg-[#f0f2f5] border border-[#e9ecef]"
                    }`}
                    onPress={() =>
                      handleInputChange("paymentMethod", method?.value)
                    }
                  >
                    <FontAwesome5
                      name={
                        method?.value === "bankTransfer"
                          ? "university"
                          : method?.value === "esewa"
                          ? "mobile-alt"
                          : "money-bill-wave"
                      }
                      size={16}
                      color={
                        formData.paymentMethod === method?.value
                          ? "white"
                          : "#8395a7"
                      }
                    />
                    <StyledText
                      className={`text-sm mt-1 ${
                        formData.paymentMethod === method?.value
                          ? "text-white"
                          : "text-[#1a2c4e]"
                      }`}
                    >
                      {method?.label}
                    </StyledText>
                  </StyledTouchableOpacity>
                ))}
              </StyledView>
            </StyledView>

            {/* Late Payment Toggle */}
            <StyledView className="flex-row justify-between items-center mb-4">
              <StyledText className="text-[#1a2c4e]">Late Payment</StyledText>
              <Switch
                value={formData.isLatePayment}
                onValueChange={(value) =>
                  handleInputChange("isLatePayment", value)
                }
                trackColor={{ false: "#e9ecef", true: "#e74c3c" }}
                thumbColor={"#ffffff"}
              />
            </StyledView>

            {/* Late Fee Input (conditional) */}
            {formData.isLatePayment && (
              <StyledView className="mb-4">
                <StyledText className="text-[#1a2c4e] mb-2">
                  Late Fee
                </StyledText>
                <StyledView className="flex-row items-center border border-[#e9ecef] rounded-lg px-3">
                  <StyledText className="text-[#1a2c4e] font-bold mr-2">
                    Rs
                  </StyledText>
                  <StyledTextInput
                    className="flex-1 p-3 text-[#1a2c4e]"
                    placeholder="Enter late fee amount"
                    keyboardType="numeric"
                    value={formData.lateFee}
                    onChangeText={(text) => handleInputChange("lateFee", text)}
                  />
                </StyledView>
              </StyledView>
            )}

            {/* Notes Input */}
            <StyledView className="mb-4">
              <StyledText className="text-[#1a2c4e] mb-2">
                Notes (Optional)
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 h-24"
                placeholder="Add any additional notes about this payment"
                multiline
                textAlignVertical="top"
                value={formData.notes}
                onChangeText={(text) => handleInputChange("notes", text)}
              />
            </StyledView>

            {/* Submit Button */}
            <StyledTouchableOpacity
              className="bg-[#27ae60] p-4 rounded-xl mb-8 items-center"
              onPress={handleSubmit}
            >
              <StyledText className="text-white font-bold text-lg">
                Record Payment
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledScrollView>
      </StyledView>
    </KeyboardAvoidingView>
  );
};

export default RecordPaymentScreen;
