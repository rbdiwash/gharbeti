import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#1a2c4e" />
            <RootNavigator />
          </NavigationContainer>
          <Toast />
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// eas build -p android --profile preview
