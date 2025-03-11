// import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import LoggedOutStack from "./Stack/LoggedOutStack";
import useGharbeti from "./context/useGharbeti";
import LoggedInLandlordStack from "./Stack/LoggedInLandlordStack";
import LoggedInTenantStack from "./Stack/LoggedInTenantStack";

export const CheckUserType = ({ user }) => {
  return (
    <>
      {user === "landlord" ? (
        <LoggedInLandlordStack />
      ) : (
        <LoggedInTenantStack />
      )}
    </>
  );
};

const CheckUser = ({}) => {
  const [{ isLoggedIn }, {}] = useGharbeti();

  return <>{isLoggedIn ? <CheckUserType user={""} /> : <LoggedOutStack />}</>;
};

export default CheckUser;
