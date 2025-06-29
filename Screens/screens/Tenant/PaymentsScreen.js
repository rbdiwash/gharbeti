import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import { useStateData } from "../../../hooks/useStateData";
import { usePayments } from "../../../hooks/usePayments";
import { formatDate } from "../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PaymentsScreen = () => {
  const navigation = useNavigation();
  const paymentMethods = [
    { label: "Bank Transfer", value: "bankTransfer" },
    { label: "Esewa", value: "esewa" },
    { label: "Cash", value: "cash" },
  ];
  const { profile } = useStateData();
  const { data: paymentHistory, refetch: refetchPaymentHistory } =
    usePayments().getPaymentById(profile?._id);
  // const payments = [
  //   {
  //     id: 1,
  //     month: "June 2023",
  //     amount: 25000,
  //     status: "Pending",
  //     dueDate: "July 1, 2023",
  //   },
  //   {
  //     id: 2,
  //     month: "May 2023",
  //     amount: 25000,
  //     status: "Paid",
  //     paidDate: "May 1, 2023",
  //   },
  //   {
  //     id: 3,
  //     month: "April 2023",
  //     amount: 25000,
  //     status: "Paid",
  //     paidDate: "April 1, 2023",
  //   },
  // ];
  console.log(paymentHistory);
  // console.log(profile);

  return (
    <StyledView className="flex-1 bg-[#f8f9fa]">
      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
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

            <PrimaryButton
              text="Pay Now"
              onPress={() => navigation.navigate("MakePayment")}
            />
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

        {console.log(paymentHistory?.payments)}
        {paymentHistory?.payments?.map((payment) => (
          <StyledView
            key={payment._id}
            className="bg-white p-4 rounded-xl mb-4 shadow"
          >
            <StyledView className="flex-row justify-between items-start mb-2">
              <StyledView>
                <StyledText className="text-[#1a2c4e] text-lg font-bold">
                  {formatDate(payment.nextDueDate)}
                </StyledText>
                <StyledText className="text-[#8395a7]">
                  {payment.status === "Paid"
                    ? `Paid on ${formatDate(payment.paidDate)}`
                    : `Due on ${formatDate(payment.nextDueDate)}`}
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
        {paymentHistory?.payments?.length === 0 && (
          <StyledView className="flex-1 items-center justify-center">
            <StyledText className="text-[#8395a7]">
              No payment history found
            </StyledText>
          </StyledView>
        )}
      </ScrollView>
    </StyledView>
  );
};

export default PaymentsScreen;
