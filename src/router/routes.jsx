import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import AllJewelry from "../Pages/AllJewelry/AllJewelry";
import MyJewelry from "../Pages/MyJewelry/MyJewelry";
import PrivateRoute from "./PrivateRouter";
import MyPayments from "../components/MyPayments/MyPayments";
import Search from "../Pages/Home/Search/Search";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/shop',
                element: <AllJewelry></AllJewelry>
            },
            {
                path: '/myjewelry',
                element: <PrivateRoute><MyJewelry></MyJewelry></PrivateRoute>
            },
            {
                path: '/myPayments', // Correct path here
                element: <MyPayments></MyPayments>
            },
            {
                path:'/search',
                element: <Search></Search>
            }
        ]
    },
]);

export default router;
