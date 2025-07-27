import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Features/authSlice";
import { clearCustomvideos } from "../../Features/videoSlice";
import { clearAllCustomVideos } from "../../Features/videoSlice";
import youtubeicon from "../../assets/youtubeicon.png";
import menu_icon from "../../assets/menu.png";
import search from "../../assets/search.png";
import upload from "../../assets/upload.png";
import more from "../../assets/more.png";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import PersonIcon from "@mui/icons-material/Person";

import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Tooltip from "@mui/material/Tooltip";

import {
  changeTheme,
  toggleSidebar,
  setSearchQuery,
} from "../../Features/uiSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //to dispatch action and make the changes in the redux store
  const userinfo = useSelector((state) => state.auth); //getting the state access form redux store

  const user = userinfo.user;
  console.log(user);

  const isAuthenticated = userinfo.isAuthenticated;
  console.log(isAuthenticated);

  async function handelLogout() {
    // this is the Logout handler that hit a api request to /users/logout
    try {
      const response = await fetch(
        "http://localhost:4000/api/v1/users/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        const error = new Error(data.message || "Unknown error");
        error.status = response.status;
        throw error;
      }
      dispatch(logout());
      dispatch(clearCustomvideos());
      dispatch(clearAllCustomVideos());

      toast.success("✅ User logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.warning(`⚠️ Something looks off! 
         message: ${error.message}  Status: ${error.status}`);
    }
  }

  const handleprotectedcomponent = (e) => {
    //this is the handeler for  conditionally showing the component based on the   user state
    e.preventDefault();
    const name = e.currentTarget.getAttribute("name");
    if (!isAuthenticated) {
      if (name === "upload") {
        toast.warn("⚠️ Please log in first to upload your custom videos.");

        navigate("/login");
      } else if (name === "profile") {
        toast.warn("⚠️ Please log in first to view profile.");

        navigate("/login");
      } else if (name === "channel") {
        toast.warn("⚠️ Please log in first to view channel info.");

        navigate("/login");
      } else if (name === "createchannel") {
        toast.warn("⚠️ Please log in first to create channel");

        navigate("/login");
      }
    } else {
      if (name === "upload") {
        navigate("/upload");
      } else if (name === "profile") {
        navigate("/profile");
      } else if (name === "channel") {
        navigate("/profile/channel");
      } else if (name === "createchannel") {
        navigate("/profile/createchannel");
      }
    }
  };

  const [searchinput, setsearchInput] = useState("");

  // this is for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="sticky top-0 z-40 bg-fuchsia-100 shadow-md p-2 flex flex-wrap items-center justify-between gap-y-2">
      {/*flex items-center justify-between sticky box-border shadow-xl p-1*/}
      <div className="flex items-center gap-4">
        <img
          src={menu_icon}
          className=" w-8 cursor-pointer "
          alt=""
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        />
        <img src={youtubeicon} alt="" />
        {/*home icon*/}

        <Link to="/">
          {/*here using a tooltip from MUI for better ux */}
          <Tooltip title="Home" arrow>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Tooltip>
        </Link>
      </div>
      <div className="flex items-center w-full sm:w-1/2 md:w-1/3 border-2 border-gray-600 rounded-full px-4 py-2">
        <input
          type="text"
          value={searchinput}
          onChange={(e) => {
            setsearchInput(e.target.value);
          }}
          placeholder="search"
          className=" flex-grow outline-none text-sm"
        />
        <img
          src={search}
          alt=""
          className="w-5 ml-2"
          onClick={() => {
            dispatch(setSearchQuery(searchinput));
            setsearchInput("");
          }}
        />
      </div>

      {userinfo.isAuthenticated ? ( // conditionally rendering the name oce the user is authenticated
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <span className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
            Hello,&nbsp;
            <span className="text-blue-500">{user?.name}</span>
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <span className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
            Hello,&nbsp;
            <span className="text-blue-500">{"Guest"}</span>
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/*these are the route button for navbar options */}{" "}
        <Link to="upload">
          <Tooltip title="upload" arrow>
            <img
              src={upload}
              name="upload"
              alt=""
              className=" w-6 sm:w-8"
              onClick={(e) => handleprotectedcomponent(e)}
            />
          </Tooltip>
        </Link>
        {/* <Link to="profile">
          <img              //previously done 
            src={more}
            name="profile"
            alt=""
            aria-controls={open ? "basic-menu" : undefined}
             aria-haspopup="true"
             aria-expanded={open ? "true" : undefined}
            className=" w-6 sm:w-8"
            onClick={(e) => {
                handleprotectedcomponent(e)
                handleClick
                }
          />
        </Link> */}
        <div>
          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >           instead of button here i use img showing more option
            Dashboard
          </Button> */}
          <Tooltip title="More" arrow>
            <img
              src={more}
              name="profile"
              alt=""
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className=" w-6 sm:w-8"
              onClick={(e) => {
                handleClick(e);
              }}
            />
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
          >
            <MenuItem
              name="profile"
              onClick={(e) => {
                handleprotectedcomponent(e);
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              name="channel"
              onClick={(e) => {
                handleprotectedcomponent(e);
                handleClose();
              }}
            >
              My channel
            </MenuItem>
            <MenuItem
              name="createchannel"
              onClick={(e) => {
                handleprotectedcomponent(e);
                handleClose();
              }}
            >
              Create Channel
            </MenuItem>
          </Menu>
        </div>
        {/*<img src="" alt=" notification" />*/}
        {!userinfo.isAuthenticated ? (
          <PersonIcon />
        ) : (
          <img
            src={user.avatar}
            className="rounded-full  border-2 border-transparent w-10 h-10 sm:w-9 sm:h-9  object-cover object-center hover:border-blue-500 transition"
            alt=""
          />
        )}
        {!isAuthenticated ? (
          <Link to="login">
            <Tooltip title="login" arrow>
              <LoginOutlinedIcon />
            </Tooltip>
          </Link>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            className="text-gray-500 hover:text-gray-700 font-popins"
            onClick={() => {
              handelLogout();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};
