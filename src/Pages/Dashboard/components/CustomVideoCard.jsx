import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { removecustomVideo } from "../../../Features/videoSlice";
import { toast } from "react-toastify";
import { setIsUploaded, setIsDeleted } from "../../../Features/uiSlice";
import { useState } from "react";
import { EditVideoModal } from "./EditVideoModal.jsx";

const CustomVideoCard = ({ video, ishover, onhover, onleave }) => {
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(false);

  const {
    _id,
    thumbnailUrl,
    videoUrl,
    description,
    title,
    category,
    views,
    likescount,
    dislikescount,
    uploadedBy,
  } = video;

  const navigate = useNavigate();

  const handeldelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/videos/myvideos/delete/${_id}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      toast.success(
        `✅ ${data.message} deleted Video Title - ${data.data.title}`
      );
      dispatch(removecustomVideo(data.data._id));
      dispatch(setIsDeleted());
    } catch (error) {
      toast.error(` ❌ ${error.response.data?.message}`);
    }
  };

  const handelEdit = async (updateddata) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/videos/myvideos/update/${_id}`,

        updateddata,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      toast.success(
        `✅ ${data.message}  Video Title updated to - ${data.data.title}`
      );
      dispatch(setIsUploaded());
    } catch (error) {
      if (error.response.status === 403) {
        toast.error(` ❌ ${error.response.data?.message}`);
      } else if (error.response.status === 400) {
        toast.error(` ❌ ${error.response.data?.message}`);
      } else {
        toast.error(`❌ Unexpected error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200 w-full max-w-md mx-auto">
        <div
          onClick={() => navigate(`/profile/watch/${_id}`)}
          onMouseEnter={onhover}
          onMouseLeave={onleave}
          className="cursor-pointer"
        >
          {/* Thumbnail or Video Preview */}
          <div className="w-full aspect-video bg-black">
            {ishover && _id ? (
              <video
                src={video.videoUrl}
                controls
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : thumbnailUrl?.trim() ? (
              <img
                src={video.thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                No Thumbnail
              </div>
            )}
          </div>

          {/* Video Info */}
          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-2">
              {title}
            </h3>

            <div className="flex justify-between items-center text-sm text-gray-600 font-mono">
              <span>👍 {likescount || 0}</span>
              <span>👁️ {views || 0}</span>
            </div>
            <div className="flex justify-between  items-center">
              <span className="text-sm text-gray-700 font-medium font-mono ">
                Category : {category}
              </span>
            </div>
          </div>
        </div>

        <div className="px-3 pb-3 flex flex-wrap sm:flex-nowrap justify-between gap-2">
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handeldelete}
          >
            Delete
          </Button>
          <Link>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<EditIcon />}
              onClick={() => setShowEdit(true)}
            >
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <EditVideoModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        onSave={handelEdit}
      />
    </>
  );
};

export { CustomVideoCard };
