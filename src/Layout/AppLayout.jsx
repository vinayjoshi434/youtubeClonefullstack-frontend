import { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../Components/Sidebar/Sidebar.jsx";
import { LoginPage } from "../Pages/LoginPage/Loginpage.jsx";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginSuccess } from "../Features/authSlice.js";
// import { Uploadvideo } from "../Components/UploadVideo/Uploadvideo.jsx";
import { Uploadform } from "../Components/UploadVideo/Uploadform.jsx";

function AppLayout() {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.isSidebarOpen);

  useEffect(() => {
    // this useeffect will persist the logge in user if the user reload the browser after login
    const checkiflogin = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/users/me", {
          withCredentials: true,
        });

        const data = res.data;

        dispatch(loginSuccess(data.data.user));
      } catch (error) {
        console.log("User not logged in or session expired.");
      }
    };
    checkiflogin();
  }, []);

  return (
    <div className="m-2 flex flex-col  ">
      <Navbar />
      <div className="flex  min-h-screen">
        <Sidebar sidebarOpen={sidebarOpen} />
        <div
          className={`flex-1 transition-all duration-300 my-4
            
          }`}
        >
          <Outlet />
        </div>
      </div>

      {/* ✅ ToastContainer at root level */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}

export { AppLayout };
