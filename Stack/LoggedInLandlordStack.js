// import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import AddAnnouncementScreen from "../Screens/screens/Landlord/AnnouncementAddScreen";
import AnnouncementList from "../Screens/screens/Landlord/AnnouncementList";
import ChatScreen from "../Screens/screens/Landlord/ChatScreen";
import Dues from "../Screens/screens/Landlord/Dues";
import Home from "../Screens/screens/Landlord/Home";
import LandlordProfile from "../Screens/screens/Landlord/LandlordProfile/Profile";
import MaintenanceStack from "../Screens/screens/Landlord/Maintenance/MaintenanceStack";
import Notifications from "../Screens/screens/Landlord/Notifications";
import Reports from "../Screens/screens/Landlord/Reports";
import Settings from "../Screens/screens/Landlord/Settings";
import AddTenants from "../Screens/screens/Landlord/Tenants/AddTenants";
import TenantDetails from "../Screens/screens/Landlord/Tenants/TenantDetails";
import {
  default as TenantList,
  default as Tenants,
} from "../Screens/screens/Landlord/Tenants/Tenants";
import LandlordCodeScreen from "../Screens/screens/Landlord/TenantScreens/MainScreen";
import HomeScreen from "../Screens/screens/Landlord/OldHome";
import TenantListScreen from "../Screens/screens/Landlord/Tenants/TenantsNew";
import AnnouncementDetails from "../Screens/screens/Landlord/AnnouncementDetails";

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
    label: "Notification",
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
        options={{ title: "Announcements", headerShown: false }}
      />
      <Stack.Screen
        name="AddAnnouncement"
        component={AddAnnouncementScreen}
        options={{ title: "Add Announcement", headerShown: false }}
      />
      <Stack.Screen
        name="AnnouncementDetails"
        component={AnnouncementDetails}
        options={{ title: "Add Announcement", headerShown: false }}
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
          name="OldHome"
          component={HomeScreen}
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dues"
          component={Dues}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="tenants"
          component={TenantListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Add Tenants"
          component={AddTenants}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tenant Details"
          component={TenantDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit Tenant"
          component={AddTenants}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tenant Invite"
          component={LandlordCodeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />
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
