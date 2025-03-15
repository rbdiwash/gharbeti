import React from "react";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useStateandActions = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userType, setUserType] = useState("landlord");

  const [users, setUsers] = useState([
    {
      email: "user1@gmail.com",
      password: "1234",
      name: "Divash",
      id: 1,
      userName: "divash",
    },
    {
      email: "user2@gmail.com",
      password: "1234",
      name: "Sreekanth",
      id: 2,
      username: "sree",
    },
    {
      email: "user3@gmail.com",
      password: "1234",
      name: "Shankar",
      id: 3,
      username: "shankar",
    },
    {
      email: "user4@gmail.com",
      password: "1234",
      name: "Divya",
      id: 4,
      username: "divya",
    },
  ]);
  const [posts, setPosts] = useState([]);
  const [userState, setUserState] = useState({
    isLoading: true,
    isLoggedIn: false,
    userType: null, // 'landlord', 'tenant', or null
    user: null,
    theme: "light",
    language: "en",
  });

  // Login user and save to AsyncStorage
  const loginUser = async (userType, userData = {}) => {
    try {
      // Save to AsyncStorage
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          userType,
          user: userData,
        })
      );

      // Update context state
      setUserState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
        userType,
        user: userData,
      }));

      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  };

  // Logout user and clear AsyncStorage
  const logoutUser = async () => {
    try {
      // Clear from AsyncStorage
      await AsyncStorage.removeItem("userData");

      // Update context state
      setUserState((prevState) => ({
        ...prevState,
        isLoggedIn: false,
        userType: null,
        user: null,
      }));

      return true;
    } catch (error) {
      console.error("Error clearing user data:", error);
      return false;
    }
  };
  const state = { users, loggedUser, posts, isLoggedIn, userType, userState };
  const actions = {
    setUsers,
    setLoggedUser,
    setPosts,
    setIsLoggedIn,
    setUserType,
    setUserState,
    loginUser,
    logoutUser,
  };

  return [state, actions];
};

export default useStateandActions;
