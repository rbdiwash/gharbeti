// import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import AddAnnouncementScreen from "../Screens/screens/Tabs/AnnouncementAddScreen";
import AnnouncementList from "../Screens/screens/Tabs/AnnouncementList";
import ChatScreen from "../Screens/screens/Tabs/ChatScreen";
import Dues from "../Screens/screens/Tabs/Dues";
import Home from "../Screens/screens/Tabs/Home";
import LandlordProfile from "../Screens/screens/Tabs/LandlordProfile/Profile";
import MaintenanceStack from "../Screens/screens/Tabs/Maintenance/MaintenanceStack";
import Notifications from "../Screens/screens/Tabs/Notifications";
import Reports from "../Screens/screens/Tabs/Reports";
import Settings from "../Screens/screens/Tabs/Settings";
import AddTenants from "../Screens/screens/Tabs/Tenants/AddTenants";
import TenantDetails from "../Screens/screens/Tabs/Tenants/TenantDetails";
import {
  default as TenantList,
  default as Tenants,
} from "../Screens/screens/Tabs/Tenants/Tenants";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

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
    component: Tenants,
  },
  {
    route: "Report",
    label: "Reports",
    activeIcon: "dashboard",
    component: Reports,
  },

  {
    route: "Notification",
    label: "Notifications",
    activeIcon: "notification",
    component: Notifications,
  },
  {
    route: "Settings",
    label: "More",
    activeIcon: "ellipsis1",
    component: Settings,
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
        1: { scale: 1.2, rotate: "0deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "0deg" },
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
          color={focused ? "#F59A73" : "black"}
        />
      </Animatable.View>
      <Text className={"text-[#F59A73] font-bold"}>{item?.label}</Text>
    </TouchableOpacity>
  );
};

function AnnouncementStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnnouncementList"
        component={AnnouncementList}
        options={{ title: "Announcements" }}
      />
      <Stack.Screen
        name="AddAnnouncement"
        component={AddAnnouncementScreen}
        options={{ title: "Add Announcement" }}
      />
    </Stack.Navigator>
  );
}
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: "absolute",
          margin: 0,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
        },

        tabBarLabelStyle: {
          fontSize: 22,
          fontFamily: "Georgia",
          fontWeight: 300,
        },
        tabBarActiveTintColor: "#F59A73",
        tabBarInactiveTintColor: "#fff",

        tabBarHideOnKeyboard: true,
        animation: "fade",
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            // component={item?.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          >
            {() => (
              <View style={{ flex: 1, paddingBottom: 60 }}>
                <item.component />
              </View>
            )}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
}
const LoggedInLandlordStack = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Announcements"
          component={AnnouncementStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Maintenance Requests"
          component={MaintenanceStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={LandlordProfile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Dues"
          component={Dues}
          options={{
            headerShown: true,
          }}
        />
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
    </SafeAreaView>
  );
};

export default LoggedInLandlordStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
});
