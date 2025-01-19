// import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../Screens/AuthScreen/ForgotPassword";
import GetStarted from "../Screens/AuthScreen/GetStarted";
import ResetPassword from "../Screens/AuthScreen/ResetPassword";
import SignupScreen from "../Screens/AuthScreen/SignupScreen";
import SplashScreen from "../Screens/SplashScreen";

const Stack = createNativeStackNavigator();

const LoggedOutStack = () => {
  return (
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
  );
};

export default LoggedOutStack;
