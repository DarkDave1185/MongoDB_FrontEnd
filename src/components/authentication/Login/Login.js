import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import ErrorNotice from "../../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  let history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginResponse = await Axios.post(
        "http://localhost:5000/users/login",
        loginUser
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
    <div className="login">
      <h3>Login</h3>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit} className="form">
        <label htmlFor="log-email">Email</label>
        <input
          id="log-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="log-pass">Password</label>
        <input
          id="log-pass"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
