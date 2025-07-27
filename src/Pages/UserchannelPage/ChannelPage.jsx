// src/pages/ChannelPage.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VideoGrid } from "../Dashboard/components/VideoGrid.jsx";
import { useSelector } from "react-redux";

// 🔐 Get channel data & videos uploaded by current user
const ChannelPage = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const isuploaded = useSelector((state) => state.ui.isuploaded);
  const isdeleted = useSelector((state) => state.ui.isdeleted);
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Fetch user's own channel
        const res = await axios.get("http://localhost:4000/api/v1/channel/me", {
          withCredentials: true,
        });
        console.log(res.data);

        console.log("🔍 Channel Response:", res.data);
        const channelData = res.data.data;
        console.log(channelData.owner);

        setChannel(channelData);

        // Fetch videos uploaded by channel owner
        const videoRes = await axios.get(
          `http://localhost:4000/api/v1/videos/myvideos`,
          {
            withCredentials: true,
          }
        );

        const videosfromserver = videoRes.data.data;
        setVideos(videosfromserver);
      } catch (error) {
        console.error("Failed to load channel", error);
      }
    };

    fetchChannelData();
  }, [isuploaded, isdeleted]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {channel ? (
        <div className="w-full">
          {/* Banner */}
          <div className="w-full h-40 md:h-64 bg-gray-200 rounded-xl overflow-hidden shadow-md">
            <img
              src={
                channel.channelBanner || "https://via.placeholder.com/800x200"
              }
              alt="Channel Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Channel Info */}
          <div className="mt-6 md:flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {channel.channelName}
              </h2>
              <p className="text-gray-600 font-sans mt-1">
                {channel.description || "No description available."}
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <p className="text-gray-500">{channel.subscribers} subscribers</p>
            </div>
          </div>

          {/* Uploaded Videos */}
          <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">
            Uploaded Videos
          </h3>
          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-10">Loading channel...</p>
      )}
    </div>
  );
};

export { ChannelPage };
