import { Link } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import dashboardMainImage from './../../public/images/photo.webp';

function DashboadHeader() {
    const { authUser } = useStateContext();

  return (
    <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 lg:mt-24 mt-12">
            <div className="w-full flex justify-center lg:hidden">
                <img src={dashboardMainImage} alt="dashboard image" className="rounded-xl w-full max-w-md" />
            </div>
            <div className="flex flex-col lg:w-1/2 w-full gap-8 text-center lg:text-left">
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                    გაიარე რეგისტრაცია და იპოვე შენთვის სასურველი {" "}
                    <div className="mt-3 inline-flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[#1594D3] font-semibold">დისპეტჩერი</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#0c4c83] font-semibold">მძღოლი</span>
                    </div>
                </h1>
                {authUser ? (
                    <button
                        onClick={() => {
                            const aboutSection = document.getElementById("about");
                            if (aboutSection) {
                                aboutSection.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }
                        }}
                        className="lg:w-1/2 mx-auto lg:mx-0 bg-gradient-to-r from-[#0c4c83] to-[#1594D3] hover:from-[#0a3a66] hover:to-[#117bb3] transition-all duration-300 text-white py-4 px-8 rounded-xl shadow-lg text-lg font-semibold"
                    >
                        ჩვენს შესახებ
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="lg:w-1/2 mx-auto lg:mx-0 bg-gradient-to-r from-[#0c4c83] to-[#1594D3] hover:from-[#0a3a66] hover:to-[#117bb3] transition-all duration-300 text-white py-4 px-8 rounded-xl shadow-lg text-lg font-semibold text-center"
                    >
                        შესვლა
                    </Link>
                )}
            </div>
            <div className="w-1/2 hidden lg:block">
                <img src={dashboardMainImage} alt="dashboard image" className="rounded-xl  w-full transform hover:scale-105 transition-transform duration-300" />
            </div>
        </div>
    </div>
  )
}

export default DashboadHeader
