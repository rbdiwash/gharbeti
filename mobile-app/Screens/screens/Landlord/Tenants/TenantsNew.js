import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import mock data
import { useAuth } from "../../../../context/AuthContext";
import { useStateData } from "../../../../hooks/useStateData";
import { useTenants } from "../../../../hooks/useTenants";
import { useLeaseAggreements } from "../../../../hooks/useLeaseAggreements";
import { getInitials } from "../../../helper/const";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);

const TenantListScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { state } = useAuth();
  const { profile } = useStateData();
  const landlordId = profile?._id ?? state?.userData?._id;

  const {
    data: tenants = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTenants().getTenantByLandlordId(landlordId);

  const {
    data: leaseAgreement,
    isLoading: isLoadingLease,
    refetch: refetchLease,
  } = useLeaseAggreements().getLeaseAggreements(landlordId);

  const hasLeaseAgreement =
    (Array.isArray(leaseAgreement) && leaseAgreement.length > 0) ||
    (Array.isArray(leaseAgreement?.agreementPoints) &&
      leaseAgreement.agreementPoints.length > 0);

  const filteredTenants = useMemo(() => {
    if (!searchQuery.trim()) return tenants;
    const q = searchQuery.toLowerCase();
    return (tenants || []).filter((t) => {
      const name = (t?.name || "").toLowerCase();
      const email = (t?.email || "").toLowerCase();
      const phone = (t?.phoneNumber || "").toLowerCase();
      const address = (t?.address || "").toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        address.includes(q)
      );
    });
  }, [tenants, searchQuery]);

  const addTenant = () => {
    if (isLoadingLease) return;

    if (!hasLeaseAgreement) {
      Alert.alert(
        "Lease Agreement Required",
        "Please add a lease agreement before inviting a tenant. Tenants must review and accept your house rules during onboarding.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Add Lease Agreement",
            onPress: () => navigation.navigate("LeaseDetails"),
          },
        ],
      );
      return;
    }

    navigation.navigate("Add Tenants");
  };

  // Function to handle refreshing the list
  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    refetchLease();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderLeaseWarning = () => {
    if (isLoadingLease || hasLeaseAgreement) return null;

    return (
      <StyledView className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <StyledView className="flex-row items-start">
          <Ionicons name="warning" size={22} color="#d97706" />
          <StyledView className="flex-1 ml-3">
            <StyledText className="text-amber-900 font-bold text-base mb-1">
              Lease Agreement Required
            </StyledText>
            <StyledText className="text-amber-800 text-sm leading-5">
              Please add a lease agreement before inviting a tenant. Tenants
              must review and accept your house rules during onboarding.
            </StyledText>
            <StyledTouchableOpacity
              className="mt-3 self-start bg-amber-500 px-4 py-2 rounded-lg"
              onPress={() => navigation.navigate("LeaseDetails")}
            >
              <StyledText className="text-white font-semibold text-sm">
                Add Lease Agreement
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    );
  };

  // Render each tenant item
  const renderItem = ({ item }) => (
    <StyledTouchableOpacity
      className="bg-white p-4 mb-3 rounded-xl shadow-sm"
      onPress={() =>
        navigation.navigate("Tenant Details", {
          tenantId: item._id,
          tenantData: item,
        })
      }
      key={item._id}
    >
      <StyledView className="flex-row items-center">
        {/* Tenant Image */}
        {item.imageUrl ? (
          <StyledImage
            source={{ uri: item.imageUrl }}
            className="w-14 h-14 rounded-full"
          />
        ) : (
          <StyledView className="w-14 h-14 rounded-full bg-primary items-center justify-center">
            <StyledText className="text-white text-xl font-bold">
              {getInitials(item?.name)}
            </StyledText>
          </StyledView>
        )}

        {/* Tenant Info */}
        <StyledView className="flex-1 ml-4">
          <StyledText className="text-[#1a2c4e] text-lg font-bold">
            {item.name}
          </StyledText>
          <StyledView className="flex-row items-center">
            <StyledText className="text-[#8395a7] text-sm">
              {item?.noOfRooms ?? 0} {item?.noOfRooms <= 1 ? "Room" : "Rooms"}
            </StyledText>
            {item.dueAmount && (
              <>
                <StyledView className="w-1 h-1 rounded-full bg-[#8395a7] mx-2" />
                <StyledText className="text-[#e74c3c] text-sm font-medium">
                  Due: Rs {item.dueAmount}
                </StyledText>
              </>
            )}
          </StyledView>
          {/* Invitation Status */}
          {!item.inviteAccepted && (
            <StyledView className="flex-row items-center mt-1">
              <StyledView className="bg-yellow-100 px-2 py-1 rounded-full">
                <StyledText className="text-yellow-600 text-xs font-medium">
                  Pending Invitation
                </StyledText>
              </StyledView>
            </StyledView>
          )}
        </StyledView>

        {/* Action Buttons */}
        <StyledView className="flex-row gap-2">
          <StyledTouchableOpacity
            className="p-1 rounded-full"
            onPress={() =>
              navigation.navigate("Chat", {
                tenantId: item._id,
                tenantData: item,
              })
            }
          >
            <Ionicons name="chatbubble-outline" size={22} color="#3498db" />
          </StyledTouchableOpacity>

          {/* <StyledTouchableOpacity
            className="p-1 rounded-full"
            onPress={() => navigation.navigate("Tenant Details")}
          >
            <Ionicons name="eye-outline" size={22} color="#27ae60" />
          </StyledTouchableOpacity> */}

          <StyledTouchableOpacity
            className="p-1 rounded-full"
            onPress={() =>
              navigation.navigate("Edit Tenant", {
                tenantId: item._id,
                tenantData: item,
              })
            }
          >
            <Ionicons name="create-outline" size={22} color="#f1c40f" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );

  // Render empty list component
  const renderEmptyList = () => (
    <StyledView className="flex-1 items-center justify-center py-10">
      <Ionicons name="people" size={60} color="#e9ecef" />
      <StyledText className="text-[#8395a7] mt-4 text-center">
        No tenants found. Add your first tenant!
      </StyledText>
    </StyledView>
  );

  return (
    <StyledSafeAreaView className="flex-1 bg-[#f8f9fa]">
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Header */}
      <StyledView className="bg-[#1a2c4e] pt-4 pb-6 px-4">
        <StyledView className="flex-row justify-between items-center mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Tenants
          </StyledText>
          <StyledView style={{ width: 24 }} />
        </StyledView>

        {/* Search Bar */}
        <StyledView className="flex-row items-center bg-white rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#8395a7" />
          <StyledTextInput
            className="flex-1 ml-2 text-[#1a2c4e]"
            placeholder="Search tenants..."
            placeholderTextColor="#8395a7"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#8395a7" />
            </TouchableOpacity>
          )}
        </StyledView>
      </StyledView>

      {/* Tenant List */}
      <FlatList
        data={filteredTenants}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        ListFooterComponent={renderLeaseWarning}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      {/* Floating Add Button */}
      <StyledTouchableOpacity
        onPress={addTenant}
        className="absolute bottom-6 right-6 bg-[#27ae60] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </StyledTouchableOpacity>
    </StyledSafeAreaView>
  );
};

export default TenantListScreen;
