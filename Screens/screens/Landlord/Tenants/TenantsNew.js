import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { styled } from "nativewind";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import mock data
import { tenantsList } from "../../../helper/data";
import { useTenants } from "../../../../hooks/useTenants";
import { useAuth } from "../../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledSafeAreaView = styled(SafeAreaView);

const TenantListScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { userData } = useAuth();

  const {
    data: tenants = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useTenants().getTenantByLandlordId(userData?._id);

  // Function to handle adding a new tenant
  const addTenant = () => {
    navigation.navigate("Add Tenants");
  };

  // Function to handle refreshing the list
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate data fetching
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
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
              {item?.name?.charAt(0)}
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
          {!item.isAccepted && (
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
            onPress={() => navigation.navigate("Chat")}
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

      <StyledView className="bg-[#1a2c4e] pt-4 pb-4 px-4">
        <StyledView className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <StyledText className="text-white text-xl font-bold">
            Tenants
          </StyledText>
          <StyledTouchableOpacity
            className="bg-white w-8 h-8 rounded-full items-center justify-center shadow-sm"
            onPress={addTenant}
          >
            <Ionicons name="add" size={24} color="#1a2c4e" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
      {/* Header */}

      {/* Tenant List */}
      <FlatList
        data={tenants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </StyledSafeAreaView>
  );
};

export default TenantListScreen;
