import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import '../Style/common.css';
import '../Style/Card.css';

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

    useEffect(() => {
        if (price > 0) {
            const fetchClientSecret = async () => {
                try {
                    const response = await fetch("http://localhost:5000/create-payment-intent", {
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

                const postData = {
                    ...paymentInfo,
                    paymentMethodId: payload.paymentMethod.id,
                    billerInfo: payload.paymentMethod.billing_details,
                    shippingAddress: shippingAddress,
                    type: payload.paymentMethod.type
                    // Add other relevant data if needed
                };

                fetch('http://localhost:5000/payments', {
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

    return paymentSuccess ? (
        <div>
            <div>Payment successful</div>
            <div>
                Thanks for trying Stripe Elements. No money was charged, but we
                generated a PaymentMethod: <span className="text-green-600 text-xl font-semibold">{transactionId}</span>
            </div>
            <button type="button" onClick={reset}>
                Reset
            </button>
        </div>
    ) : (
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
                {processing ? "Processing..." : `Pay ${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
