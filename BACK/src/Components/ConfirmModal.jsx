// ConfirmModal.jsx
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../Contexts/ContextProvider";

function ConfirmModal() {
  const {setConfirmModal, getAuthUser, confirmModal, changeReportStatus, fetchReports, deleteRating, getUserDetails} = useStateContext();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(confirmModal.method === 'update'){
      const data = {
        id: confirmModal?.value?.id,
        status: confirmModal?.value?.status,
      }
  
      changeReportStatus(data);
    } else if (confirmModal.method === 'delete'){
      deleteRating(confirmModal.value.id)
      getUserDetails(id)
    }


    handleCancelAction()
    getAuthUser();
    fetchReports();
    
  }

  function handleCancelAction() {
    setConfirmModal(prev => ({...prev, isOpen: false, type: '', text: '', method: '', value: {}}))
  }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    დადასტურება
                </h3>
                <p className="text-gray-600 text-center mb-6">
                    {confirmModal.text || "დარწმუნებული ხართ, რომ გსურთ ამ მოქმედების შესრულება?"}
                </p>
                <div className="flex justify-between gap-4">
                    <button
                        onClick={handleCancelAction}
                        className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                    >
                        გაუქმება
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium"
                    >
                        დადასტურება
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;