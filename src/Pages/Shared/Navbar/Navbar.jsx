import { Link } from "react-router-dom";


const Navbar = () => {
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
                <Link to='/login'>Button</Link>
            </div>
        </div>
    );
};

export default Navbar;