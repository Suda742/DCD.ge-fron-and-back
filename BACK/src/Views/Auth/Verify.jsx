import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../Contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Verify() {
  const codeRef = useRef();
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { setLoader, authUser, getAuthUser } = useStateContext();

  if (!authUser || (authUser && authUser.verified)) return <Navigate to="/" />;
  
  function verifyForm(e) {
    e.preventDefault();
    setLoader(true);
    setError({});
    axiosClient
      .post('/email-verify', { verify_code: codeRef.current.value })
      .then(() => {
        navigate('/subscriptions');
        getAuthUser();
      })
      .catch(({ response }) => {
        setError(response.data.message);
        toast.error(response.data.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Verification</h2>

        {/* Error Message */}
        {Object.keys(error).length > 0 && (
          <div className="bg-red-500 p-4 text-white text-center rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={verifyForm}>
          <div className="flex flex-col gap-4">
            {/* Input Field */}
            <div>
              <label htmlFor="verifyInput" className="text-sm text-gray-700">Enter Verification Code</label>
              <input
                ref={codeRef}
                type="text"
                id="verifyInput"
                className="w-full bg-gray-100 p-3 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter code here"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 mt-4 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;
