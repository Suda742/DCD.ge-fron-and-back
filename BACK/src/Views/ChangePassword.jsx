import { Link } from "react-router-dom";
import Authenticated from "../Contexts/Authenticated";

function ChangePassword() {
  return (
    <Authenticated>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-xl">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">პაროლის შეცვლა</h2>

          {/* Form */}
          <form className="space-y-6">
            {/* Old Password */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">ძველი პაროლი</label>
              <input
                type="password"
                className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="შეიყვანეთ ძველი პაროლი"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">ახალი პაროლი</label>
              <input
                type="password"
                className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="შეიყვანეთ ახალი პაროლი"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">გაიმეორე ახალი პაროლი</label>
              <input
                type="password"
                className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="გაიმეორეთ ახალი პაროლი"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
              >
                შენახვა
              </button>
            </div>
          </form>
        </div>
      </div>
    </Authenticated>
  );
}

export default ChangePassword;
