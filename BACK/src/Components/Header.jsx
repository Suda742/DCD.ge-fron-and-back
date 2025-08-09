import { Link, useNavigate } from "react-router-dom";
import Logo from './../../public/images/logo/logo2.webp';
import { HiBars3 } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { useStateContext } from "../Contexts/ContextProvider";
import axiosClient from "../axios-client";
import { HiOutlineHome } from "react-icons/hi";
import { FaBook } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import DesktopNotifications from "./DesktopNotifications";
import MobileNotifications from "./MobileNotifications";

function Header() {
    const { token, removeToken, setLoader, authUser, getAuthUser, authConnects, updateConnect, getAuthConnect } = useStateContext();
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const navigate = useNavigate();


    const unreadCount = (authConnects || []).filter(connect =>
        (authUser?.id == connect?.receiver_id && Number(connect.receiver_seen) === 0) ||
        (authUser?.id == connect?.sender_id && Number(connect.sender_seen) === 0)
    ).length;


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isNotificationOpen && !event.target.closest('.notification-container')) {
                setIsNotificationOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationOpen]);

    // Get auth user
    useEffect(() => {
        getAuthUser();
        getAuthConnect();
    }, []);

    // Toggle notifications dropdown
    const toggleNotifications = (e) => {
        e.preventDefault();
        setIsNotificationOpen(!isNotificationOpen);
    };

    const logoutForm = (e) => {
        e.preventDefault();
        setIsBarOpen(false);
        setLoader(true);
        axiosClient.post('/logout')
            .then(() => {
                removeToken();
                navigate('/');
                window.location.reload();
            })
            .finally(() => setLoader(false));
    };

    const handleClickSectionButton = (sectionName, offset = 0) => {
        if (window.location.pathname === "/") {
            const sectionElement = document.getElementById(sectionName);
            if (sectionElement) {
                const topPosition = sectionElement.getBoundingClientRect().top + window.scrollY + offset;
                window.scrollTo({ top: topPosition, behavior: "smooth" });
            }
            window.history.replaceState(null, "", `/#${sectionName}`);
        } else {
            navigate("/", { state: { scrollTo: sectionName, offset } });
        }
    };

    function handleSeenNotification(connect, column, seen_value) {
        updateConnect(connect.id, {column, seen_value});
        setIsNotificationOpen(false)
        navigate(`/user/details/${authUser?.id === connect?.receiver_id ? connect.sender.id : connect.receiver.id}`);
    }

    return (
        <div className="relative" id="dashboard">
            <div className="w-full bg-white z-10 fixed top-0 left-0 shadow-lg">
                <div className="w-[90%] mx-auto flex justify-between p-2">
                    {/* Desktop left nav */}
                    <div className="hidden lg:flex w-[25vw] justify-around items-center font-sans text-gray-700">
                        {authUser?.type === 2 ? (
                            <Link to='/reports' className="hover:text-blue-600 transition-colors duration-200 font-medium">
                                რეპორტები
                            </Link>
                        ) : (
                            <>
                                <button 
                                    onClick={() => handleClickSectionButton('about', -200)}
                                    className="hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    ჩვენს შესახებ
                                </button>
                                <button 
                                    onClick={() => handleClickSectionButton('how-it-works', -200)}
                                    className="hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    როგორ მუშაობს
                                </button>
                                <Link 
                                    to='/contact'
                                    className="hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    კონტაქტი
                                </Link>
                                <button 
                                    onClick={() => handleClickSectionButton('pricing', -200)}
                                    className="hover:text-blue-600 transition-colors duration-200 font-medium"
                                >
                                    ფასები
                                </button>
                            </>
                        )}
                    </div>
                    {/* Logo */}
                    <Link to='/' className="w-20 transform hover:scale-105 transition-transform duration-200">
                        <img src={Logo} alt="Logo" className="drop-shadow-md" />
                    </Link>
                    {/* Desktop right nav */}
                    <div className="hidden lg:flex w-[25vw] justify-end gap-6 items-center font-semibold">
                        {!token ? (
                            <>
                                <Link 
                                    to='/login' 
                                    className="bg-[#1594D3] px-6 py-2 rounded-full text-white hover:bg-[#127bb0] 
                                    transition-all duration-200 hover:shadow-lg"
                                >
                                    შესვლა
                                </Link>
                                <Link 
                                    to='/register' 
                                    className="bg-[#0c4c83] px-6 py-2 rounded-full text-white hover:bg-[#093a66] 
                                    transition-all duration-200 hover:shadow-lg"
                                >
                                    რეგისტრაცია
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* Add notification bell */}
                                <DesktopNotifications isOpen={isNotificationOpen} setIsOpen={setIsNotificationOpen} />

                                <Link 
                                    to={`/filter/users?type=${authUser?.type === 1 ? 0 : 1}`} 
                                    className="bg-[#00C49A] px-6 py-2 rounded-full text-white hover:bg-[#257261] 
                                    transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    დეშბორდი
                                </Link>
                                <Link 
                                    to='/profile' 
                                    className="bg-[#1594D3] px-6 py-2 rounded-full text-white hover:bg-[#127bb0] 
                                    transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    პროფილი
                                </Link>
                                <form onSubmit={logoutForm}>
                                    <button 
                                        className="bg-[#0c4c83] px-6 py-2 rounded-full text-white hover:bg-[#093a66] 
                                        transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        გასვლა
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                    {/* --- MOBILE HEADER ICONS --- */}
                    <div className="flex lg:hidden items-center gap-2">
                        {/* Notifications bell for mobile header */}
                        {token && (
                            <MobileNotifications isOpen={isNotificationOpen} setIsOpen={setIsNotificationOpen} />
                        )}
                        {/* Burger menu */}
                        <div 
                            className="text-3xl p-5 text-gray-600 hover:text-blue-600 cursor-pointer 
                            transition-colors duration-200" 
                            onClick={() => setIsBarOpen(is => !is)}
                        >
                            <HiBars3 />
                        </div>
                    </div>
                    {/* --- END MOBILE HEADER ICONS --- */}
                    <div
                        className={`fixed top-[90px] right-0 h-[calc(100%-60px)] bg-gradient-to-b from-stone-200 
                        to-stone-300 w-full z-20 transform ${isBarOpen ? "translate-x-0" : "translate-x-full"} 
                        transition-transform duration-300 ease-in-out shadow-xl`}
                    >
                        <div className="w-[90vw] mx-auto mt-10">
                            <div className="flex justify-around gap-4">
                                {!token && (
                                    <>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsBarOpen(false)}
                                            className="bg-[#1594D3] px-6 py-2 rounded-full text-white hover:bg-[#127bb0] 
                                            transition-all duration-200 shadow-md w-full text-center"
                                        >
                                            შესვლა
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsBarOpen(false)}
                                            className="bg-[#0c4c83] px-6 py-2 rounded-full text-white hover:bg-[#093a66] 
                                            transition-all duration-200 shadow-md w-full text-center"
                                        >
                                            რეგისტრაცია
                                        </Link>
                                    </>
                                )}
                            </div>

                                
                            {(!authUser || authUser?.type !== 2) ? (
                               <div className="mt-20 flex flex-col justify-center items-center gap-6 text-gray-700">
                               <button
                                   onClick={() => {
                                       handleClickSectionButton("dashboard");
                                       setIsBarOpen(false);
                                   }}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   მთავარი
                               </button>
                               <button
                                   onClick={() => {
                                       handleClickSectionButton("about", -150);
                                       setIsBarOpen(false);
                                   }}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   ჩვენს შესახებ
                               </button>
                               <button
                                   onClick={() => {
                                       handleClickSectionButton("how-it-works", -150);
                                       setIsBarOpen(false);
                                   }}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   როგორ მუშაობს
                               </button>
                               <Link 
                                   to="/contact" 
                                   onClick={() => setIsBarOpen(false)}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   კონტაქტი
                               </Link>
                               <button
                                   onClick={() => {
                                       handleClickSectionButton("pricing", -150);
                                       setIsBarOpen(false);
                                   }}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   ფასები
                               </button>
                           </div> 
                            ) : (
                                <div className="mt-20 flex flex-col justify-center items-center gap-6 text-gray-700">
                                <Link 
                                   to="/reports" 
                                   onClick={() => setIsBarOpen(false)}
                                   className="hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                               >
                                   რეპორტები
                               </Link>
                                </div>
                            )}
                            

                            

                            {token && (
                                <form onSubmit={logoutForm} className="flex justify-center items-center mt-20">
                                    <button 
                                        className="bg-[#0c4c83] px-8 py-3 rounded-full text-white hover:bg-[#093a66] 
                                        transition-all duration-200 shadow-md hover:shadow-lg text-lg"
                                    >
                                        გასვლა
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Remove notifications icon from mobile bottom bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full z-20">
                <div className="flex justify-around items-center gap-2 p-5 bg-gradient-to-t from-stone-100 
                to-stone-200 rounded-t-xl shadow-lg">
                    <div className="w-[25%]">
                        <Link 
                            to='/' 
                            className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600 
                            transition-colors duration-200"
                        >
                            <div className="text-3xl transform hover:scale-110 transition-transform duration-200">
                                <HiOutlineHome />
                            </div>
                            <div className="text-sm font-medium">მთავარი</div>
                        </Link>
                    </div>
                    <div className="w-[25%]">
                        <Link 
                            to='/contact' 
                            className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600 
                            transition-colors duration-200"
                        >
                            <div className="text-2xl transform hover:scale-110 transition-transform duration-200">
                                <FaBook />
                            </div>
                            <div className="text-sm font-medium">კონტაქტი</div>
                        </Link>
                    </div>
                    <div className="w-[25%]">
                        {!token ? (
                            <Link 
                                to='/login' 
                                onClick={() => setIsBarOpen(false)} 
                                className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600 
                                transition-colors duration-200"
                            >
                                <div className="text-2xl transform hover:scale-110 transition-transform duration-200">
                                    <FaRegUserCircle />
                                </div>
                                <div className="text-sm font-medium">შესვლა</div>
                            </Link>
                        ) : (
                            <Link 
                                to='/profile' 
                                className="flex flex-col items-center gap-2 text-gray-600 hover:text-blue-600 
                                transition-colors duration-200"
                            >
                                <div className="text-2xl transform hover:scale-110 transition-transform duration-200">
                                    <FaRegUserCircle />
                                </div>
                                <div className="text-sm font-medium">პროფილი</div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;