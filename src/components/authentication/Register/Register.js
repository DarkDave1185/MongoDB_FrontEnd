import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import "./styleRegister.css";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  let history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginResponse = await Axios.post(
        "http://localhost:5000/users/login",
        {
          email,
          password,
        }
      );
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="registration">
      <h3>Register</h3>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit} className="form">
        <label htmlFor="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="reg-pass">Password</label>
        <input
          id="reg-pass"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <label htmlFor="reg-uname">UserName</label>
        <input
          id="reg-uname"
          type="text"
          autoComplete="username"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
