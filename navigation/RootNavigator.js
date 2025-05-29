"use client";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import LoggedInLandlordStack from "../Stack/LandlordStack";
import LoggedInTenantStack from "../Stack/TenantStack";
import AuthStack from "../Stack/AuthStack";

const RootNavigator = () => {
  const { isLoggedIn, role, isLoading } = useAuth();
  console.log("isLoggedIn", isLoggedIn);

  // Show loading screen while checking authentication state
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a2c4e",
        }}
      >
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  // Determine which stack to render based on authentication state
  if (isLoggedIn) {
    switch (role) {
      case "landlord":
        return <LoggedInLandlordStack />;
      case "tenant":
        return <LoggedInTenantStack />;
      default:
        // Fallback to auth stack if userType is invalid
        return <AuthStack />;
    }
  }

  // Not logged in, show auth stack
  return <AuthStack />;
};

export default RootNavigator;
