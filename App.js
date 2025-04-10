// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import GharbetiProvider from "./context/provider";
import useGharbeti from "./context/useGharbeti";
import LoggedInLandlordStack from "./Stack/LoggedInLandlordStack";
import LoggedInTenantStack from "./Stack/LoggedInTenantStack";
import LoggedOutStack from "./Stack/LoggedOutStack";

const CheckUser = () => {
  const [{ userState }, {}] = useGharbeti();

  return (
    <>
      {userState?.userType === "landlord" ? (
        <LoggedInLandlordStack />
      ) : userState?.userType === "tenant" ? (
        <LoggedInTenantStack />
      ) : (
        <LoggedOutStack />
      )}
    </>
  );
};

export default function App() {
  return (
    <GharbetiProvider>
      <NavigationContainer>
        <CheckUser />
      </NavigationContainer>
    </GharbetiProvider>
  );
}

// eas build -p android --profile preview
