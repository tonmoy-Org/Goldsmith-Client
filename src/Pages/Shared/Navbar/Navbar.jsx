import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log(user)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error.message);
            })
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