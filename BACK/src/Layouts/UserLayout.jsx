import { ToastContainer, toast } from 'react-toastify';

import { Outlet, useLocation } from "react-router-dom"
import Header from "../Components/Header"
import Loader from "../Components/Loader"
import { useStateContext } from "../Contexts/ContextProvider"
import { useEffect } from "react";
import Footer from "../Components/Footer";
import CommentReportModal from "../Components/CommentReportModal";
import ConfirmModal from "../Components/ConfirmModal";

function UserLayout() {
    const {loader, modal, confirmModal} = useStateContext();

    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    
    return (
        <div className="min-h-screen flex flex-col">
            {loader && <Loader />}

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />

            {modal.isOpen && modal.type === 'reportRating' && <CommentReportModal />}
            {confirmModal.isOpen && confirmModal.type === 'changeStatus' && <ConfirmModal />}
            

            <div className="flex-grow">
                <Header />
                <div className="mt-24">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserLayout
