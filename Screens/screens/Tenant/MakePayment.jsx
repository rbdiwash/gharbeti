"use client";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { styled } from "nativewind";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const MakePayment = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("digitalWallet");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [formData, setFormData] = useState({
    images: [],
  });

  const paymentDetails = {
    rent: 25000,
    maintenance: 2000,
    pending: 0,
    total: 27000,
    dueDate: "July 1, 2023",
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        images: [...formData.images, result.assets[0].uri],
      });
    }
  };
  const handlePayment = () => {
    if (paymentMethod === "digitalWallet" && !upiId) {
      Alert.alert("Error", "Please enter your UPI ID");
      return;
    }

    if (paymentMethod === "receipt") {
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

  const handleSubmit = () => {
    Alert.alert("Submit");
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
                paymentMethod === "digitalWallet"
                  ? "bg-[#27ae60]"
                  : "bg-[#f8f9fa] border border-[#e9ecef]"
              }`}
              onPress={() => setPaymentMethod("digitalWallet")}
            >
              <FontAwesome5
                name="mobile-alt"
                size={16}
                color={paymentMethod === "digitalWallet" ? "white" : "#8395a7"}
                style={{ marginRight: 8 }}
              />
              <StyledText
                className={`${
                  paymentMethod === "digitalWallet"
                    ? "text-white"
                    : "text-[#1a2c4e]"
                } font-bold`}
              >
                Digital Wallet
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className={`flex-1 p-3 rounded-lg ml-2 flex-row items-center justify-center ${
                paymentMethod === "receipt"
                  ? "bg-[#27ae60]"
                  : "bg-[#f8f9fa] border border-[#e9ecef]"
              }`}
              onPress={() => setPaymentMethod("receipt")}
            >
              <FontAwesome5
                name="credit-card"
                size={16}
                color={paymentMethod === "receipt" ? "white" : "#8395a7"}
                style={{ marginRight: 8 }}
              />
              <StyledText
                className={`${
                  paymentMethod === "receipt" ? "text-white" : "text-[#1a2c4e]"
                } font-bold`}
              >
                Upload Receipt
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {paymentMethod === "digitalWallet" ? (
            <>
              <StyledView>
                <StyledText className="text-[#1a2c4e] font-medium mb-2">
                  Enter Amount
                </StyledText>
                <StyledTextInput
                  className="border border-[#e9ecef] rounded-lg p-3 mb-2"
                  placeholder="Amount in Rs if you want to pay partially..."
                  onChangeText={(text) =>
                    handleInputChange("partialAmount", text)
                  }
                  autoCapitalize="none"
                  keyboardType="numeric"
                  value={formData?.partialAmount}
                />
              </StyledView>
              <StyledView>
                <StyledText className="text-[#1a2c4e] font-medium mb-2">
                  Enter ID
                </StyledText>
                <StyledTextInput
                  className="border border-[#e9ecef] rounded-lg p-3 mb-2"
                  placeholder="yourname@email.com"
                  value={upiId}
                  onChangeText={setUpiId}
                  autoCapitalize="none"
                />
              </StyledView>
            </>
          ) : (
            <StyledView>
              <StyledText className="text-[#1a2c4e] font-medium mb-2">
                Upload Receipt Image of Payment
              </StyledText>
              <StyledView className="flex-row flex-wrap">
                {formData.images.map((image, index) => (
                  <StyledView key={index} className="w-24 h-24 m-1 relative">
                    <Image
                      source={{ uri: image }}
                      className="w-full h-full rounded-lg"
                    />
                    <TouchableOpacity
                      className="absolute top-1 right-1 bg-[#e74c3c] rounded-full p-1"
                      onPress={() => removeImage(index)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </StyledView>
                ))}
                <StyledTouchableOpacity
                  className="w-24 h-24 border-2 border-dashed border-[#e9ecef] rounded-lg m-1 justify-center items-center"
                  onPress={pickImage}
                >
                  <Ionicons name="add" size={32} color="#8395a7" />
                </StyledTouchableOpacity>
              </StyledView>
            </StyledView>
          )}
        </StyledView>

        {/* Pay Button */}
        {paymentMethod === "digitalWallet" ? (
          <StyledTouchableOpacity
            className="bg-[#27ae60] p-4 rounded-xl mb-8 items-center"
            onPress={handlePayment}
          >
            <StyledText className="text-white font-bold text-lg">
              Pay Rs {paymentDetails.total}
            </StyledText>
          </StyledTouchableOpacity>
        ) : (
          <StyledTouchableOpacity
            className="bg-[#27ae60] p-4 rounded-xl mb-8 items-center"
            onPress={handleSubmit}
          >
            <StyledText className="text-white font-bold text-lg">
              Submit
            </StyledText>
          </StyledTouchableOpacity>
        )}
      </ScrollView>
    </StyledView>
  );
};

export default MakePayment;
