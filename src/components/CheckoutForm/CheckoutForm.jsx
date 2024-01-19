import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import '../Style/common.css';
import '../Style/Card.css';
import { useLocation, useNavigate } from "react-router-dom";
import './Checkout.css'
import check from '../../assets/icon/check.png'

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#fce883",
            },
            "::placeholder": {
                color: "#87bbfd",
            },
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee",
        },
    },
};

const CheckoutForm = ({ price, paymentInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";



    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: "",
        phone: "",
        name: "",
    });
    const [shippingAddress, setShippingAddress] = useState({
        line1: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
    });
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [Amount, setAmount] = useState(false);



    useEffect(() => {
        if (price > 0) {
            const fetchClientSecret = async () => {
                try {
                    const response = await fetch("https://goldsmith-server.vercel.app/create-payment-intent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ price }),
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to fetch client secret: ${response.statusText}`);
                    }

                    const data = await response.json();
                    setClientSecret(data.clientSecret);
                } catch (error) {
                    console.error(error);
                    setError({ message: error.message || "Failed to fetch client secret" });
                }
            };

            fetchClientSecret();
        }
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        if (error) {
            card.focus();
            return;
        }

        if (cardComplete) {
            setProcessing(true);
        }

        try {
            const payload = await stripe.createPaymentMethod({
                type: "card",
                card,
                billing_details: billingDetails,
            });
            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: payload.paymentMethod.id,
                }
            );
            setProcessing(false);


            if (paymentIntent && paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                setPaymentSuccess(true);
                setAmount(paymentIntent.amount);

                const postData = {
                    ...paymentInfo,
                    paymentMethodId: payload.paymentMethod.id,
                    billerInfo: payload.paymentMethod.billing_details,
                    shippingAddress: shippingAddress,
                    type: payload.paymentMethod.type
                    // Add other relevant data if needed
                };

                fetch('https://goldsmith-server.vercel.app/payments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data: ', data);
                        if (data.insertedId) {
                            // display success message or perform other actions

                        }
                    });
            }

            if (error) {
                setError(error.message ? error : { message: "Payment failed. Please try again." });
                // Handle specific error codes if needed
            } else {
                setPaymentMethod(payload.paymentMethod);
            }


        } catch (error) {
            console.error(error);
            setError({ message: "Payment failed. Please try again." });
        }
    };

    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: "",
            phone: "",
            name: "",
        });
        setShippingAddress({
            line1: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
        });
        setPaymentSuccess(false);
    };

    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (paymentSuccess) {
            // Display success message and initiate redirect countdown
            setShowSuccessMessage(true);

            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            // Redirect after countdown reaches 0
            const redirectTimer = setTimeout(() => {
                navigate(from); // Redirect to the specified path
            }, countdown * 1000);

            // Clear timers on component unmount or if paymentSuccess changes
            return () => {
                clearInterval(timer);
                clearTimeout(redirectTimer);
            };
        }
    }, [paymentSuccess, from, navigate, countdown]);

    return paymentSuccess ? (
        <div className="text-center py-20 text-[17px]">
            <div>
                <img className="w-32 mx-auto" src={check} alt="" />
                <h1 className="text-xl font-semibold my-4">Payment successful</h1>
            </div>
            <div>
                <p className="pt-2">Your order has been placed. We'll send you an email with your order details.</p>
                <div>
                    <p className="text-xl font-bold">Transaction Id: <span className="text-green-600 text-[16px] font-bold">{transactionId}</span></p>
                </div>
                <div>
                    <p className="text-xl font-bold">Amount: <span className="text-green-600">${Amount / 100}</span></p>

                </div>
            </div>
            {showSuccessMessage && (
                <div>
                    <p className="pt-4">Redirecting to home page in {countdown} seconds...</p>
                </div>
            )}
            {/* <button type="button" onClick={reset}>
                Reset
            </button> */}
        </div>
    ) : (

        <div>
            {processing && (
                <div className="loader-overlay">
                    <div className="loader"></div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 mb-14">
                <div>
                    <label className="mt-5 mb-3 text-lg font-bold">
                        Payment details
                    </label>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Jane Doe"
                            required
                            autoComplete="name"
                            value={billingDetails.name}
                            onChange={(e) =>
                                setBillingDetails({ ...billingDetails, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="my-2">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="janedoe@gmail.com"
                            required
                            autoComplete="email"
                            value={billingDetails.email}
                            onChange={(e) =>
                                setBillingDetails({ ...billingDetails, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="(941) 555-0123"
                            required
                            autoComplete="tel"
                            value={billingDetails.phone}
                            onChange={(e) =>
                                setBillingDetails({ ...billingDetails, phone: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div>
                    <label className="mt-5 mb-3 text-lg font-bold">
                        Shipping address
                    </label>
                    <div className="my-2">
                        <label htmlFor="line1">Address</label>
                        <input
                            id="line1"
                            type="text"
                            placeholder="123 Main St"
                            required
                            value={shippingAddress.line1}
                            onChange={(e) =>
                                setShippingAddress({ ...shippingAddress, line1: e.target.value })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                type="text"
                                placeholder="City"
                                required
                                value={shippingAddress.city}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, city: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <input
                                id="state"
                                type="text"
                                placeholder="State"
                                required
                                value={shippingAddress.state}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, state: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="postal_code">Postal Code</label>
                            <input
                                id="postal_code"
                                type="text"
                                placeholder="12345"
                                required
                                value={shippingAddress.postal_code}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, postal_code: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label htmlFor="country">Country</label>
                            <input
                                id="country"
                                type="text"
                                placeholder="Country"
                                required
                                value={shippingAddress.country}
                                onChange={(e) =>
                                    setShippingAddress({ ...shippingAddress, country: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="mt-5 mb-3 text-lg font-bold">
                        Card information
                    </label>
                    <div className="mt-1">
                        <CardElement options={CARD_OPTIONS} onChange={(e) => setCardComplete(e.complete)} className="p-2 border rounded-md" />
                    </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error.message}</div>}

                <button type="submit" disabled={!stripe || processing} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-300 hover:bg-blue-700 SubmitButton">
                    {processing ? "Processing..." : `Pay $${price}`}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
