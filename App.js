// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import GharbetiProvider from "./context/provider";
import useGharbeti from "./context/useGharbeti";
import LandlordStack from "./Stack/LandlordStack";
import TenantStack from "./Stack/TenantStack";
import AuthStack from "./Stack/AuthStack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "expo-status-bar";

// const CheckUser = () => {
//   const [{ userState }, {}] = useGharbeti();

//   return (
//     <>
//       {userState?.userType === "landlord" ? (
//         <LandlordStack />
//       ) : userState?.userType === "tenant" ? (
//         <TenantStack />
//       ) : (
//         <AuthStack />
//       )}
//     </>
//   );
// };

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
        </>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// eas build -p android --profile preview
