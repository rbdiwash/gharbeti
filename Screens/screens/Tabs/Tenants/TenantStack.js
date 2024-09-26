import { View, Text } from "react-native";
import React from "react";
import TenantList from "./Tenants";
import AddTenants from "./AddTenants";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const TenantStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="tenants"
      screenOptions={{ cardStyle: { backgroundColor: "red" } }}
    >
      <Stack.Screen
        name="tenants"
        component={TenantList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="addTenants"
        component={AddTenants}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="editTenants"
        component={AddTenants}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TenantStack;
