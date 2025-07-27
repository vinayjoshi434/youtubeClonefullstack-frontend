// pages/Profile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCard } from "./components/Usercard.jsx";
import { VideoGrid } from "./components/VideoGrid.jsx";
import { useSelector, useDispatch } from "react-redux";

import { addCustomVideo } from "../../Features/videoSlice.js";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const isuploaded = useSelector((state) => state.ui.isuploaded);
  const isdeleted = useSelector((state) => state.ui.isdeleted);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/videos/myvideos`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      console.log(data);

      dispatch(addCustomVideo(data.data));
    } catch (error) {
      if (error.response.status === 404) {
        toast.warning("No videos Available...", {
          toastId: "no-videos-warning",
        });
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, [isuploaded, isdeleted]);

  const { user, isauthenticated } = useSelector((state) => state.auth);
  const videos = useSelector((state) => state.video.customuploadedvideos);
  console.log(videos);

  //if (loading)
  //return <div className="text-center py-10">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8 ">
      <h1 className="text-2xl font-bold text-center text-amber-600 font-mono">
        👤 My Profile
      </h1>
      <UserCard user={user} />
      <div>
        <h2 className="text-2xl font-semibold mt-4 mb-2 text-gray-700">
          🎥 My Uploads
        </h2>
        <VideoGrid videos={videos} />
      </div>
    </div>
  );
};

export { Profile };
