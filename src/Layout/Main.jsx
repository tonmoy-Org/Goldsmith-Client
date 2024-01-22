import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
// import MessengerCustomerChat from 'react-messenger-customer-chat';

const Main = () => {
    return (
        <div>
            {/* <div className='bottom-10'>
                <MessengerCustomerChat
                    pageId="103744185074635"
                    appId="799662015022254"
                />
            </div> */}
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;