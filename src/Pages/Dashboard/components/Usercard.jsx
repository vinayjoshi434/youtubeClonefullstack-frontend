import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// components/UserCard.jsx
const UserCard = ({ user }) => {
  const vidoes = useSelector((state) => state.video.customuploadedvideos);
  const [videocount, setVideoCount] = useState(0);

  useEffect(() => {
    setVideoCount(vidoes.length);
  }, [vidoes]);

  return (
    <div className="bg-orange-100 shadow-lg rounded-2xl p-6 w-full flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-6">
      {/* Left: Avatar + User Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="space-y-2 text-center sm:text-left text-blue-900">
          <h2 className="text-xl font-semibold">{`Name: ${user?.name}`}</h2>
          <p className="text-sm text-gray-700 font-mono">@ {user?.username}</p>
          <p className="text-sm text-gray-700 font-mono">{user?.email}</p>
        </div>
      </div>

      {/* Right: Total Videos */}
      <div className="mt-4 sm:mt-2 text-center sm:text-right">
        <p className="text-sm text-orange-600">Total Videos</p>
        <p className="text-2xl font-bold text-orange-900">{videocount}</p>
      </div>
    </div>
  );
};

export { UserCard };
