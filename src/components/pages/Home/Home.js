import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext.js";
import "./styleHome.css";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push("/login");
  });
  console.log(userData);

  return (
    <div className="home">
      <div>Welcome, {userData.user.displayName}!</div>
      <Link to="/todos"> Todo List </Link>
    </div>
  );
}
