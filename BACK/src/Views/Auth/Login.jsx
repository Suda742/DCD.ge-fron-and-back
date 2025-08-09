import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../Contexts/ContextProvider";
import { toast } from "react-toastify";

function Login() {
    const { token, setToken, setLoader, setAuthUser } = useStateContext();
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [errors, setErrors] = useState({});

    const emailRef = useRef();
    const passwordRef = useRef();

    if (token) return <Navigate to="/" />;

    function submitLogin(e) {
        e.preventDefault();
        setErrors({});
        setLoader(true);
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", data)
            .then(({ data }) => {
                setAuthUser(data.user);
                setToken(data.token);
                emailRef.current.value = "";
                passwordRef.current.value = "";
            })
            .catch(({ response }) => {
                setErrors(response.data.errors ? response.data.errors : response.data);
                toast.error(response.data.message);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    return (
        <div className="w-[80vw] lg:w-[40vw] xl:w-[25vw] mx-auto mt-28 lg:mt-40 pb-10">
            <form 
                onSubmit={submitLogin} 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
                <h1 className="text-2xl sm:text-3xl text-center font-semibold text-gray-800 mb-6">
                    ავტორიზაცია
                </h1>
                
                <div className="flex flex-col gap-6">
                    {errors.error && (
                        <span className="text-center text-red-500 bg-red-50 py-2 rounded-md text-sm">
                            {errors.error}
                        </span>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 ml-2 font-medium">
                            ელ. ფოსტა
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="ელ. ფოსტა"
                            className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                            focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1 ml-2">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 ml-2 font-medium">
                            პაროლი
                        </label>
                        <div className="relative mt-2">
                            <input
                                ref={passwordRef}
                                type={isPasswordHidden ? "password" : "text"}
                                placeholder="პაროლი"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                                focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200 pr-12"
                            />
                            <div
                                onClick={() => setIsPasswordHidden(is => !is)}
                                className="absolute right-0 top-0 h-full flex items-center justify-center 
                                text-gray-500 hover:text-[#1594D3] cursor-pointer p-3 transition-colors duration-200"
                            >
                                {isPasswordHidden ? (
                                    <IoEyeOutline className="text-xl" />
                                ) : (
                                    <IoEyeOffOutline className="text-xl" />
                                )}
                            </div>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1 ml-2">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <button
                        className="w-full bg-[#1594D3] text-white p-3 mt-4 rounded-lg font-medium
                        hover:bg-[#127bb0] transition-all duration-200 shadow-md hover:shadow-lg 
                        transform hover:-translate-y-0.5"
                    >
                        შესვლა
                    </button>
                </div>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
                არ ხარ დარეგისტრირებული?{" "}
                <Link
                    to="/register"
                    className="text-[#1594D3] hover:text-[#127bb0] font-medium 
                    transition-colors duration-200"
                >
                    რეგისტრაცია
                </Link>
            </div>
        </div>
    );
}

export default Login;