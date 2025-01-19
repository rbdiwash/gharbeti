import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MaintenanceScreen from "./MaintenanceScreen";
import ViewMaaintenance from "./ViewMaintenance";

const Stack = createNativeStackNavigator();

const MaintenanceStack = () => {
  return (
    <Stack.Navigator initialRouteName="Maintenance Requests">
      <Stack.Screen name="Maintenance Requests" component={MaintenanceScreen} />
      <Stack.Screen
        name="Maintenance Request Details"
        component={ViewMaaintenance}
      />
    </Stack.Navigator>
  );
};

export default MaintenanceStack;
