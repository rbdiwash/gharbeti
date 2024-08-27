// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import GharbetiProvider from "./context/provider";
import LoginScreen from "./Screens/AuthScreen/LoginScreen";
import SplashScreen from "./Screens/SplashScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./Screens/AuthScreen/SignupScreen";
import GetStarted from "./Screens/AuthScreen/GetStarted";
import ForgotPassword from "./Screens/AuthScreen/ForgotPassword";
import ResetPassword from "./Screens/AuthScreen/ResetPassword";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Screens/screens/Tabs/Home";
import Reports from "./Screens/screens/Tabs/Reports";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabArr = [
  {
    route: "Home",
    label: "Home",
    activeIcon: "home",
    component: Home,
  },
  {
    route: "Tenants",
    label: "Tenants",
    activeIcon: "user",
    component: Home,
  },
  {
    route: "Report",
    label: "Report",
    activeIcon: "dashboard",
    component: Reports,
  },

  {
    route: "Settings",
    label: "Settings",
    activeIcon: "setting",
    component: Reports,
  },
];

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}
    >
      <Animatable.View ref={viewRef} duration={1000}>
        <AntDesign
          name={item?.activeIcon}
          size={24}
          color={item?.accessibilityState?.selected ? "white" : "black"}
        />
      </Animatable.View>
      <Text>{item?.label}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  const auth = true;

  return (
    <GharbetiProvider>
      <NavigationContainer>
        {auth ? (
          <Stack.Navigator>
            <Stack.Screen
              name="splash"
              component={SplashScreen}
              options={{
                title: "Splash Screen",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="getStarted"
              component={GetStarted}
              options={{
                title: "Auth",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{
                title: "Login",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              component={SignupScreen}
              options={{
                title: "Signup",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="forget"
              component={ForgotPassword}
              options={{
                title: "Forgot Password",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="reset"
              component={ResetPassword}
              options={{
                title: "Reset Password",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        ) : (
          <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  height: 60,
                  position: "absolute",
                  margin: 16,
                  borderRadius: 16,
                  justifyContent: "center",
                  alignItems: "center",
                },
              }}
            >
              {TabArr.map((item, index) => {
                return (
                  <Tab.Screen
                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                      tabBarShowLabel: false,
                      tabBarButton: (props) => (
                        <TabButton {...props} item={item} />
                      ),
                    }}
                  />
                );
              })}
            </Tab.Navigator>
          </SafeAreaView>
        )}
      </NavigationContainer>
    </GharbetiProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
});
