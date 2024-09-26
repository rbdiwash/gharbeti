import { View, Text } from "react-native";
import React from "react";
import LoggedInLandlordStack from "../../Stack/LoggedInLandlordStack";
import LoggedInTenantStack from "../../Stack/LoggedInTenantStack";

const CheckLandLordUser = ({ user }) => {
  console.log(user);
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
