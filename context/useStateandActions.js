import React from "react";
import { useState } from "react";

const useStateandActions = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const state = { users, loggedUser, posts, isLoggedIn };
  const actions = { setUsers, setLoggedUser, setPosts, setIsLoggedIn };

  return [state, actions];
};

export default useStateandActions;
