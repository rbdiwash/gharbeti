import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PaymentsScreen = () => {
  const navigation = useNavigation();

  const payments = [
    {
      id: 1,
      month: "June 2023",
      amount: 25000,
      status: "Pending",
      dueDate: "July 1, 2023",
    },
    {
      id: 2,
      month: "May 2023",
      amount: 25000,
      status: "Paid",
      paidDate: "May 1, 2023",
    },
    {
      id: 3,
      month: "April 2023",
      amount: 25000,
      status: "Paid",
      paidDate: "April 1, 2023",
    },
  ];

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-12 pb-6 px-4">
        <StyledText className="text-white text-xl font-bold mb-4">
          Payments & Dues
        </StyledText>

        {/* Payment Overview Card */}
        <StyledView className="bg-white rounded-xl p-4 shadow-lg">
          <StyledView className="flex-row justify-between items-center mb-4">
            <StyledView>
              <StyledText className="text-[#8395a7] mb-1">
                Current Due
              </StyledText>
              <StyledText className="text-[#1a2c4e] text-2xl font-bold">
                Rs 25,000
              </StyledText>
            </StyledView>
            <StyledTouchableOpacity
              className="bg-secondary px-6 py-3 rounded-xl"
              onPress={() => navigation.navigate("MakePayment")}
            >
              <StyledText className="text-white font-bold">Pay Now</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
          <StyledView className="flex-row justify-between">
            <StyledView>
              <StyledText className="text-[#8395a7] mb-1">Due Date</StyledText>
              <StyledText className="text-[#e74c3c] font-bold">
                July 1, 2023
              </StyledText>
            </StyledView>
            <StyledView>
              <StyledText className="text-[#8395a7] mb-1">Late Fee</StyledText>
              <StyledText className="text-[#1a2c4e] font-bold">
                Rs 1,250
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Payment History */}
      <ScrollView className="flex-1 px-4 pt-6">
        <StyledView className="flex-row justify-between items-center mb-4">
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            Payment History
          </StyledText>
          <StyledTouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate("PaymentHistory")}
          >
            <StyledText className="text-secondary mr-1">View All</StyledText>
            <FontAwesome5 name="chevron-right" size={12} color="#27ae60" />
          </StyledTouchableOpacity>
        </StyledView>

        {payments.map((payment) => (
          <StyledView
            key={payment.id}
            className="bg-white p-4 rounded-xl mb-4 shadow"
          >
            <StyledView className="flex-row justify-between items-start mb-2">
              <StyledView>
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  {payment.month}
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
              <StyledTouchableOpacity
                className="flex-row items-center justify-center mt-2"
                onPress={() => navigation.navigate("PaymentHistory")}
              >
                <FontAwesome5 name="file-invoice" size={16} color="#3498db" />
                <StyledText className="text-[#3498db] ml-2">
                  Download Receipt
                </StyledText>
              </StyledTouchableOpacity>
            )}
          </StyledView>
        ))}
      </ScrollView>
    </StyledView>
  );
};

export default PaymentsScreen;
