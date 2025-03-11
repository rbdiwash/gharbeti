import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../Screens/screens/Tenant/HomeScreen";
import MaintenanceScreen from "../Screens/screens/Tenant/MaintenanceScreen";
import PaymentsScreen from "../Screens/screens/Tenant/PaymentsScreen";
import ChatScreen from "../Screens/screens/Tenant/ChatScreen";
import NoticesScreen from "../Screens/screens/Tenant/NoticesScreen";
import NotificationsScreen from "../Screens/screens/Tenant/NotificationsScreen";
import NewMaintenanceRequest from "../Screens/screens/Tenant/NewMaintenanceRequest";
import LeaseDetails from "../Screens/screens/Tenant/LeaseDetails";
import PaymentHistory from "../Screens/screens/Tenant/PaymentHistory";
import MakePayment from "../Screens/screens/Tenant/MakePayment";
import ProfileScreen from "../Screens/screens/Tenant/ProfileScreen";
import MaintenanceDetails from "../Screens/screens/Tenant/MaintenanceDetails";

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
        tabBarActiveTintColor: "#27ae60",
        tabBarInactiveTintColor: "#8395a7",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="TenantHome"
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
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses" size={24} color={color} />
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
    </Stack.Navigator>
  );
};

export default LoggedInTenantStack;
