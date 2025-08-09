import { createBrowserRouter } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Dashboard from "./Views/Dashboard";
import About from "./Views/About";
import Contact from "./Views/Contact";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";
import Verify from "./Views/Auth/Verify";
import Profile from "./Views/Profile";
import ChangePassword from "./Views/ChangePassword";
import FilterUsers from "./Views/FilterUsers";
import UserDetails from "./Views/UserDetails";
import Reports from "./Views/Reports";
import Subscription from "./Views/Subscription";
import SubscriptionPayment from "./Views/SubscriptionPayment";
import Status from "./Views/payments/Status";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/filter/users',
                element: <FilterUsers />
            },
            {
                path: '/user/details/:id',
                element: <UserDetails />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/change-password',
                element: <ChangePassword />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/email-verify',
                element: <Verify />
            },
            
            {
                path: '/subscriptions',
                element: <Subscription />
            },
            {
                path: '/subscription/:id',
                element: <SubscriptionPayment />
            },
            {
                path: '/payment/status',
                element: <Status />
            },
            
            {
                path: '/reports',
                element: <Reports />
            },
        ]
    }
]);

export default router;