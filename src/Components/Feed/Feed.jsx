import React, { useEffect } from "react";
import { useState } from "react";
import { useVideo } from "../../Hooks/useVideos.js";
import { useSelector, useDispatch } from "react-redux";
import { Videocard } from "../VideoCard/Videocard.jsx";
import axios from "axios";
import { clearCategoryandId, clearSearhQuery } from "../../Features/uiSlice.js";
import { setAllCustomVideos } from "../../Features/videoSlice.js";
import { CustomVideoCard } from "../../Pages/Dashboard/components/CustomVideoCard.jsx";
export const Feed = () => {
  useEffect(() => {
    const fetchallcustomvideos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/videos/all", {
          withCredentials: true,
        });

        dispatch(setAllCustomVideos(res.data.data));
      } catch (error) {
        console.log(
          "User not logged in or session expired. to view the custom videos"
        );
      }
    };
    fetchallcustomvideos();
  }, []);

  const dispatch = useDispatch();
  // ⬇️ calling the custom hook here — triggers data fetch and updates Redux
  useVideo();

  const { selectedcategory, searchquery } = useSelector((state) => state.ui); //getting the category and search query feild from the redux store

  const [hoveredVideoId, setHoveredVideoId] = useState(null); //these are the flag that determine the card is hovered or not

  const customvideos = useSelector((state) => state?.video?.allcustomvideos);

  const videos = useSelector((state) => state?.video?.videos); //getting the external Api videos from the redux state

  console.log(videos);

  return (
    <div>
      <div className="px-6 py-4 w-full">
        {customvideos?.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Recently Uploaded
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {customvideos.map((videoobj) => (
                // <Videocard key={video.id} video={video} />
                <CustomVideoCard
                  key={videoobj._id}
                  video={videoobj}
                  ishover={hoveredVideoId === videoobj._id}
                  onhover={() => {
                    setHoveredVideoId(videoobj._id);
                  }}
                  onleave={() => {
                    setHoveredVideoId(null);
                  }}
                />
              ))}
            </div>
          </section>
        )}
        {/* Section: Pixabay /youtube External API Videos */}
        <section className="pl-3">
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl font-medium  text-gray-800 font-serif">
              {searchquery
                ? `Search: "${searchquery}"`
                : selectedcategory
                ? `Category: ${selectedcategory}`
                : "🔥 Trending Videos"}
            </h2>

            {selectedcategory ? (
              <button
                type="button"
                className="px-3 py-1 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500 transition duration-200 ease-in-out"
                onClick={() => {
                  dispatch(clearCategoryandId());
                }}
              >
                ClearCategory
              </button>
            ) : searchquery ? (
              <button
                type="button"
                className="px-3 py-1 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500 transition duration-200 ease-in-out"
                onClick={() => {
                  dispatch(clearSearhQuery());
                }}
              >
                ClearSearch
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((videoobj) => (
              <Videocard
                key={videoobj.video_id}
                video={videoobj}
                isHovered={hoveredVideoId === videoobj.video_id}
                onHover={() => {
                  setHoveredVideoId(videoobj.video_id);
                }}
                onLeave={() => setHoveredVideoId(null)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
