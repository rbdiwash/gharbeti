// import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import Container from "./Container";
import Home from "./Screens/screens/Tabs/Home";
import Reports from "./Screens/screens/Tabs/Reports";
import GharbetiProvider from "./context/provider";

export default function App() {
  return (
    <GharbetiProvider>
      <NavigationContainer>
        <Container />
      </NavigationContainer>
    </GharbetiProvider>
  );
}
