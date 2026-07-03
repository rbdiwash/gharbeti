import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import { useAuth } from "../../../context/AuthContext";
import { getLeaseAggreements } from "../../../api/lease-aggrements";
import { useLeaseAggreements } from "../../../hooks/useLeaseAggreements";
import { formatDate, formatDateTime } from "../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LeaseDetails = () => {
  const navigation = useNavigation();
  const { state } = useAuth();
  const landlordData = state?.userData?.landlord || {};
  const tenantData = state?.userData || {};
  const { data: leaseAgreements } = useLeaseAggreements().getLeaseAggreements(
    landlordData?._id
  );
  const leaseDetails = {
    propertyName: landlordData?.name,
    unitNumber: "Apartment 303",
    address: landlordData?.address,
    startDate: formatDate(tenantData?.tenantDetails?.startingDate) || "-",
    endDate: formatDate(tenantData?.tenantDetails?.leaseEndDate) || "-",
    monthlyRent: tenantData?.tenantDetails?.totalRentPerMonth || "-",
    securityDeposit: tenantData?.tenantDetails?.securityDeposit || "-",
    maintenanceFee: tenantData?.tenantDetails?.maintenanceFee || "-",
    noticePeriod: tenantData?.tenantDetails?.noticePeriod || "10 days",
    landlordName: landlordData?.name,
    landlordContact: landlordData?.phoneNumber,
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
            Lease Details
          </StyledText>
          <TouchableOpacity>
            <Ionicons name="download-outline" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Property Details */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <Ionicons name="home" size={24} color="#27ae60" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Property Details
            </StyledText>
          </StyledView>

          <StyledView className="mb-2">
            <StyledText className="text-[#8395a7]">Property Name</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.propertyName}
            </StyledText>
          </StyledView>

          {/* <StyledView className="mb-2">
            <StyledText className="text-[#8395a7]">Unit Number</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.unitNumber}
            </StyledText>
          </StyledView> */}

          <StyledView>
            <StyledText className="text-[#8395a7]">Address</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.address}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Lease Period */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <Ionicons name="calendar" size={24} color="#3498db" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Lease Period
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between mb-2">
            <StyledView className="flex-1">
              <StyledText className="text-[#8395a7]">Start Date</StyledText>
              <StyledText className="text-[#1a2c4e] font-bold">
                {leaseDetails.startDate}
              </StyledText>
            </StyledView>

            <StyledView className="flex-1">
              <StyledText className="text-[#8395a7]">End Date</StyledText>
              <StyledText className="text-[#1a2c4e] font-bold">
                {leaseDetails.endDate}
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView>
            <StyledText className="text-[#8395a7]">Notice Period</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.noticePeriod}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Financial Details */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <FontAwesome5 name="money-bill-wave" size={20} color="#e74c3c" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Financial Details
            </StyledText>
          </StyledView>

          <StyledView className="mb-2">
            <StyledText className="text-[#8395a7]">Monthly Rent</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.monthlyRent}
            </StyledText>
          </StyledView>

          <StyledView className="mb-2">
            <StyledText className="text-[#8395a7]">Security Deposit</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.securityDeposit}
            </StyledText>
          </StyledView>

          <StyledView>
            <StyledText className="text-[#8395a7]">Maintenance Fee</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.maintenanceFee}
            </StyledText>
          </StyledView>
        </StyledView>

        {/* Landlord Details */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <FontAwesome5 name="user" size={20} color="#9b59b6" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Landlord Details
            </StyledText>
          </StyledView>

          <StyledView className="mb-2">
            <StyledText className="text-[#8395a7]">Name</StyledText>
            <StyledText className="text-[#1a2c4e] font-bold">
              {leaseDetails.landlordName}
            </StyledText>
          </StyledView>

          <StyledView className="flex-row justify-between items-center">
            <StyledView>
              <StyledText className="text-[#8395a7]">Contact</StyledText>
              <StyledText className="text-[#1a2c4e] font-bold">
                {leaseDetails.landlordContact}
              </StyledText>
            </StyledView>

            <PrimaryButton
              text="Chat"
              onPress={() => {
                navigation.navigate("Chat");
              }}
              size="small"
            />
          </StyledView>
        </StyledView>

        {/* Lease Terms */}
        <StyledView className="bg-white p-4 rounded-xl mb-8 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <Entypo name="text-document" size={24} color="#f1c40f" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Lease Terms
            </StyledText>
          </StyledView>

          {leaseAgreements?.agreementPoints?.map((term, index) => (
            <StyledView key={index} className="flex-row mb-3">
              <StyledText className="text-[#27ae60] mr-2">•</StyledText>
              <StyledText className="text-[#1a2c4e] flex-1">{term}</StyledText>
            </StyledView>
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default LeaseDetails;
