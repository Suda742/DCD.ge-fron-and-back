import { Link, Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { useEffect } from "react";
import dashboardMainImage from './../../public/images/photo.webp';
import DriverDispecher from "../Components/DriverDispecher";
import Subscription from "./Subscription";
import About from "./About";
import HowWorks from "../Components/HowWorks";
import DashboadHeader from "../Components/DashboadHeader";

function Dashboard() {
    const { authUser, limitedDrivers, limitedDispatchers, getLimitedDrivers, getLimitedDispatchers, getAuthUser, subscriptions, getSubscriptions } = useStateContext();
    const location = useLocation();

    useEffect(() => {
        getAuthUser();
        getLimitedDrivers();
        getLimitedDispatchers();
        getSubscriptions();

        if (location.state?.scrollTo) {
            const section = document.getElementById(location.state.scrollTo);
            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    }, [location.state]);

    if (authUser && !authUser.verified) return <Navigate to="/email-verify" />;
    if (authUser && authUser.verified && authUser.type !== 2 && (authUser?.subscriptions?.length === 0 || (authUser?.subscriptions?.length && authUser.subscriptions[authUser.subscriptions.length - 1].status === 0))) return <Navigate to="/subscriptions" />;
    if (authUser && authUser.verified && authUser?.subscriptions && authUser?.subscriptions?.[authUser?.subscriptions?.length - 1]?.status === 1) return <Navigate to="/payment/status" />;

    return (
        <div className="mx-auto pb-20 mt-28 px-0 lg:px-8 font-sans">
            <div className="w-[95vw] md:w-full">

            <DashboadHeader />
            </div>
            <div className="container px-2 w-full mx-auto pb-20 lg:px-8 font-sans">
                {/* Drivers and Dispatchers Section */}
                <div className="mt-20 space-y-16">
                    {limitedDrivers.length > 0 && (
                        <DriverDispecher section="მძღოლი" datas={limitedDrivers} />
                    )}
                    {limitedDispatchers.length > 0 && (
                        <DriverDispecher section="დისპეტჩერი" datas={limitedDispatchers} />
                    )}
                </div>

                {/* About Section */}
                <div id="about" className="mt-24 bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-10 rounded-2xl shadow-xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-wide">
                        ჩვენს შესახებ
                    </h2>
                    <About />
                </div>

                {/* How It Works Section */}
                <div id="how-it-works" className="mt-24 bg-white py-20 px-4 sm:px-6 md:px-10 rounded-2xl shadow-xl">
                    <HowWorks />
                </div>

                {/* Pricing Section */}
                <div id="pricing" className="w-[95vw] md:w-full mt-24 bg-gradient-to-br from-gray-50 to-gray-100 py-16  rounded-2xl shadow-xl">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-wide">
                        ფასები
                    </h2>
                    <Subscription isClose={true} />
                </div>

                
            </div>
        </div>
    );
}

export default Dashboard;