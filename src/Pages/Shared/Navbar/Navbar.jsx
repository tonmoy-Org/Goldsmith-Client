import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import close from '../../../assets/icon/close.png'
import useCart from "../../../hooks/useCart";
import { Bars3Icon } from '@heroicons/react/24/solid'
import CartItems from "../../../components/CartItems/CartItems";
import Payment from "../../../components/Payment/Payment";



const Navbar = () => {
    const { user, logOut } = useAuth();
    const [carts] = useCart();
    const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error.message);
            })
    }
    function closeDrawer() {
        // Get the checkbox element that controls the drawer
        const drawerCheckbox = document.getElementById("my-drawer-4");

        // Uncheck the checkbox to close the drawer
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    }
    function closeDrawer1() {
        // Get the checkbox element that controls the drawer
        const drawerCheckbox = document.getElementById("my-drawer-5");

        // Uncheck the checkbox to close the drawer
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    }
    function closeDrawer2() {
        // Get the checkbox element that controls the drawer
        const drawerCheckbox = document.getElementById("my-drawer-6");

        // Uncheck the checkbox to close the drawer
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    }
    return (
        <div className="navbar fixed top-0 z-10 bg-white font-semibold border-b-2 border-[#7A7A7A] duration-1000">
            <div className="navbar-start">
                <div className="ps-4 lg:hidden lg:ps-0">
                    <div className="drawer">
                        <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-6" className="drawer-button"><Bars3Icon className="h-8 w-8 text-[#7A7A7A]" /></label>
                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-6" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="menu p-4 lg:w-[450px] w-80 min-h-full bg-white text-base-content">
                                <div className="flex justify-end mb-3 items-center pb-3 border-b-2 border-[#7a7a7a4f] pe-3">
                                    <div>
                                        <p className="btn btn-ghost normal-case text-xl font-bold pe-20">GOLDSMITH</p>
                                        <button onClick={closeDrawer2} className="btn btn-circle">
                                            <img className="h-4 w-4" src={close} alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/shop'>Shop</Link></li>
                                    <li><Link to='/myjewelry'>My Jewelry</Link></li>
                                    <li><a>Add jewelry</a></li>
                                    <li><a>Blogs</a></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal lg:px-8">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/shop'>Shop</Link></li>
                        <li><Link to='/myjewelry'>My Jewelry</Link></li>
                        <li><a>Add jewelry</a></li>
                        <li><a>Blogs</a></li>
                    </ul>
                </div>
            </div>
            <a className="btn btn-ghost normal-case text-xl font-bold">GOLDSMITH</a>
            <div className="navbar-end lg:px-8 px-2">
                <div>
                    <div className="drawer drawer-end">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content pe-4">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{carts?.length || 0}</span>
                                </div>
                            </label>
                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                            <div className="menu p-5 lg:w-[450px] w-80 min-h-full bg-white text-base-content">
                                <div className="flex justify-between items-center border-b-2 border-[#7a7a7a4f]">
                                    <div>
                                        <button onClick={closeDrawer} className="btn btn-circle mb-3">
                                            <img className="h-4 w-4" src={close} alt="" />
                                        </button>
                                    </div>
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">{carts?.length || 0}</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[16px] py-2">BUY $500.00 MORE TO ENJOY FREE SHIPPING</p>
                                </div>
                                <div className=" border-b-2 border-[#7A7A7A]">
                                    {carts?.length === 0 ?
                                        <div className="my-4">
                                            <div className="mb-3 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                                                    <div className="flex-1 space-y-6 py-1">
                                                        <div className="h-2 bg-slate-200 rounded"></div>
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                                                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                                            </div>
                                                            <div className="h-2 bg-slate-200 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="px-3 text-slate-400">No products in the cart.</span>
                                        </div>
                                        : <div>
                                            {
                                                carts.map(data => (
                                                    <CartItems
                                                        key={data._id}
                                                        data={data}
                                                    ></CartItems>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                                <div>
                                    <div className="flex justify-between p-3">
                                        <div>
                                            <h2 className="text-[17px]">Subtotal : </h2>
                                        </div>
                                        <div>
                                            <h2 className="text-[17px]">${total}</h2>
                                        </div>
                                    </div>
                                    <Payment></Payment>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="drawer drawer-end">
                        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
                        {user ? <div className="drawer-content">
                            {/* Page content here */}

                            <label htmlFor="my-drawer-5" className="drawer-button btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <div>
                                        <img src={user?.photoURL}
                                        />
                                    </div>
                                </div>
                            </label>
                        </div> : <><Link to='/login' className='lg:me-3 text-[#1890ff]'>Login</Link></>}
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
                            <div className="menu p-4 lg:w-[450px] w-80 min-h-full bg-white text-base-content">
                                <div className="flex justify-between mb-3 items-center pb-3 border-b-2 border-[#7a7a7a4f]">
                                    <div>
                                        <button onClick={closeDrawer1} className="btn btn-circle">
                                            <img className="h-4 w-4" src={close} alt="" />
                                        </button>
                                    </div>
                                    <div className="">
                                        <img className="w-12 rounded-full" src={user?.photoURL} />
                                    </div>
                                </div>
                                <div>
                                    <li>
                                        <p className="justify-between">
                                            {user?.displayName} <br />
                                            {user?.email}
                                            <span className="badge bg-primary text-white">New</span>
                                        </p>
                                    </li>
                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link className="btn btn-error btn-sm" onClick={handleLogOut}>Logout</Link></li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;