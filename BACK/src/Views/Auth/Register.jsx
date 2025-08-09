import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../Contexts/ContextProvider";
import tc from './../../../public/files/terms.pdf';
import pp from './../../../public/files/privacy.pdf';
import { toast } from "react-toastify";

function Register() {
    const { token, setToken, setLoader, setAuthUser } = useStateContext();
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [errors, setErrors] = useState({});

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const [userType, setUserType] = useState(null);
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [checkedPolicy, setCheckedPolicy] = useState(false);

    if (token) return <Navigate to='/profile' />;

    function submitRegister(e) {
        e.preventDefault();
        setLoader(true);
        setErrors({});

        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            type: userType,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };

        axiosClient.post('register', data)
            .then(({ data }) => {
                setAuthUser(data.user);
                setToken(data.token);
                firstNameRef.current.value = '';
                lastNameRef.current.value = '';
                phoneRef.current.value = '';
                emailRef.current.value = '';
                setUserType(null);
                passwordRef.current.value = '';
                confirmPasswordRef.current.value = '';
            })
            .catch(({ response }) => {
                setErrors(response.data.errors);
                toast.error(response.data.message);
            })
            .finally(() => {
                setLoader(false);
            });
    }

    return (
        <div className="w-[80vw] lg:w-[50vw] xl:w-[30vw] mx-auto mt-28 lg:mt-40 pb-10">
            <form 
                onSubmit={submitRegister} 
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
            >
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
                    შექმენი ანგარიში
                </h1>

                <div className="flex flex-col gap-6">
                    <div className="flex gap-4 w-full">
                        <div className="flex flex-col w-1/2 gap-2">
                            <label htmlFor="firstName" className="text-sm text-gray-600 ml-2 font-medium">
                                სახელი
                            </label>
                            <input
                                ref={firstNameRef}
                                type="text"
                                id="firstName"
                                placeholder="სახელი"
                                className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                                focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                            />
                            {errors?.first_name && (
                                <span className="text-red-500 text-xs mt-1 ml-2">{errors.first_name}</span>
                            )}
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
                            <label className="text-sm text-gray-600 ml-2 font-medium">
                                გვარი
                            </label>
                            <input
                                ref={lastNameRef}
                                type="text"
                                placeholder="გვარი"
                                className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                                focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                            />
                            {errors?.last_name && (
                                <span className="text-red-500 text-xs mt-1 ml-2">{errors.last_name}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 ml-2 font-medium">
                            ტელეფონის ნომერი
                        </label>
                        <input
                            ref={phoneRef}
                            type="text"
                            placeholder="+1 | +995"
                            className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                            focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                        />
                        {errors?.phone && (
                            <span className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</span>
                        )}
                    </div>

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
                        {errors?.email && (
                            <span className="text-red-500 text-xs mt-1 ml-2">{errors.email}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm text-gray-600 ml-2 font-medium">ვმუშაობ როგორც</span>
                        <div className="flex gap-6 ml-2">
                            <div 
                                onClick={() => setUserType(0)} 
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    checked={userType === 0}
                                    type="radio"
                                    id="driver"
                                    name="user_type"
                                    className="h-4 w-4 text-[#1594D3] focus:ring-[#1594D3]"
                                />
                                <label htmlFor="driver" className="text-gray-700 cursor-pointer">
                                    მძღოლი
                                </label>
                            </div>
                            <div 
                                onClick={() => setUserType(1)} 
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <input
                                    checked={userType === 1}
                                    type="radio"
                                    id="dispecher"
                                    name="user_type"
                                    className="h-4 w-4 text-[#1594D3] focus:ring-[#1594D3]"
                                />
                                <label htmlFor="dispecher" className="text-gray-700 cursor-pointer">
                                    დისპეტჩერი
                                </label>
                            </div>
                        </div>
                        {errors?.type && (
                            <span className="text-red-500 text-xs mt-1 ml-2">{errors.type}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 ml-2 font-medium">
                            პაროლი
                        </label>
                        <div className="relative">
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
                        {errors?.password && (
                            <span className="text-red-500 text-xs mt-1 ml-2">{errors.password}</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-gray-600 ml-2 font-medium">
                            გაიმეორეთ პაროლი
                        </label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            placeholder="გაიმეორეთ პაროლი"
                            className="p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none 
                            focus:ring-2 focus:ring-blue-200 focus:border-[#1594D3] transition-all duration-200"
                        />
                        {errors?.password_confirmation && (
                            <span className="text-red-500 text-xs mt-1 ml-2">{errors.password_confirmation}</span>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <div className="text-sm text-gray-500 text-left flex gap-2 items-center">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox" 
                                id="policy-checkbox"
                                checked={checkedPolicy} 
                                onChange={() => setCheckedPolicy(prev => !prev)}
                                className="appearance-none h-5 w-5 border border-gray-300 rounded bg-white 
                                checked:bg-[#1594D3] checked:border-0 transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer"
                            />
                            <svg 
                                className={`absolute left-0.5 top-0.5 h-4 w-4 text-white pointer-events-none ${checkedPolicy ? 'opacity-100' : 'opacity-0'}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                        <label htmlFor="policy-checkbox" className="cursor-pointer">
                            <a 
                                href={pp} 
                                target="_blank" 
                                className="text-[#1594D3] hover:text-[#127bb0] underline transition-colors duration-200"
                            >
                                კონფიდენციალურობის პოლიტიკა
                            </a>
                        </label>
                        <span>და</span>
                        <label htmlFor="policy-checkbox" className="cursor-pointer">
                            <a 
                                href={tc} 
                                target="_blank" 
                                className="text-[#1594D3] hover:text-[#127bb0] underline transition-colors duration-200"
                            >
                                წესები და პირობები
                            </a>
                        </label>
                        </div>
                        
                    </div>
                    <button
                        className={`w-full ${checkedPolicy ? 'bg-[#1594D3] hover:bg-[#127bb0] transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5' : 'bg-[#95d4f3]'}  text-white p-3 rounded-lg font-medium`}
                        disabled={!checkedPolicy}
                    >
                        რეგისტრაცია
                    </button>
                </div>
            </form>

            <div className="text-center mt-4 text-sm text-gray-600">
                ხარ დარეგისტრირებული?{" "}
                <Link
                    to="/login"
                    className="text-[#1594D3] hover:text-[#127bb0] font-medium transition-colors duration-200"
                >
                    შესვლა
                </Link>
            </div>
        </div>
    );
}

export default Register;