import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useGharbeti from "../context/useGharbeti";

const LoginScreen = ({}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState();

  const [data, setData] = useState({ userName: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [{ loggedUser, users }, { setLoggedUser }] = useTlog();

  const handlePressAsync = async () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Login",
      headerShown: false,
    });
  });
  const handleGoogleLogin = async () => {
    // Implement Google login logic here
    alert("Google login");
  };

  const handleFacebookLogin = async () => {
    // Implement Facebook login logic here
    alert("Facebook login");
  };

  const handleInputChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // fetch("https://fakestoreapi.com/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     username: "johnd",
    //     password: "m38rmF$",
    //   }),
    // })
    //   .then((res) => {
    //     res.json();
    //     navigation.navigate("Home");
    //     console.log(res.json());
    //   })
    //   .then((json) => console.log("data", json));
    setErrorMessage(null);

    if (
      users?.find(
        (arg) =>
          arg?.name === data?.userName.trim() &&
          arg?.password === data?.password
      )
    ) {
      let foundUser = "";
      foundUser = users?.find(
        (arg) =>
          arg?.name === data?.userName.trim() &&
          arg?.password === data?.password.trim()
      );
      navigation.navigate("MainScreen", { screen: "Home" });
      setLoggedUser(foundUser);
      // AsyncStorage.setItem("user", JSON.stringify(foundUser?.id));
    } else {
      setErrorMessage("Login Failed! Please check username or password");
      console.log("asdf");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <View className={"flex-1 items-center justify-center"}>
        <Text className="text-blue-500 mb-4 font-bold text-2xl">
          Friends TLOG
        </Text>

        <TextInput
          className={"w-64 p-2 border border-gray-400 rounded mb-4"}
          placeholder="Username"
          value={data?.userName}
          onChangeText={(newText) => handleInputChange("userName", newText)}
        />
        <TextInput
          className={"w-64 p-2 border border-gray-400 rounded mb-4"}
          placeholder="Password"
          secureTextEntry
          value={data?.password}
          onChangeText={(newText) => handleInputChange("password", newText)}
        />
        {errorMessage && (
          <TouchableOpacity
            className={"border-red-500 bg-red-300 p-2 rounded w-64 mb-4"}
          >
            <Text className={"text-white text-center font-semibold"}>
              {errorMessage}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className={"bg-blue-500 p-2 rounded w-64"}
          onPress={handleLogin}
        >
          <Text className={"text-white text-center font-semibold"}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={"bg-red-600 p-2 rounded w-64 mt-4"}
          onPress={() => alert("Login pressed")}
        >
          <View className="flex-row items-center justify-around">
            <Icon name="google" size={20} color={"white"} />
            <Text className={"text-white text-center font-semibold"}>
              Login Using Google
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className={"bg-blue-500 text-white p-2 rounded w-64 mt-4 "}
          onPress={handlePressAsync}
        >
          <View className="flex-row items-center justify-around">
            <Icon
              name="facebook"
              size={20}
              className="text-white"
              color={"white"}
            />
            <Text className={"text-white font-semibold"}>
              Login with Facebook
            </Text>
          </View>
        </TouchableOpacity>
        {/* <GoogleSigninButton
          className={"mb-2"}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleGoogleLogin}`
        />
        <LoginButton className={"mb-4"} /> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
