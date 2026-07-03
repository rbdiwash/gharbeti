import { View, Text } from "react-native";
import React from "react";
import LoggedInLandlordStack from "../../Stack/LandlordStack";
import LoggedInTenantStack from "../../Stack/TenantStack";

const CheckLandLordUser = ({ user }) => {
  return (
    <>
      {user === "landlord" ? (
        <LoggedInLandlordStack />
      ) : (
        <LoggedInTenantStack />
      )}
    </>
  );
};

export default CheckLandLordUser;
