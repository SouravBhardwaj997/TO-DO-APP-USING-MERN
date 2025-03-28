import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(true);
  const nav = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.password.length < 6) {
      toast.error("Password should be 6 character long", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    if (loginData.password.length == 0 || loginData.email.length == 0) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        {
          ...loginData,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message || "Something went wrong!", {
            position: "top-center",
            autoClose: 5000,
            draggable: true,
            theme: "dark",
          });
        }, 500);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userData", JSON.stringify(response.data.user));
        nav("/todos");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(signUpData);
    if (signUpData.password.length < 6) {
      toast.error("Password should be 6 character long", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    if (
      signUpData.password.length == 0 ||
      signUpData.email.length == 0 ||
      signUpData.name.length == 0
    ) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/api/user/sign-up`, {
        ...signUpData,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          draggable: true,
          theme: "dark",
        });
        toggleForm();
        toast.success("Now u can login", {
          position: "top-center",
          autoClose: 5000,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong!", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
        theme: "dark",
      });
    }
  };
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <>
      <div className="w-full max-w-md bg-slate-100 p-8 rounded-lg shadow-lg">
        <div className="flex justify-between mb-8">
          <button
            onClick={toggleForm}
            className={`px-4 py-2 rounded-tl-lg focus:outline-none ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={toggleForm}
            className={`px-4 py-2 rounded-tr-lg focus:outline-none ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="mb-4">
              <label htmlFor="login-email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, email: e.target.value }));
                }}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="login-password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <div className="mb-6">
              <label htmlFor="signup-name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="signup-name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={signUpData.name}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signup-email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={signUpData.email}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="signup-password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                value={signUpData.password}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
