import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [iscommentadd, setIsCommentAdd] = useState(false);
  const [iscommentdelete, setIsCommentDelete] = useState(false);
  const [iscommentedit, setIsCommentEdit] = useState(false);
  console.log(videoId);

  const currentuserId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/comments/${videoId}`,
          {
            withCredentials: true,
          }
        );
        const data = res.data.data;
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadComments();
  }, [videoId, iscommentdelete, iscommentedit, iscommentadd]);

  const handleadd = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/comments/addcomment",
        {
          videoId,
          text: newComment,
        },
        {
          withCredentials: true,
        }
      );

      setIsCommentAdd((prev) => !prev);
      //   setComments([createdComment, ...comments]);
      toast.success(`${res.data.message}`);
      setNewComment("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handledelete = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/comments/delete/${commentId}`,
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      toast.success(`${data.message}`);
      setIsCommentDelete((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = async (commentId, currentText) => {
    const updatedText = prompt("Edit comment:", currentText);
    console.log(updatedText);

    if (!updatedText || updatedText === currentText) return;
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/v1/comments/update/${commentId}`,
        { text: updatedText },
        {
          withCredentials: true,
        }
      );
      const data = res.data;

      toast.success(`${data.message}`);
      setIsCommentEdit((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <textarea
          className="w-full border rounded-lg p-3 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          onClick={handleadd}
          className="self-end sm:self-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Post
        </button>
      </div>

      <ul className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <li
              key={comment._id}
              className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-sm">{comment.userId.name}</p>
                  <p className="font-semibold text-sm">
                    {comment.userId.username}
                  </p>
                  <p className="text-gray-800 text-sm mt-1 font-mono">
                    {comment.text}
                  </p>
                </div>
                {String(currentuserId) === String(comment.userId._id) && (
                  <div className="flex gap-2 text-sm text-blue-600">
                    <button
                      onClick={() => handleEdit(comment._id, comment.text)}
                      className="hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handledelete(comment._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export { CommentSection };
