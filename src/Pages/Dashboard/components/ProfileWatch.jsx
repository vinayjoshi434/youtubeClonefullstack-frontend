import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import { CommentSection } from "./CommentSection";

export const ProfileWatch = () => {
  const { id } = useParams();
  console.log(id);

  const [fetchedVideo, setFetchedVideo] = useState(null);
  const videos = useSelector((state) => state.video.customuploadedvideos);
  let video = videos.find((v) => String(v._id) === id) || fetchedVideo;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on video change
  }, [id]);

  useEffect(() => {
    if (videos.length === 0) {
      const getvideoByID = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/videos/customvideos/${id}`,
            {
              withCredentials: true,
            }
          );

          const data = response.data.data;
          setFetchedVideo(data); // ✅ Store in local state
        } catch (error) {
          toast.error(` ❌ ${error.response.data?.message}`);
        }
      };
      getvideoByID();
    }
  }, [id]);

  if (!video && videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-gray-600 text-xl">
        Loading video...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 w-full">
      {/* Video Player Section */}
      <div className="flex-1 w-full max-w-full">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
          <video
            src={video.videoUrl}
            controls
            className="w-full h-full object-contain"
          />
        </div>

        {/* Video Info */}
        <div className="mt-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {video.title}
          </h1>

          <div className="text-sm text-gray-600 flex flex-wrap items-center gap-4">
            <span>👤 {video.uploadedBy?.name || "Unknown"}</span>
            {/* <span>📅 {formatDistanceToNow(new Date(video.createdAt))} ago</span> */}
            <span>👁️ {video.views} views</span>
            <span>👍 {video.likescount}</span>
            <span>👎 {video.dislikescount}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 font-medium rounded-full text-xs">
              #{video.category}
            </span>
          </div>

          {/* Description */}
          {video.description?.trim() && (
            <div className="mt-3 bg-gray-100 p-3 rounded-md text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {video.description}
            </div>
          )}
        </div>

        <CommentSection videoId={id} />
      </div>

      {/* Placeholder Sidebar for Related/Custom Actions */}
      <div className="w-full lg:w-72 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-lg shadow p-4 border">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            More Actions
          </h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="hover:text-blue-600 cursor-pointer">✏️ Edit</li>
            <li className="hover:text-red-600 cursor-pointer">🗑️ Delete</li>
            <li className="hover:text-green-600 cursor-pointer">📤 Share</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            Related Videos
          </h3>
          <p className="text-sm text-gray-500 italic">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};
