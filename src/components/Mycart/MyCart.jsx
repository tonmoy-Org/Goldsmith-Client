import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

const MyCart = () => {
    const [carts, refetch] = useCart();
    const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
    const { user } = useAuth();


    const handlePayment = () => {
        const payment = {
            name: user?.displayName,
            email: user?.email,
            total,
            quantity: carts.length,
            itemName: carts.map(item => item.name),
            item: carts.map(item => item._id),
            date: new Date(),
        }
        fetch('http://localhost:5000/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(payment)
        })
            .then(res => res.json())
            .then(result => {
                refetch();// refetch cart to update the number of items in the cart
                console.log(result);
                window.location.replace(result.url);


            })
    }
    return (
        <div>
            <div>
                {total > 0 ? (
                    <Link>
                        <button onClick={handlePayment} className="btn btn-warning w-full my-3">Pay</button>
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
