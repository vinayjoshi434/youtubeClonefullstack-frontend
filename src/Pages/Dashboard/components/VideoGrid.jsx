// components/VideoGrid.jsx
import { useState } from "react";
import { CustomVideoCard } from "./CustomVideoCard.jsx";

const VideoGrid = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">No videos uploaded yet.</p>
    );
  }
  const [hoveredvideoid, setHoveredVideoId] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {videos.map((videoobj) => (
        <CustomVideoCard
          key={videoobj._id}
          video={videoobj}
          ishover={hoveredvideoid === videoobj._id}
          onhover={() => {
            setHoveredVideoId(videoobj._id);
          }}
          onleave={() => {
            setHoveredVideoId(null);
          }}
        />
      ))}
    </div>
  );
};

export { VideoGrid };
