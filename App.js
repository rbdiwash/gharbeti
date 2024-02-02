// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import GharbetiProvider from "./context/provider";

export default function App() {
  return (
    <GharbetiProvider>
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    </GharbetiProvider>
  );
}
