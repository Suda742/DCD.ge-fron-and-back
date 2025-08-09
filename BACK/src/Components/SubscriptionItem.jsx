import { Link, redirect, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";

function SubscriptionItem({ data }) {
  const { token, features, setLoader, authUser } = useStateContext();
  const navigate = useNavigate();
  const hasPayed = authUser?.subscriptions?.length > 0 && authUser.subscriptions[authUser.subscriptions.length - 1].status === 2;
 

function handleGetCheckoutUrl() {
  if (!token) return navigate("/login");
  setLoader(true);

  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((location) => {
      return axiosClient.post("/checkout/url", {
        subscription_id: data.id,
        currency: location?.currency !== "GEL" ? "USD" : "GEL",
      });
    })
    .then((response) => {
      window.location.href = response?.data?.response?.checkout_url;
    })
    .catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoader(false);
    });
}

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl p-6 sm:p-8 text-center flex flex-col gap-6 sm:gap-8 w-full min-w-[280px] sm:max-w-sm md:max-w-md border border-gray-200 hover:border-gray-300 transform hover:-translate-y-2">
      {/* Plan Name */}
      <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-700 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
        {data.name}
      </div>

      {/* Feature List */}
      <div className="flex flex-col gap-3 sm:gap-4 text-left">
        {features?.map((feature, i) => {
          const isIncluded = data?.features?.some((f) => f?.id === feature?.id);
          return (
            <div
              key={feature?.id}
              className={`flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg transition-colors duration-200 ${
                isIncluded
                  ? "text-gray-800 bg-gray-50 hover:bg-gray-100"
                  : "text-gray-400 bg-gray-50/50"
              }`}
            >
              <span
                className={`font-bold text-lg sm:text-xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full ${
                  isIncluded
                    ? "text-white bg-green-500"
                    : "text-gray-400 bg-gray-200"
                }`}
              >
                {isIncluded ? "✓" : "✗"}
              </span>
              <span className={`font-medium text-sm sm:text-base md:text-gray-700 ${isIncluded ? '' : 'line-through'} hover:no-underline`}>
                {feature?.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Price */}
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-[#1594D3] to-[#0c4c83] bg-clip-text">
        ${data.price / 100}
      </div>

      {/* Purchase Button */}
    <button
      onClick={!hasPayed && handleGetCheckoutUrl}
      className={
        !hasPayed
          ? "bg-gradient-to-r from-[#1594D3] to-[#0c4c83] hover:from-[#0c4c83] hover:to-[#1594D3] text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          : "bg-gradient-to-r from-gray-400 to-gray-600 text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-lg cursor-not-allowed opacity-70"
      }
      disabled={hasPayed}
    >
      {!hasPayed ? "ყიდვა" : "უკვე გაქვთ"}
    </button>
    </div>
  );
}

export default SubscriptionItem;