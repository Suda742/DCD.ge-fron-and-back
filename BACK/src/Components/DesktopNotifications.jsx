import { Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { IoNotificationsOutline } from "react-icons/io5";

function DesktopNotifications({isOpen ,setIsOpen}) {
    const { authUser, updateConnect} = useStateContext();
    const navigate = useNavigate();

    const unreadCount = (authUser?.connections || []).filter(connect =>
        (authUser?.id == connect?.driver_id && Number(connect.driver_seen) === 0) ||
        (authUser?.id == connect?.dispatcher_id && Number(connect.dispatcher_seen) === 0)
    ).length;

    function handleSeenNotification(connect, column, seen_value) {
        updateConnect(connect.id, {column, seen_value});
        setIsOpen(false)
        navigate(`/user/details/${authUser?.id === connect?.driver_id ? connect.dispatcher_id : connect.driver_id}`);
    }

    const toggleNotifications = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const getFullName = (data) => {
        return `${data.first_name} ${data.last_name}`;
    }

    const getNotificationMessage = (connect) => {
        if (connect?.status === 0) {
            return connect?.sender_id === authUser?.id
                ? `ქონექთი უარყოფილია მომხმარებლისგან: ${getFullName(connect.dispatcher)}`
                : `თქვენ ${getFullName(connect.dispatcher)} -ს ქონექთი უარყავით`;
        }
        if (connect?.status === 1) {
            return connect?.sender_id === authUser?.id
                ? `თქვენ ქონექთი გააგზავნეთ ${getFullName(connect.dispatcher)} -სთვის`
                : `ქონექთი გამოგზავნილია მომხმარებლისგან: ${getFullName(connect.dispatcher)}`;
        }
        if (connect?.status === 2) {
            return connect?.sender_id === authUser?.id
                ? `დადასტურებული ქონექთი ${getFullName(connect.dispatcher)}-ს მიერ`
                : `თქვენ დაადასტურეთ ${getFullName(connect.dispatcher)} -ს ქონექთი`;
        }
        if (connect?.status === 3) {
            return connect?.finish_requester_id === authUser?.id
                ? `ქონექთის დასრულების მოთხოვნა გაგზავნილია ${getFullName(connect.driver)} -ს თვის`
                : `ქონექთის დასრულება მოთხოვნილია მომხმარებლისგან: ${getFullName(connect.driver)}`;
        }
        if (connect?.status === 4) {
            return `${connect.driver_id === authUser?.id ? getFullName(connect.dispatcher) : getFullName(connect.driver)} -ს ქონექთი დასრულებულია `;
        }
        return '';
    };


  return (
    <div className="relative notification-container">
        <button 
            onClick={toggleNotifications}
            className="text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200 relative"
        >
            <IoNotificationsOutline />
            {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </span>
            )}
        </button>
        
        {/* Notifications dropdown */}
        {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                <h3 className="text-lg font-medium px-4 py-2 border-b border-gray-100">შეტყობინებები</h3>
                <div className="max-h-80 overflow-y-auto">
                    {authUser?.connections && authUser?.connections.length > 0 ? (
                        authUser.connections.map(connect => (
                            <div
                                key={connect.id}
                                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                                    (authUser?.id === connect?.driver_id && Number(connect.driver_seen) == 0) ||
                                    (authUser?.id === connect?.dispatcher_id && Number(connect.dispatcher_seen) == 0) 
                                        ? 'bg-blue-50'
                                        : ''
                                }`}                                                       
                                >
                                <div className="flex justify-between">
                                        <button
                                        className="font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 w-full text-start"
                                        onClick={() => handleSeenNotification(connect, authUser?.type === 0 ? 'driver_seen' : 'dispatcher_seen', 1)}
                                    >
                                        {getNotificationMessage(connect)}
                                    </button> 
                                   
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                            შეტყობინებები არ არის
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default DesktopNotifications
