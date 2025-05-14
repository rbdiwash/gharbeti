// import "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddAnnouncementScreen from "../Screens/screens/Landlord/AnnouncementAddScreen";
import AnnouncementDetails from "../Screens/screens/Landlord/AnnouncementDetails";
import AnnouncementList from "../Screens/screens/Landlord/AnnouncementList";
import ChatScreen from "../Screens/screens/Landlord/ChatScreen";
import Dues from "../Screens/screens/Landlord/Dues";
import Home from "../Screens/screens/Landlord/Home";
import LandlordProfile from "../Screens/screens/Landlord/LandlordProfile/Profile";
import MaintenanceStack from "../Screens/screens/Landlord/Maintenance/MaintenanceStack";
import Notifications from "../Screens/screens/Landlord/Notifications";
import HomeScreen from "../Screens/screens/Landlord/OldHome";
import RecordPaymentScreen from "../Screens/screens/Landlord/RecordPaymentScreen";
import Reports from "../Screens/screens/Landlord/Reports";
import Settings from "../Screens/screens/Landlord/Settings";
import TenantPaymentDetailsScreen from "../Screens/screens/Landlord/TenantPaymentDetailsScreen";
import AddTenants from "../Screens/screens/Landlord/Tenants/AddTenants";
import TenantDetails from "../Screens/screens/Landlord/Tenants/TenantDetails";
import { default as Tenants } from "../Screens/screens/Landlord/Tenants/TenantsNew";
import TenantListScreen from "../Screens/screens/Landlord/Tenants/TenantsNew";
import LandlordCodeScreen from "../Screens/screens/Landlord/TenantScreens/MainScreen";
import LeaseDetails from "../Screens/screens/Tenant/LeaseDetails";

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
        tabBarStyle: {
          backgroundColor: "#1a2c4e",
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#8395a7",
        headerShown: false,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            options={{
              tabBarIcon: ({ color }) => (
                <AntDesign name={item?.activeIcon} size={24} color={color} />
              ),
            }}
          >
            {() => (
              <View style={{ flex: 1 }}>
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
          name="TenantPaymentDetails"
          component={TenantPaymentDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecordPayment"
          component={RecordPaymentScreen}
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
        <Stack.Screen
          name="LeaseDetails"
          component={LeaseDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default LoggedInLandlordStack;
