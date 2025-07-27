import axios from "axios";
import React, { useState } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
const Uploadform = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    video: null,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "video" && files[0]) {
      setFormData({ ...formData, video: files[0] });
    } else if (name === "thumbnail" && files[0]) {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("trigger");
      setIsUploading(true);
      // if (
      //   Object.values(formData).some((feild) => {
      //     return feild.trim() === "";
      //   })
      // ) {
      //   alert("Please fill in all required fields.");
      //   return;
      // }   this is optional

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("tags", formData.tags);
      data.append("video", formData.video);
      data.append("thumbnail", formData.thumbnail);
      console.log(data);

      console.log(data.thumbnail);
      console.log(data.video);

      console.log("Ready to submit to backend");

      const response = await axios.post(
        "http://localhost:4000/api/v1/videos/uploadvideo", // api route for upload video

        data,
        {
          withCredentials: true,
        }
      );

      toast.success("🎉 User successfully! uploaded video");

      setFormData({
        title: "",
        description: "",
        tags: "",
        video: null,
        thumbnail: null,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Error Occured while uploading the video ");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsUploading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-200 to-blue-500 px-4 ">
      <div className="w-full sm:max-w-2xl lg:max-w-2xl bg-amber-50 p-6 rounded-xl shadow-lg mx-auto m-10">
        <h2 className="text-2xl font-medium text-center mb-1 font-sans text-amber-500 m-2">
          Welcome! 📤 Upload Your content here
        </h2>
        <form className="space-y-4 w-full max-w-3xl mx-auto  px-4 sm:px-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter title ...."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500 font-bold">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a description..."
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., travel, vlog, music"
            />
          </div>

          {/*thumbnail*/}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail
            </label>
            <div className="flex items-center relative">
              <input
                id="thumbnail"
                accept="image/*"
                name="thumbnail"
                type="file"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <label htmlFor="thumbnail">
                <ArrowUpTrayIcon className="h-6 w-6 text-blue-950 absolute bottom-1 right-3" />
              </label>
            </div>
          </div>

          {/*video*/}
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700"
            >
              Video
            </label>
            <div className="flex items-center relative">
              <input
                id="video"
                accept="video/*"
                name="video"
                type="file"
                required
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <label htmlFor="video">
                <ArrowUpTrayIcon className="h-6 w-6 text-blue-950 absolute bottom-1 right-3" />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#2cb67d] hover:bg-[#26a46f] text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              onClick={handleSubmit}
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>

      {/*spinner showing while uploading*/}
      {isUploading && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl shadow-xl bg-white/70 backdrop-blur-md flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8z"
              />
            </svg>
            <p className="mt-4 text-blue-800 font-semibold text-lg">
              Uploading your video...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { Uploadform };
