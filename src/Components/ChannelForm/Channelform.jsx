import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const CreateChannelForm = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formdata = new FormData(); //here i use form data that automaticlly set the type multipart form data
    formdata.append("channelName", channelName);
    formdata.append("description", description);
    formdata.append("channelBanner", channelBanner);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/channel/createchannel", //Api request to create a createchannel
        formdata,
        {
          withCredentials: true, // this is must for cookies
        }
      );

      toast.success("🎉 User channel created successfully!");
      setChannelBanner(null); // reset the form feilds after the process done
      setChannelName(null);
      setDescription(null);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create Your Channel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Channel Name
          </label>
          <input
            type="text"
            name="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            placeholder="e.g. TechWithVinay"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            placeholder="Tell viewers what your channel is about..."
          />
        </div>

        <div>
          <label
            htmlfor="banner"
            className="block text-gray-700 font-medium mb-1"
          >
            Banner Image
          </label>
          <div className="flex items-center relative">
            <input
              id="banner"
              name="channelBanner"
              type="file"
              accept="image/*" //this must include for accepting files
              onChange={(e) => setChannelBanner(e.target.files[0])}
              className="text-sm"
              required
            />
            <label htmlFor="banner">
              <ArrowUpTrayIcon className="h-6 w-6 text-blue-950 absolute bottom-1 right-3" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
};

export { CreateChannelForm };
