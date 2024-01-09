import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useState } from "react"; // Import useState

const Payment = () => {
    const [carts, refetch] = useCart();
    const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
    const { user } = useAuth();
    const [payment, setPayment] = useState(); // State to hold payment data
    
    const handlePayment = () => {
        const newPayment = {
            name: user?.displayName,
            email: user?.email,
            total,
            quantity: carts.length,
            itemName: carts.map(item => item.name),
            item: carts.map(item => item._id),
            date: new Date(),
        };

        setPayment(newPayment);
         // Set the payment data in the state
    };

    return (
        <div>
            <div>
                {total > 0 ? (
                    <button onClick={handlePayment} className="btn btn-warning w-full my-3 text-white">
                        <Link to='/myPayments'>Checkout</Link>
                    </button>
                ) : (
                    <button className="btn btn-warning w-full my-3 text-black" disabled>
                        <Link to='/myPayments'>Checkout</Link>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Payment;
