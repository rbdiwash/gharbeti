// import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import LoggedInLandlordStack from "./Stack/LoggedInLandlordStack";
import LoggedOutStack from "./Stack/LoggedOutStack";
import useGharbeti from "./context/useGharbeti";
import CheckLandLordUser from "./Screens/helper/CheckUser";

const Container = ({}) => {
  const [{ isLoggedIn }, {}] = useGharbeti();

  return (
    <>
      {isLoggedIn ? (
        <CheckLandLordUser user={"landlord"} />
      ) : (
        <LoggedOutStack />
      )}
    </>
  );
};

export default Container;
