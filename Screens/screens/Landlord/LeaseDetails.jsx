import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Share,
} from "react-native";
import { styled } from "nativewind";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../../../components/Buttons";
import Toast from "react-native-toast-message";
import { useLeaseAggreements } from "../../../hooks/useLeaseAggreements";
import { useAuth } from "../../../context/AuthContext";
import { formatDate } from "../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const LeaseDetails = () => {
  const navigation = useNavigation();
  const { state } = useAuth();
  const landlordId = state?.userData?._id || {};
  const { getLeaseAggreements } = useLeaseAggreements();
  const { data: leaseAgreements } = getLeaseAggreements(landlordId);
  const { mutate: createLeaseAgreement, isLoading: isCreating } =
    useLeaseAggreements().createLeaseAgreement();
  const [newTerm, setNewTerm] = useState("");
  const [leaseTerms, setLeaseTerms] = useState([
    "Rent must be paid on or before the 1st of each month.",
    "Late payment will incur a penalty of 5% of the monthly rent.",
    "Tenant is responsible for all utility bills including electricity, water, and internet.",
    "No structural modifications are allowed without written permission from the landlord.",
    "Pets are not allowed on the premises.",
  ]);

  console.log(leaseAgreements);

  useEffect(() => {
    if (leaseAgreements) {
      setLeaseTerms(leaseAgreements?.agreementPoints || []);
    }
  }, [leaseAgreements]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editTerm, setEditTerm] = useState("");

  const handleAddTerm = () => {
    if (newTerm.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a lease term",
        position: "bottom",
      });
      return;
    }

    setLeaseTerms([...leaseTerms, newTerm.trim()]);

    setNewTerm("");
    const payload = {
      agreementPoints: [...leaseTerms, newTerm.trim()],
      landlordId: landlordId,
    };
    createLeaseAgreement(payload, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Lease term added successfully",
          position: "bottom",
        });
      },
      onError: (error) => {
        console.log("error", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to add lease term",
          position: "bottom",
        });
      },
    });
  };

  const handleDeleteTerm = (index) => {
    const updatedTerms = leaseTerms.filter((_, i) => i !== index);
    setLeaseTerms(updatedTerms);
    const payload = {
      agreementPoints: updatedTerms,
      landlordId: landlordId,
    };
    createLeaseAgreement(payload, {
      onSuccess: (res) => {
        console.log("res", res?.data);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Lease term deleted successfully",
          position: "bottom",
        });
      },
      onError: (error) => {
        console.log("error", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to delete lease term",
          position: "bottom",
        });
      },
    });
  };

  const handleEditTerm = (index) => {
    setEditingIndex(index);
    setEditTerm(leaseTerms[index]);
  };

  const handleSaveEdit = (index) => {
    if (editTerm.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Lease term cannot be empty",
        position: "bottom",
      });
      return;
    }

    const updatedTerms = [...leaseTerms];
    updatedTerms[index] = editTerm.trim();
    setLeaseTerms(updatedTerms);

    const payload = {
      agreementPoints: updatedTerms,
      landlordId: landlordId,
    };
    createLeaseAgreement(payload, {
      onSuccess: (res) => {
        setEditingIndex(null);
        setEditTerm("");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Lease term updated successfully",
          position: "bottom",
        });
      },
      onError: (error) => {
        console.log("error", error);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to update lease term",
          position: "bottom",
        });
      },
    });
  };

  const handleShareTerms = async () => {
    try {
      const leaseTermsText = leaseTerms
        .map((term, index) => `${index + 1}. ${term}`)
        .join("\n\n");

      const shareMessage = `Lease Agreement Terms\n\n${leaseTermsText}\n\nCreated: ${formatDate(
        leaseAgreements?.createdAt
      )}\nLast Updated: ${formatDate(leaseAgreements?.updatedAt)}`;

      const result = await Share.share({
        message: shareMessage,
        title: "Lease Agreement Terms",
      });
    } catch (error) {
      console.log("error", error);
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
            Manage Lease Terms
          </StyledText>
          <TouchableOpacity onPress={handleShareTerms}>
            <Ionicons name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
        </StyledView>
      </StyledView>

      <ScrollView className="flex-1 px-4 pt-6">
        {/* Add New Term */}
        <StyledView className="bg-white p-4 rounded-xl mb-4 shadow-md">
          <StyledView className="flex-row items-center mb-4">
            <Ionicons name="add-circle" size={24} color="#27ae60" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Add New Term
            </StyledText>
          </StyledView>

          <StyledView className="flex-row items-center">
            <StyledTextInput
              className="flex-1 bg-[#f8f9fa] p-3 rounded-lg mr-2"
              placeholder="Enter new lease term"
              value={newTerm}
              onChangeText={setNewTerm}
              multiline
            />
            <PrimaryButton text="Add" onPress={handleAddTerm} size="small" />
          </StyledView>
        </StyledView>

        {/* Lease Terms List */}
        <StyledView className="bg-white p-4 rounded-xl mb-8 shadow-md">
          <StyledView className="flex-row items-center mb-2">
            <Entypo name="text-document" size={24} color="#f1c40f" />
            <StyledText className="text-[#1a2c4e] text-lg font-bold ml-2">
              Lease Terms
            </StyledText>
          </StyledView>
          <StyledView className="flex-col justify-between mb-4">
            <StyledText className="text-[#8395a7] text-xs">
              Created: {formatDate(leaseAgreements?.createdAt)}
            </StyledText>
            <StyledText className="text-[#8395a7] text-xs">
              Updated: {formatDate(leaseAgreements?.updatedAt)}
            </StyledText>
          </StyledView>

          {leaseTerms?.map((term, index) => (
            <StyledView
              key={index}
              className="mb-4 p-3 bg-[#f8f9fa] rounded-lg"
            >
              {editingIndex === index ? (
                <StyledView>
                  <StyledTextInput
                    className="bg-white p-2 rounded-lg mb-2"
                    value={editTerm}
                    onChangeText={setEditTerm}
                    multiline
                  />
                  <StyledView className="flex-row gap justify-end">
                    <PrimaryButton
                      text="Save"
                      onPress={() => handleSaveEdit(index)}
                      size="small"
                      parentClass="mr-2"
                    />
                    <PrimaryButton
                      text="Cancel"
                      onPress={() => setEditingIndex(null)}
                      size="small"
                      bgColor="#e74c3c"
                    />
                  </StyledView>
                </StyledView>
              ) : (
                <StyledView className="flex-row justify-between items-center">
                  <StyledView className="flex-1">
                    <StyledText className="text-[#1a2c4e]">{term}</StyledText>
                  </StyledView>
                  <StyledView className="flex-row">
                    <TouchableOpacity
                      onPress={() => handleEditTerm(index)}
                      className="mr-2"
                    >
                      <Ionicons name="create" size={20} color="#3498db" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteTerm(index)}>
                      <Ionicons name="trash" size={20} color="#e74c3c" />
                    </TouchableOpacity>
                  </StyledView>
                </StyledView>
              )}
            </StyledView>
          ))}
        </StyledView>
      </ScrollView>
    </StyledView>
  );
};

export default LeaseDetails;
