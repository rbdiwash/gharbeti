import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/auth/LoginScreen";
import SignupScreen from "../Screens/auth/landlord/SignupScreen";
import ForgotPassword from "../Screens/auth/landlord/ForgotPassword";
import ResetPassword from "../Screens/auth/landlord/ResetPassword";
import OTPScreen from "../Screens/auth/landlord/OTPScreen";
import TenantOnboarding from "../Screens/auth/tenant/TenantOnboarding";
import SplashScreen from "../Screens/SplashScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="tenantOnboarding"
        component={TenantOnboarding}
        options={{ title: "Tenant Invitation", headerShown: false }}
      />
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{ title: "Splash Screen", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ title: "Signup", headerShown: false }}
      />
      <Stack.Screen
        name="forget"
        component={ForgotPassword}
        options={{ title: "Forgot Password", headerShown: false }}
      />
      <Stack.Screen
        name="reset"
        component={ResetPassword}
        options={{ title: "Reset Password", headerShown: false }}
      />
      <Stack.Screen
        name="otp"
        component={OTPScreen}
        options={{ title: "Verify Email", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
