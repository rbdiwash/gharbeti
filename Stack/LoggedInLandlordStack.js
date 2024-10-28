// import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Home from "../Screens/screens/Tabs/Home";
import Reports from "../Screens/screens/Tabs/Reports";
import Settings from "../Screens/screens/Tabs/Settings";
import Tenants from "../Screens/screens/Tabs/Tenants/Tenants";
import TenantStack from "../Screens/screens/Tabs/Tenants/TenantStack";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifications from "../Screens/screens/Tabs/Notifications";
import AddAnnouncementScreen from "../Screens/screens/Tabs/AnnouncementAddScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnnouncementList from "../Screens/screens/Tabs/AnnouncementList";

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
    component: TenantStack,
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
      <Text className={"text-#F59A73 font-bold"}>{item?.label}</Text>
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
        tabBarHideOnKeyboard: true,
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
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
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
          name="Announcements"
          component={AnnouncementStack}
          options={{ headerShown: false }}
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
