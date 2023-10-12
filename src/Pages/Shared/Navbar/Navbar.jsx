import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import close from '../../../assets/icon/close.png'
import useCart from "../../../hooks/useCart";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [carts] = useCart();
    
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
    return (
        <div className="navbar bg-base-100 font-semibold">
            <div className="navbar-start">
                <div className="dropdown">
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal lg:px-8">
                        <li><Link to='/'>Home</Link></li>
                        <li><a>Shop</a></li>
                        <li><a>All jewelry</a></li>
                        <li><a>My Jewelry</a></li>
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
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle pe-4">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="badge badge-sm indicator-item">{carts?.length || 0}</span>
                                </div>
                            </label>

                        </div>
                        <div className="drawer-side z-10">
                            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                            <div className="menu p-4 lg:w-[450px] w-80 min-h-full bg-base-200 text-base-content">
                                <button onClick={closeDrawer} className="btn btn-circle">
                                    <img className="h-5 w-5" src={close} alt="" />
                                </button>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div>
                    {user &&
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <div>
                                        <img src={user.photoURL}
                                        />
                                    </div>
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72">
                                <li>
                                    <p className="justify-between">
                                        {user.displayName} <br />
                                        {user.email}
                                        <span className="badge">New</span>
                                    </p>
                                </li>
                                <li><Link to='/profile'>Profile</Link></li>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link onClick={handleLogOut}>Logout</Link></li>
                            </ul>
                        </div>
                    }
                </div>
                <div>
                    {
                        user ?
                            <></>
                            : <Link to='/login' className='lg:me-3 text-[#1890ff]'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;