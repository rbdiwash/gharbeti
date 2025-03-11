// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import GharbetiProvider from "./context/provider";
import CheckUser from "./CheckUser";

export default function App() {
  return (
    <GharbetiProvider>
      <NavigationContainer>
        <CheckUser />
      </NavigationContainer>
    </GharbetiProvider>
  );
}
