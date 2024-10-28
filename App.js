// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import Container from "./Container";
import GharbetiProvider from "./context/provider";

export default function App() {
  return (
    <GharbetiProvider>
      <NavigationContainer>
        <Container />
      </NavigationContainer>
    </GharbetiProvider>
  );
}
