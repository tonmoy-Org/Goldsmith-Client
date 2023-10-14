import Headroom from "react-headroom";

const TopNav = () => {
    return (
        <div>
            <Headroom pinStart={100}>
            <div className="navbar bg-neutral text-neutral-conten">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            </Headroom>
            
        </div>
    );
};

export default TopNav;