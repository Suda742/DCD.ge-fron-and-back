import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { useEffect, useState } from "react";
import DefaultAvatar from "../Components/DefaultAvatar";
import WriteComment from "../Components/WriteComment";
import Comments from "../Components/Comments";
import Authenticated from "../Contexts/Authenticated";
import axiosClient from "../axios-client";

function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { authUser, userDetail, setLoader, getUserDetails, getAuthConnect, sendConnectRequest, updateConnect, userHasConnection, getAuthConnectedData } = useStateContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [connectionAction, setConnectionAction] = useState({
        type: null, // 'finish' or 'confirm'
        connectionId: null
    });

    const { shouldShowConnectFunction, authConnectedData } = getAuthConnectedData(id);

    authUser.id === +id && navigate('/profile');

    const authConnects = authUser?.connections?.find(connect => (authUser?.type === 0 ? connect?.dispatcher_id === +id : connect?.driver_id === +id) && (connect?.status !== 0 && connect?.status !== 4)) || null;

    useEffect(() => {
        getUserDetails(id);
        if (!authConnects) {
            getAuthConnect();
        }
    }, [id]);

    // Sample delete function (adjust according to your API)
    const handleDeleteComment = (commentId) => {
        setCommentToDelete(commentId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setLoader(true);
        axiosClient.delete(`/rating/delete/${commentToDelete}`)
            .then(() => {
                getUserDetails(id); // Refresh user details after deletion
                setShowDeleteModal(false);
                setCommentToDelete(null);
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            })
            .finally(() => setLoader(false));
    };

    const finishingConnection = () => {
        setShowCommentModal(true);
    }

    const handleConnectionAction = (type, connectionId) => {
        setConnectionAction({
            type,
            connectionId
        });
        setShowCommentModal(true);
    };

    const handleCommentSubmitted = () => {
        if (connectionAction.type && connectionAction.connectionId) {
            const newStatus = connectionAction.type === 'finish' ? 3 : 4;
            updateConnect(connectionAction.connectionId, {status: newStatus});
            setConnectionAction({
                type: null,
                connectionId: null
            });
        }
        setShowCommentModal(false);
    };

    return (
        <Authenticated>
            <div className="mt-28 mb-20">
                <div className="w-[90vw] max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* User Info Section */}
                        <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-2xl border border-gray-100 p-6 flex flex-col items-center gap-6">
                            <div className="w-64 h-64 mt-6">
                                {userDetail?.avatar ? (
                                    <img
                                        className="w-full h-full rounded-full object-cover shadow-md"
                                        src={`${import.meta.env.VITE_API_FILE_URL}/${userDetail?.avatar}`}
                                        alt={`${userDetail?.first_name} ${userDetail?.last_name}`}
                                    />
                                ) : (
                                    <DefaultAvatar data={userDetail} />
                                )}
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800 flex flex-wrap justify-center gap-2">
                                <span>{userDetail?.first_name}</span>
                                <span>{userDetail?.last_name}</span>
                            </h2>
                            <div className="text-lg text-gray-700 flex flex-col items-center gap-4 w-full">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">ტელეფონის ნომერი:</span>
                                    <span className="font-medium text-gray-800">{userDetail?.phone || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">WhatsApp:</span>
                                    <span className="font-medium text-gray-800">{userDetail?.whatsapp || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-600">რეიტინგი:</span>
                                    <span className="font-medium text-gray-800">{userDetail?.totalRating || "0"}</span>
                                    <svg
                                        className="w-6 h-6 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12 .587l3.668 7.429 8.215 1.192-5.945 5.775 1.403 8.184-7.341-3.857-7.342 3.857 1.404-8.184-5.945-5.775 8.215-1.192z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-full px-6">
                                <div className="text-lg text-gray-600 text-center">ჩემს შესახებ:</div>
                                <p className="mt-2 text-gray-800 font-medium bg-gray-50 p-4 rounded-lg shadow-inner h-36 overflow-auto break-words">
                                    {userDetail?.about || "ჯერ არ არის შევსებული"}
                                </p>
                            </div>

                            {/* Connection Management Section */}
                            {authUser && userDetail && authUser.id !== userDetail.id && authUser.type !== userDetail.type && shouldShowConnectFunction && (
                                <div className="w-full flex flex-col items-center gap-3 mt-2">
                                    <div className="text-lg font-medium text-gray-700 text-center mb-2">
                                        {authConnects?.length || !authConnects ? 'კავშირი' : 
                                         authConnects?.status === 0 || authConnects?.status === 4 ? 'კავშირი' :
                                         authConnects?.status === 1 ? (authConnects?.sender_id === authUser?.id ? 'მოთხოვნა გაგზავნილია' : 'გსურთ დაკავშირება?') :
                                         authConnects?.status === 2 ? 'დაკავშირებული' :
                                         authConnects?.status === 3 ? (authConnects?.finish_requester_id === authUser?.id ? 'მოთხოვნა კავშირის დასრულებაზე' : 'კავშირის დასრულების მოთხოვნა') : ''}
                                    </div>
                                    
                                    <div className="flex flex-wrap justify-center gap-3 w-full">
                                        {/* No connection or connection was reset/finished */}
                                        {(!authConnects || (authConnects && (authConnects?.status === 0 || authConnects?.status === 4))) && (
                                            <button 
                                                onClick={() => sendConnectRequest(id)}
                                                className="bg-gradient-to-r from-[#1594D3] to-[#0c4c83] text-white px-5 py-2.5 rounded-lg hover:from-[#127bb0] hover:to-[#0c4c83] transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14L21 3"></path>
                                                </svg>
                                                დაკავშირება
                                            </button>
                                        )}

                                        {/* Connection request sent or received */}
                                        {authConnects && authConnects?.status === 1 && (
                                            <>
                                                {authConnects?.sender_id === authUser?.id ? (
                                                    <button 
                                                        disabled
                                                        className="bg-gray-400 text-white px-5 py-2.5 rounded-lg cursor-not-allowed font-medium shadow-md flex items-center gap-2">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        მოთხოვნა გაგზავნილია
                                                    </button>
                                                ) : (
                                                    <div className="flex gap-3">
                                                        <button 
                                                            onClick={() => updateConnect(authConnects?.id, {status: 2})}
                                                            className="bg-green-500 text-white px-5 py-2.5 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                            </svg>
                                                            დადასტურება
                                                        </button>
                                                        <button 
                                                            onClick={() => updateConnect(authConnects?.id, {status: 0})}
                                                            className="bg-red-500 text-white px-5 py-2.5 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                            უარყოფა
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Connected status */}
                                        {authConnects && authConnects?.status === 2 && (
                                            <button 
                                                onClick={() => handleConnectionAction('finish', authConnects?.id)}
                                                className="bg-amber-500 text-white px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9l-7 7-7-7"></path>
                                                </svg>
                                                კავშირის დასრულება
                                            </button>
                                        )}

                                        {/* Connection finish requested */}
                                        {authConnects && authConnects?.status === 3 && (
                                            <>
                                                {authConnects?.finish_requester_id === authUser?.id ? (
                                                    <button 
                                                        disabled
                                                        className="bg-gray-400 text-white px-5 py-2.5 rounded-lg cursor-not-allowed font-medium shadow-md flex items-center gap-2">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        დასრულების მოთხოვნა გაგზავნილია
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleConnectionAction('confirm', authConnects?.id)}
                                                        className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center gap-2">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                        დაადასტურეთ დასრულება
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Comments Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white shadow-lg rounded-2xl border border-gray-100 p-6 h-full flex flex-col gap-6">
                                {Object.keys(userDetail).length > 0 ? (
                                    <>
                                        {/* {authUser?.id !== userDetail?.id ? (
                                            <div className="w-full">
                                            </div>
                                            ) : ( */}
                                            {/* <WriteComment userId={id} /> */}
                                            <h3 className="text-2xl font-semibold text-gray-800 text-center">
                                                კომენტარები
                                            </h3>
                                        {/* )} */}
                                        <div className="overflow-auto max-h-[calc(100vh-300px)]">
                                            <Comments 
                                                ratings={userDetail?.ratings} 
                                                onDelete={handleDeleteComment} // Pass delete handler to Comments
                                            />
                                        </div>
                                    </>
                                ) : (
                                    setLoader(true)
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {showCommentModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {connectionAction.type === 'finish' 
                                        ? 'დაწერეთ კომენტარი კავშირის დასრულებისთვის' 
                                        : 'დაწერეთ კომენტარი დასრულების დადასტურებისთვის'}
                                </h3>
                                <button 
                                    onClick={() => setShowCommentModal(false)} 
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="mt-2">
                                <WriteComment 
                                    userId={id} 
                                    onCommentSubmitted={handleCommentSubmitted} 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
                        <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                                კომენტარის წაშლა
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                დარწმუნებული ხართ, რომ გსურთ ამ კომენტარის წაშლა?
                            </p>
                            <div className="flex justify-between gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200 font-medium"
                                >
                                    გაუქმება
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
                                >
                                    წაშლა
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}

export default UserDetails;