import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";
import { toast } from "react-toastify";

function WriteComment({ userId, onCommentSubmitted }) {
  const { getUserDetails, setLoader } = useStateContext();

  const ratingInitialState = {
    rating: 0,
    hoveredRating: 0,
    comment: "",
  };
  const [userRating, setUserRating] = useState(ratingInitialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = {
      user_to: userId,
      score: userRating.rating,
      comment: userRating.comment,
    };

    axiosClient
      .post("/ratings/store", formData)
      .then(() => {
        getUserDetails(userId);
        setUserRating(ratingInitialState);
        toast.success("რეიტინგი წარმატებით დაემატა");
        if (onCommentSubmitted) onCommentSubmitted();
      })
      .catch(({ response }) => toast.error(response.data.message))
      .finally(() => setLoader(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg mx-auto"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
        დაუწერე რეიტინგი
      </h2>

      {/* Star Rating Section */}
      <div className="flex items-center justify-center gap-2 mb-5">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            onMouseEnter={() =>
              setUserRating((prev) => ({ ...prev, hoveredRating: index + 1 }))
            }
            onMouseLeave={() =>
              setUserRating((prev) => ({ ...prev, hoveredRating: 0 }))
            }
            onClick={() =>
              setUserRating((prev) => ({ ...prev, rating: index + 1 }))
            }
            className={`w-10 h-10 cursor-pointer transition-transform duration-200 ${
              index < (userRating.hoveredRating || userRating.rating)
                ? "text-yellow-400 scale-110"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.429 8.215 1.192-5.945 5.775 1.403 8.184-7.341-3.857-7.342 3.857 1.404-8.184-5.945-5.775 8.215-1.192z" />
          </svg>
        ))}
      </div>

      {/* Comment Box */}
      <div className="mb-5">
        <textarea
          value={userRating.comment}
          onChange={(e) =>
            setUserRating((prev) => ({ ...prev, comment: e.target.value }))
          }
          placeholder="დატოვეთ კომენტარი..."
          className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
        შენახვა
      </button>
    </form>
  );
}

export default WriteComment;
