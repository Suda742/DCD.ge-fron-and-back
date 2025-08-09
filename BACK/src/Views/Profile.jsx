import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { useEffect, useRef, useState } from "react";
import Authenticated from "../Contexts/Authenticated";
import axiosClient from "../axios-client";
import DefaultAvatar from "../Components/DefaultAvatar";
import Comments from "../Components/Comments";
import AvatarEditor from 'react-avatar-editor';
import CommentReportModal from "../Components/CommentReportModal";
import { toast } from "react-toastify";

function Profile() {
    const { authUser, setLoader, getAuthUser, modal } = useStateContext();
    const [errors, setErrors] = useState([]);
    const [isEditingAvatar, setIsEditingAvatar] = useState(false);
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [scale, setScale] = useState(1);

    const navigate = useNavigate();

    let initialData = {
        avatar: "",
        first_name: "",
        last_name: "",
        phone: "",
        whatsapp: "",
        email: "",
        about: "",
    };

    const [profileData, setProfileData] = useState(initialData);

    useEffect(() => {
        setProfileData({
            avatar: croppedImage || authUser.avatar || "",
            first_name: authUser.first_name || "",
            last_name: authUser.last_name || "",
            phone: authUser.phone || "",
            whatsapp: authUser.whatsapp || "",
            email: authUser.email || "",
            about: authUser.about || "",
            color: authUser.color,
        });
    }, [authUser]);

    function updateProfileForm(e) {
        e.preventDefault();
        setLoader(true);

        const formData = new FormData();
        formData.append('first_name', profileData.first_name);
        formData.append('last_name', profileData.last_name);
        formData.append('phone', profileData.phone);
        formData.append('whatsapp', profileData.whatsapp);
        formData.append('email', profileData.email);
        formData.append('about', profileData.about);
        formData.append('avatar', croppedImage || profileData.avatar);

        axiosClient.post(`update/user`, formData, {
            params: { "_method": 'PATCH' }
        })
            .then(() => {
                navigate('/');
                getAuthUser();
            })
            .catch(({ response }) => {
                setErrors(response.data.errors);
                toast.error(response.data.message);
            })
            .finally(() => setLoader(false));
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setIsEditingAvatar(true);
            e.target.value = '';
        }
    };

    const fileInputRef = useRef();
    const avatarEditorRef = useRef();

    function openAvatarFilePicker() {
        fileInputRef.current.click();
        setProfileData(prev => ({ ...prev, avatar: '' }));
    }

    const handleSaveCrop = () => {
        if (avatarEditorRef.current) {
            const canvas = avatarEditorRef.current.getImage();
            canvas.toBlob(blob => {
                const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
                setCroppedImage(file);
                setProfileData((prev) => ({ ...prev, avatar: file, updatedAvatar: true }));
                setIsEditingAvatar(false);
            });
        }
    };

    const handleScaleChange = (e) => {
        setScale(e.target.value);
    };

    return (
        <Authenticated>
            <div className="w-[90vw] max-w-7xl mx-auto mt-28 mb-20">
                {errors?.avatar && (
                    <div className="text-red-600 bg-red-50 p-3 rounded-lg text-center mb-6 shadow-sm">
                        {errors.avatar}
                    </div>
                )}
                <div className="flex flex-col lg:flex-row gap-10">
                    <form onSubmit={updateProfileForm} className="lg:w-1/2">
                        <div className="relative w-64 h-64 mx-auto lg:mt-10">
                            {profileData.avatar ? (
                                <img
                                    onClick={openAvatarFilePicker}
                                    className="w-full h-full rounded-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                                    src={profileData.updatedAvatar ? URL.createObjectURL(profileData.avatar) : `${import.meta.env.VITE_API_FILE_URL}/${profileData.avatar}`}
                                    alt="Profile Avatar"
                                />
                            ) : (
                                <DefaultAvatar data={profileData} openAvatarFilePicker={openAvatarFilePicker} />
                            )}
                            <input
                                ref={fileInputRef}
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageChange}
                                className="hidden"
                                type="file"
                                id="image"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium">სახელი</label>
                                <input
                                    type="text"
                                    value={profileData.first_name}
                                    onChange={e => setProfileData(prev => ({ ...prev, first_name: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium">გვარი</label>
                                <input
                                    type="text"
                                    value={profileData.last_name}
                                    onChange={e => setProfileData(prev => ({ ...prev, last_name: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium">ტელეფონის ნომერი</label>
                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium">WhatsApp</label>
                                <input
                                    type="text"
                                    value={profileData.whatsapp}
                                    onChange={e => setProfileData(prev => ({ ...prev, whatsapp: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-gray-700 font-medium">ელ.ფოსტა</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-gray-700 font-medium">ჩემს შესახებ</label>
                                <textarea
                                    value={profileData.about}
                                    onChange={e => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                    className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200 h-40 resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <Link
                                to='/change-password'
                                className="text-[#1594D3] hover:text-[#127bb0] underline transition-colors duration-200 font-medium"
                            >
                                პაროლის შეცვლა
                            </Link>
                            <button
                                type="submit"
                                className="bg-[#1594D3] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#127bb0] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                შენახვა
                            </button>
                        </div>
                    </form>

                    <div className="lg:w-1/2 mt-10 lg:mt-0">
                        <div className="bg-white shadow-lg rounded-2xl p-6 h-full border border-gray-100">
                            <div className="text-center text-2xl font-semibold text-gray-800 mb-4">
                                შენი კომენტარები
                            </div>
                            <div className="flex justify-center items-center gap-2 mb-6">
                                <span className="text-lg text-gray-700">რეიტინგი: {authUser.totalRating}</span>
                                <svg
                                    className="w-6 h-6 text-yellow-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 .587l3.668 7.429 8.215 1.192-5.945 5.775 1.403 8.184-7.341-3.857-7.342 3.857 1.404-8.184-5.945-5.775 8.215-1.192z" />
                                </svg>
                            </div>
                            <div className="overflow-auto max-h-[calc(100vh-300px)]">
                                <Comments ratings={authUser.ratings} />
                            </div>
                        </div>
                    </div>
                </div>

                {isEditingAvatar && (
                    <div className="fixed z-30 inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full">
                            <AvatarEditor
                                ref={avatarEditorRef}
                                image={image}
                                width={250}
                                height={250}
                                border={50}
                                scale={scale}
                                borderRadius={125}
                                rotate={0}
                                className="mx-auto"
                            />
                            <div className="mt-4">
                                <input
                                    id="scaleSlider"
                                    type="range"
                                    min="1"
                                    max="2.5"
                                    step="0.01"
                                    value={scale}
                                    onChange={handleScaleChange}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1594D3]"
                                />
                            </div>
                            <div className="mt-6 flex justify-between gap-4">
                                <button
                                    onClick={() => setIsEditingAvatar(false)}
                                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
                                >
                                    გაუქმება
                                </button>
                                <button
                                    onClick={handleSaveCrop}
                                    className="w-full bg-[#1594D3] text-white px-4 py-2 rounded-lg hover:bg-[#127bb0] transition-all duration-200 shadow-md"
                                >
                                    შენახვა
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Authenticated>
    );
}

export default Profile;