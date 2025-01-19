import { View, Text } from "react-native";
import React from "react";
import TenantList from "./Tenants";
import AddTenants from "./AddTenants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TenantDetails from "./TenantDetails";
import ChatScreen from "../ChatScreen";

const Stack = createNativeStackNavigator();

const TenantStack = () => {
  return (
    <Stack.Navigator initialRouteName="tenants">
      <Stack.Screen
        name="tenants"
        component={TenantList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Tenants"
        component={AddTenants}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="Tenant Details" component={TenantDetails} />
      <Stack.Screen
        name="Edit Tenant"
        component={AddTenants}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default TenantStack;
