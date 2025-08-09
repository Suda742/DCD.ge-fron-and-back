import { Link } from "react-router-dom";
import DefaultAvatar from "./DefaultAvatar";
import { useStateContext } from "../Contexts/ContextProvider";
import { useEffect } from "react";

function UserCardItem({ data, showPosition }) {
  const {authUser, getAuthConnect, authConnects, sendConnectRequest, updateConnect, getAuthConnectedData} = useStateContext();

  const dataConnect = authUser?.connections?.find(connect => (authUser?.type === 0 ? connect?.dispatcher_id === data?.id : connect?.driver_id === data?.id) && (connect?.status !== 0 && connect?.status !== 4)) || null;

  const {shouldShowConnectFunction} = getAuthConnectedData(data?.id);

  useEffect(() => {
    if (!authConnects) {
      getAuthConnect();
    }
  }, []);
  
  return (
    <div className="py-6 px-2 flex flex-col gap-5 rounded-xl w-full sm:w-[calc(100%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(35%-40px)] bg-white shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-center">
        {data.avatar ? (
          <img
            src={`${import.meta.env.VITE_API_FILE_URL}/${data.avatar}`}
            className="w-40 h-40 rounded-full object-cover shadow-lg border-2 border-gray-100"
            alt={`${data.first_name} ${data.last_name}`}
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center">
            <DefaultAvatar data={data} />
          </div>
        )}
      </div>

      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">
          {data.first_name} {data.last_name}
        </h3>
        {showPosition && (
          <div className="text-[#1594D3] font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
            {data.type === 0 ? "მძღოლი" : "დისპეტჩერი"}
          </div>
        )}
        <div className="space-y-2">
          <div className="flex justify-center items-center gap-2">
            <span className="text-gray-600 text-sm">ნომერი:</span>
            <a
              href={`tel:${data.phone}`}
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              {data.phone}
            </a>
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-gray-600 text-sm">WhatsApp:</span>
            <a
              href={`https://wa.me/${data.whatsapp}`}
              className="font-bold text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              {data.whatsapp}
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 bg-gray-50 py-2 rounded-lg">
        <span className="text-gray-600 text-sm">რეიტინგი:</span>
        <div className="flex items-center gap-1">
          <span className="font-bold text-gray-800">{data.totalRating}</span>
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .587l3.668 7.429 8.215 1.192-5.945 5.775 1.403 8.184-7.341-3.857-7.342 3.857 1.404-8.184-5.945-5.775 8.215-1.192z" />
          </svg>
        </div>
      </div>

      <div className="flex justify-center gap-2 w-full">
        <Link
          to={`/user/details/${data.id}`}
          className="w-1/2 flex items-center justify-center border border-[#1594D3] bg-white text-[#1594D3] text-center py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
        >
          დეტალები
        </Link>

        {/* Only render connect button if authConnects is loaded */}
        {authUser && data?.type !== authUser.type && shouldShowConnectFunction && (
          <button
            onClick={() => {
              // Check if already connected (status 2) - do nothing
              if ((dataConnect && dataConnect.status === 2) || (dataConnect && dataConnect.status === 3)) {
                return; // Already connected, do nothing
              }
              // Check for received request needing confirmation
              else if (dataConnect && Number(dataConnect.status) === 1 && dataConnect.sender_id !== authUser.id) {
                updateConnect(dataConnect.id, {status: 2});
              } 
              // Check if we can send a new request
              else if (
                !dataConnect || 
                (dataConnect && (dataConnect.status === 0 || dataConnect.status === 4))
              ) {
                if (!dataConnect || dataConnect.status !== 1) {
                  sendConnectRequest(data.id);
                }
              }
            }}
            className={
              `w-1/2 flex items-center justify-center gap-2 text-white text-center py-2.5 px-4 rounded-lg font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
              ${
                // Condition for blue button (actionable states) - exclude status 2 (connected)
                (!dataConnect || 
                (dataConnect && (dataConnect.status === 1 || dataConnect.status === 0 || dataConnect.status === 4)))
                && !(dataConnect && dataConnect.status === 1 && dataConnect.sender_id === authUser.id) // Not a pending sent request
                && !((dataConnect && (dataConnect.status === 2 || dataConnect.status === 3)))
                ? 'bg-gradient-to-r cursor-pointer from-[#1594D3] to-[#0c4c83] hover:shadow-xl hover:from-[#127bb0] hover:to-[#0c4c83] focus:ring-[#1594D3]'
                : 'bg-gray-400 hover:bg-gray-500 focus:ring-gray-400' 
              }`
            }
          >
            {/* <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2M12 15V3m0 0l-4 4m4-4l4 4" />
            </svg> */}
            <span className="text-sm">
              {(() => {
                if (dataConnect && (dataConnect.status === 2 || dataConnect.status === 3)) {
                  return 'დაქონექთებულია';
                }
                if (dataConnect && Number(dataConnect.status) === 1 && dataConnect.sender_id !== authUser.id) {
                  return 'დადასტურება';
                }
                if (dataConnect && Number(dataConnect.status) === 1 && dataConnect.sender_id === authUser.id) {
                  return 'გაგზავნილია';
                }
                return 'დაქონექთება';
              })()}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default UserCardItem;