import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getUser, useLoginMutation } from "../redux/api/userApi";
import { useDispatch } from "react-redux";
import { setTokens } from "../redux/reducer/userTokenReducer";
import { userExist } from "../redux/reducer/userReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      const { accessToken, refreshToken } = data.data;

      // console.log(data.data.user);
      dispatch(
        setTokens({
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
      const user = await getUser(data.data.user._id);
      localStorage.setItem("loggedInUser", JSON.stringify(user))
      console.log(user)
      toast.success("Login Successful");
      navigate("/attendance");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="login">
      <div className="left">
        <div className="left-container">
          <h1>Welcome to</h1>
          <h1>Student and</h1>
          <h1>Teacher</h1>
          <h1>ERP</h1>
        </div>
      </div>
      <div className="right">
        <form onSubmit={loginHandler}>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <button onClick={loginHandler} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login As Teacher"}
        </button>
        <button>Login As Student</button>
      </div>
    </div>
  );
};

export default LoginPage;
