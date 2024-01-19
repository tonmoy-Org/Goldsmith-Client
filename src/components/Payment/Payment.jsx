import { Link, useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useState } from "react"; // Import useState

const Payment = () => {
    const [carts] = useCart();
    const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/myPayments";

    const [loading, setLoading] = useState(false);

    const handleLoad = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate(from, { replace: true });
        }, 4000); // Replace with the actual API call
    };

    return (
        <div>
            <div>
                {total > 0 ? (
                    loading ? (
                        <div className="loader-overlay">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <div className="mt-10">
                            <button className="btn btn-warning w-full my-3 text-black" onClick={handleLoad}>
                                Checkout
                            </button>
                        </div>
                    )
                ) : (
                    <button className="btn btn-warning w-full my-3 text-black" disabled>
                        <Link to='/myPayments' className="text-white">Checkout</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Payment;
