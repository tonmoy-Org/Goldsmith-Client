import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import Success from "../Pages/Success/Success";
import Cancel from "../Pages/Cancel/cancel";
import Fails from "../Pages/Fails/Fails";
import AllJewelry from "../Pages/AllJewelry/AllJewelry";
import MyJewelry from "../Pages/MyJewelry/MyJewelry";
import PrivateRoute from "./PrivateRouter";

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
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/payment/success/:tranId',
                element: <Success></Success>
            },
            {
                path: '/payment/cancel/:tranId',
                element: <Cancel></Cancel>
            },
            {
                path: 'fails',
                element: <Fails></Fails>
            },
            {
                path: 'shop',
                element: <AllJewelry></AllJewelry>
            },
            {
                path: 'myjewelry',
                element: <PrivateRoute><MyJewelry></MyJewelry></PrivateRoute>
            }
        ]
    },
]);

export default router;