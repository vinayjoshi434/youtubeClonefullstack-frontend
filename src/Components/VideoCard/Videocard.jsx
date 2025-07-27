import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Videocard = ({ video, isHovered, onHover, onLeave }) => {
  const { video_id, thumbnail, channeltitle, title, views, likes } = video;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`watch/${video_id}`)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
    >
      {/* Thumbnail or Video */}
      {isHovered && video_id ? (
        <iframe
          src={`https://www.youtube.com/embed/${video_id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video_id}`}
          className="w-full h-48 object-cover rounded-t-lg"
          allow="autoplay; encrypted-media"
          loading="lazy"
        />
      ) : thumbnail?.trim() ? (
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-lg"
          loading="lazy"
        />
      ) : (
        ""
      )}

      <div className="flex m-1 gap-1">
        <div className="w-full">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
            {title}
          </h3>

          <p>{channeltitle}</p>
        </div>

        {/*<p className="text-xs text-gray-500">{video.user || video.channel}</p>*/}
      </div>
      <div className="flex justify-between p-1.5 items-center">
        <span className="text-sm text-gray-700 font-medium font-mono ">
          likes :{likes}
        </span>
        <span className="text-sm text-gray-500"> views :{views}</span>
      </div>
    </div>
  );
};
