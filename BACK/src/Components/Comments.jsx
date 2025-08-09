import { TbSpeakerphone } from "react-icons/tb";
import { useStateContext } from "../Contexts/ContextProvider";
import { IoMdTime } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

function Comments({ ratings }) {
    const { authUser, setModal, setConfirmModal } = useStateContext();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ratings?.map(rating => (
                <div
                    key={rating.id}
                    className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg"
                >
                    {/* Header with Rating and Actions */}
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-6 h-6 ${index < rating.score ? "text-yellow-400" : "text-gray-300"}`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 .587l3.668 7.429 8.215 1.192-5.945 5.775 1.403 8.184-7.341-3.857-7.342 3.857 1.404-8.184-5.945-5.775 8.215-1.192z" />
                                </svg>
                            ))}
                        </div>
                        <div className="relative flex items-center gap-2">
                            {rating.userTo?.id === authUser.id && (
                                <>
                                    {rating?.report_rating && rating?.report_rating?.status === 1 ? (
                                        <button
                                            className="text-2xl bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-all duration-200"
                                            title="მიმდინარე გასაჩივრება"
                                        >
                                            <IoMdTime />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setModal(prev => ({ ...prev, isOpen: true, type: 'reportRating', id: rating.id }))}
                                            className="text-2xl bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                                            title="გასაჩივრება"
                                        >
                                            <TbSpeakerphone />
                                        </button>
                                    )}
                                </>
                            )}
                            {rating.userFrom?.id === authUser.id && (
                                <button
                                    onClick={() => setConfirmModal(prev => ({
                                        ...prev,
                                        isOpen: true,
                                        type: 'changeStatus',
                                        method: 'delete',
                                        text: 'ნამდვილად გსურთ კომენტარის წაშლა?',
                                        value: { id: rating?.id }
                                    }))}
                                    className="text-xl bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                                    title="წაშლა"
                                >
                                    <FaRegTrashCan />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center">
                        <span className="text-xl font-semibold text-gray-800">
                            {rating.userFrom.first_name} {rating.userFrom.last_name}
                        </span>
                    </div>

                    {/* Comment Text */}
                    <div className="text-gray-700 bg-gray-50 p-3 rounded-lg shadow-inner break-words">
                        {rating.comment}
                    </div>
                </div>
            ))}
            {ratings?.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    კომენტარები არ არის
                </div>
            )}
        </div>
    );
}

export default Comments;