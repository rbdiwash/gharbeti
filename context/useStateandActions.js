import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState } from "react";

const useStateandActions = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const tempData = [
    {
      tripName: "Sydney Trip",
      dateFrom: new Date(),
      dateTo: new Date(),
      id: 1,
      location: "Sydney NSW",
    },
    {
      tripName: "USA Trip",
      dateFrom: new Date(),
      dateTo: new Date(),
      id: 2,
      location: "Virginia",
    },
    {
      tripName: "Indonesia Trip",
      dateFrom: new Date(),
      dateTo: new Date(),
      id: 3,
      location: "Indonesia Bali",
    },
    {
      tripName: "Thailand Trip",
      dateFrom: new Date(),
      dateTo: new Date(),
      id: 4,
      location: "Thailand Pataya",
    },
    {
      tripName: "India Tour",
      dateFrom: new Date(),
      dateTo: new Date(),
      id: 5,
      location: "Goa, India",
    },
  ];
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

  const state = { users, loggedUser, posts };
  const actions = { setUsers, setLoggedUser, setPosts };

  return [state, actions];
};

export default useStateandActions;
