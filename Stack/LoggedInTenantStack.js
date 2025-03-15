import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import EditProfileScreen from "../Screens/screens/Tenant/EditProfileScreen";
import HomeScreen from "../Screens/screens/Tenant/HomeScreen";
import LeaseDetails from "../Screens/screens/Tenant/LeaseDetails";
import MaintenanceDetails from "../Screens/screens/Tenant/MaintenanceDetails";
import MaintenanceScreen from "../Screens/screens/Tenant/MaintenanceScreen";
import MakePayment from "../Screens/screens/Tenant/MakePayment";
import NewMaintenanceRequest from "../Screens/screens/Tenant/NewMaintenanceRequest";
import NoticeDetails from "../Screens/screens/Tenant/NoticeDetails";
import NoticesScreen from "../Screens/screens/Tenant/NoticesScreen";
import NotificationsScreen from "../Screens/screens/Tenant/NotificationsScreen";
import PaymentHistory from "../Screens/screens/Tenant/PaymentHistory";
import PaymentsScreen from "../Screens/screens/Tenant/PaymentsScreen";
import ProfileScreen from "../Screens/screens/Tenant/ProfileScreen";
import SettingsScreen from "../Screens/screens/Tenant/SettingsScreen";
import UnderConstructionScreen from "../Screens/screens/Tenant/UnderConstruction";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
      <Tab.Screen
        name="tenantHome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="money-bill-wave" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="tools" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="more-vertical" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoggedInTenantStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="TenantTabs" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Notices" component={NoticesScreen} />
      <Stack.Screen name="NoticeDetails" component={NoticeDetails} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NewMaintenance" component={NewMaintenanceRequest} />
      <Stack.Screen
        name="MaintenanceDetails"
        component={MaintenanceDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LeaseDetails" component={LeaseDetails} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="MakePayment" component={MakePayment} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="UnderConstruction"
        component={UnderConstructionScreen}
      />
    </Stack.Navigator>
  );
};

// Export the AppNavigator instead of AppStack
export default LoggedInTenantStack;
