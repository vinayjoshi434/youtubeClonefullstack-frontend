import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../../Features/authSlice";

import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 🔹 State variables for inputs

  const [isloggedin, setIsLoggedIn] = useState(true);
  const [namefeild, setNamefeild] = useState("");
  const [emailfeild, setEmailfeild] = useState("");
  const [passwordfeild, setPasswordfeild] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernamefeild, setUsernamefeild] = useState("");
  const [avatarfeild, setAvatarfeild] = useState("");

  // 🔹 Toggle password visibility
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  //   // 🔹 Optional: Handle form submit
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Email:", emailfeild);
  //     console.log("Password:", passwordfeild);
  //     // Call backend API here later
  //   };

  async function handelRegister(e) {
    try {
      e.preventDefault();

      const formdata = new FormData();
      formdata.append("name", namefeild);
      formdata.append("email", emailfeild);
      formdata.append("password", passwordfeild);
      formdata.append("username", usernamefeild);
      formdata.append("avatar", avatarfeild);

      console.log("avatar state", avatarfeild);

      let response = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        formdata,
        {
          withCredentials: true,
        }
      );
      //   const data = response.data;
      //   if (!response.ok) {
      //     const error = new Error(data.message || "Unknown Error");
      //     error.status = response.status;
      //     throw error;
      //   }  this will not work for axios as it does this automatically only applicable for fetch

      toast.success("🎉 User registered successfully!");
      setIsLoggedIn(true);
      setAvatarfeild(null);
      setEmailfeild("");
      setNamefeild("");
      setPasswordfeild("");
      setUsernamefeild("");
    } catch (error) {
      // ✅ Proper axios error handling
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || "Unknown error";

          if (status === 409) {
            toast.warning("⚠️ User already exists");
          } else {
            toast.warning(`⚠️ HTTP Error ${status}: ${message}`);
          }
        } else if (error.request) {
          // Request was made but no response
          toast.error("🚫 Network error or no response from server (CORS?)");
        } else {
          // Axios config or setup error
          toast.error(`🚫 Axios error: ${error.message}`);
        }
      } else {
        // Non-Axios error
        toast.error(`❌ Unexpected error: ${error.message}`);
      }
    }
  }

  async function handelLogin(e) {
    try {
      e.preventDefault();

      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email: emailfeild,
          password: passwordfeild,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;

      //   if (!response.ok) {
      //     const error = new Error(data.message || "Unknown Error");
      //     error.status = response.status;
      //   }
      toast.success(
        `✅  ${data.message}   with statusCode: ${response.status}`
      );

      dispatch(loginSuccess(data.data.user));

      setEmailfeild("");
      setPasswordfeild("");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || "No status";
        const message = error.response?.data?.message || error.message;
        toast.error(`⚠️ Login failed: ${message} (Status: ${status})`);
      } else {
        toast.error(`❌ Unexpected error: ${error.message}`);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-medium text-center mb-1 font-sans text-amber-500">
          Welcome Back
        </h2>
        <p className="text-md text-gray-600 text-center mb-6">
          Please login to your account
        </p>

        <form className="space-y-4">
          {/* Name Field */}
          {!isloggedin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={namefeild}
                onChange={(e) => setNamefeild(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your name"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={emailfeild}
              onChange={(e) => setEmailfeild(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          {!isloggedin && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                value={usernamefeild}
                onChange={(e) => setUsernamefeild(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={passwordfeild}
                onChange={(e) => setPasswordfeild(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {!isloggedin && (
            <div>
              <label
                htmlFor="avatarupload"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <div className="flex items-center relative">
                <input
                  id="avatarupload"
                  accept="image/*"
                  name="avatar"
                  type="file"
                  required
                  onChange={(e) => setAvatarfeild(e.target.files[0])}
                  className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <label htmlFor="avatarupload">
                  <ArrowUpTrayIcon className="h-6 w-6 text-blue-950 absolute bottom-1 right-3" />
                </label>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex items-center justify-between text-sm text-amber-950">
            <label className="flex items-center">
              <input type="checkbox" classNAme="h-4 w-4 text-blue-600" />
              <span className="ml-2 text-blue-950 font-medium font-popins">
                Remember me
              </span>
            </label>
            <a href="#" className="text-shadow-blue-600 hover:underline">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold duration-300"
            onClick={
              !isloggedin ? (e) => handelRegister(e) : (e) => handelLogin(e)
            }
          >
            {!isloggedin ? "Register" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-md text-gray-500 mt-4 font-mono">
          {!isloggedin ? "Don’t have an account :" : "Already have Account"}
          <span
            className="text-blue-600 hover:underline font-mono "
            onClick={() => {
              setIsLoggedIn(!isloggedin);
            }}
          >
            {!isloggedin ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};
