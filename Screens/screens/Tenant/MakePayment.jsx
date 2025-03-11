"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styled } from "nativewind";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const MakePayment = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const paymentDetails = {
    rent: 25000,
    maintenance: 2000,
    pending: 0,
    total: 27000,
    dueDate: "July 1, 2023",
  };

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const chunks = [];

    for (let i = 0; i < cleaned.length && i < 16; i += 4) {
      chunks.push(cleaned.substring(i, i + 4));
    }

    return chunks.join(" ");
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (cleaned.length <= 2) {
      return cleaned;
    }

    return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryChange = (text) => {
    setCardExpiry(formatExpiry(text));
  };

  const handlePayment = () => {
    if (paymentMethod === "upi" && !upiId) {
      Alert.alert("Error", "Please enter your UPI ID");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s+/g, "").length < 16) {
        Alert.alert("Error", "Please enter a valid card number");
        return;
      }

      if (!cardExpiry || cardExpiry.length < 5) {
        Alert.alert("Error", "Please enter a valid expiry date");
        return;
      }

      if (!cardCvv || cardCvv.length < 3) {
        Alert.alert("Error", "Please enter a valid CVV");
        return;
      }

      if (!cardName) {
        Alert.alert("Error", "Please enter the name on card");
        return;
      }
    }

    // Here you would typically process the payment through a payment gateway
    Alert.alert(
      "Payment Successful",
      `Your payment of Rs ${paymentDetails.total} has been processed successfully.`,
      [{ text: "OK", onPress: () => navigation.navigate("Payments") }]
    );
  };

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-6 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Make Payment
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Payment Summary */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
            Payment Summary
          </StyledText>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-[#8395a7]">Rent</StyledText>
            <StyledText className="text-[#1a2c4e] font-medium">
              Rs {paymentDetails.rent}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledText className="text-[#8395a7]">Maintenance</StyledText>
            <StyledText className="text-[#1a2c4e] font-medium">
              Rs {paymentDetails.maintenance}
            </StyledText>
          </StyledView>

          {paymentDetails.pending > 0 && (
            <StyledView className="flex-row justify-between mb-2">
              <StyledText className="text-[#8395a7]">Pending Dues</StyledText>
              <StyledText className="text-[#e74c3c] font-medium">
                Rs {paymentDetails.pending}
              </StyledText>
            </StyledView>
          )}

          <StyledView className="border-t border-[#e9ecef] my-2" />

          <StyledView className="flex-row justify-between mb-1">
            <StyledText className="text-[#1a2c4e] font-bold">
              Total Amount
            </StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              Rs {paymentDetails.total}
            </StyledText>
          </StyledView>

          <StyledText className="text-[#e74c3c] text-right">
            Due on {paymentDetails.dueDate}
          </StyledText>
        </StyledView>

        {/* Payment Method */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledText className="text-[#1a2c4e] text-lg font-bold mb-4">
            Payment Method
          </StyledText>

          <StyledView className="flex-row mb-4">
            <StyledTouchableOpacity
              className={`flex-1 p-3 rounded-lg mr-2 flex-row items-center justify-center ${
                paymentMethod === "upi"
                  ? "bg-[#27ae60]"
                  : "bg-[#f8f9fa] border border-[#e9ecef]"
              }`}
              onPress={() => setPaymentMethod("upi")}
            >
              <FontAwesome5
                name="mobile-alt"
                size={16}
                color={paymentMethod === "upi" ? "white" : "#8395a7"}
                style={{ marginRight: 8 }}
              />
              <StyledText
                className={`${
                  paymentMethod === "upi" ? "text-white" : "text-[#1a2c4e]"
                } font-bold`}
              >
                UPI
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className={`flex-1 p-3 rounded-lg ml-2 flex-row items-center justify-center ${
                paymentMethod === "card"
                  ? "bg-[#27ae60]"
                  : "bg-[#f8f9fa] border border-[#e9ecef]"
              }`}
              onPress={() => setPaymentMethod("card")}
            >
              <FontAwesome5
                name="credit-card"
                size={16}
                color={paymentMethod === "card" ? "white" : "#8395a7"}
                style={{ marginRight: 8 }}
              />
              <StyledText
                className={`${
                  paymentMethod === "card" ? "text-white" : "text-[#1a2c4e]"
                } font-bold`}
              >
                Card
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {paymentMethod === "upi" ? (
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium mb-2">
                Enter UPI ID
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 mb-2"
                placeholder="yourname@upi"
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
              />
              <StyledText className="text-[#8395a7] text-sm">
                Example: yourname@okhdfcbank, yourname@ybl
              </StyledText>
            </StyledView>
          ) : (
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium mb-2">
                Card Number
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3 mb-3"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChangeText={handleCardNumberChange}
                keyboardType="numeric"
                maxLength={19}
              />

              <StyledView className="flex-row mb-3">
                <StyledView className="flex-1 mr-2">
                  <StyledText className="text-[#1a2c4e] font-medium mb-2">
                    Expiry Date
                  </StyledText>
                  <StyledTextInput
                    className="border border-[#e9ecef] rounded-lg p-3"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChangeText={handleExpiryChange}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </StyledView>

                <StyledView className="flex-1 ml-2">
                  <StyledText className="text-[#1a2c4e] font-medium mb-2">
                    CVV
                  </StyledText>
                  <StyledTextInput
                    className="border border-[#e9ecef] rounded-lg p-3"
                    placeholder="123"
                    value={cardCvv}
                    onChangeText={setCardCvv}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </StyledView>
              </StyledView>

              <StyledText className="text-[#1a2c4e] font-medium mb-2">
                Name on Card
              </StyledText>
              <StyledTextInput
                className="border border-[#e9ecef] rounded-lg p-3"
                placeholder="John Doe"
                value={cardName}
                onChangeText={setCardName}
              />
            </StyledView>
          )}
        </StyledView>

        {/* Pay Button */}
        <StyledTouchableOpacity
          className="bg-[#27ae60] p-4 rounded-xl mb-8 items-center"
          onPress={handlePayment}
        >
          <StyledText className="text-white font-bold text-lg">
            Pay Rs {paymentDetails.total}
          </StyledText>
        </StyledTouchableOpacity>
      </ScrollView>
    </StyledView>
  );
};

export default MakePayment;
