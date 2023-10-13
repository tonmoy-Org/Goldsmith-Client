import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

const MyCart = () => {
    const [carts, refetch] = useCart();
    const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);

    return (
        <div>
            <div>
                {total > 0 ? (
                    <Link to="/checkout">
                        <button className="btn btn-warning w-full my-3">Pay</button>
                    </Link>
                ) : (
                    <button className="btn btn-warning w-full my-3" disabled>
                        Pay
                    </button>
                )}
            </div>
            
        </div>
    );
};

export default MyCart;
