import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import '../Style/common.css';
import '../Style/Card.css';

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
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
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

  

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

                const postData = {
                    ...paymentInfo,
                    paymentMethodId: payload.paymentMethod.id,
                    billerInfo: payload.paymentMethod.billing_details,
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
        <form onSubmit={handleSubmit}>
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
            <div>
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
            <div>
                <CardElement options={CARD_OPTIONS} onChange={(e) => setCardComplete(e.complete)} />
            </div>
            {error && <div>{error.message}</div>}
            <button type="submit" disabled={!stripe || processing}>
                {processing ? "Processing..." : `Pay ${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
