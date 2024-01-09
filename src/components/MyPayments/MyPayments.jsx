import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import '../Style/Card.css'

const stripePromise = loadStripe(import.meta.env.VITE_Payments_PK);

const MyPayments = () => {
    const [carts] = useCart();
    const total = carts.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    const { user } = useAuth();

    const paymentInfo = {
        name: user?.displayName,
        email: user?.email,
        total,
        quantity: carts.length,
        itemName: carts.map(item => item.name),
        item: carts.map(item => item._id),
        date: new Date(),
    };
    return (
        <div className="bg-[#f6f9fc]">
            <div  className="AppWrapper ">
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentInfo={paymentInfo} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default MyPayments;
