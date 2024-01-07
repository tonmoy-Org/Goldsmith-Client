import { useEffect } from "react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

const MyCart = () => {
  const [carts, refetch] = useCart();
  const total = carts.reduce((sum, item) => item.price + sum, 0).toFixed(2);
  const { user } = useAuth();

  // Define the clickPayButton function to trigger bKash payment
  function clickPayButton() {
    const bKashButton = document.getElementById("bKash_button");
    if (bKashButton) {
      bKashButton.click();
    }
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js"; // Replace with the actual URL of the bKash payment script
    script.async = true;

    script.onload = () => {
      // Initialize bKash here (use the provided code you have)
      // Example: window.bKash = new bKash();
      // Make sure to follow the bKash documentation for initialization
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup code if needed
      // Example: window.bKash = null;
    };
  }, []);

  const handlePayment = () => {
    const payment = {
      name: user?.displayName,
      email: user?.email,
      total,
      quantity: carts.length,
      itemName: carts.map(item => item.name),
      item: carts.map(item => item._id),
      date: new Date(),
    };

    fetch('https://goldsmith-server.vercel.app/createRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Fix the header name
      },
      body: JSON.stringify(payment),
    })
    .then(res => res.json())
    .then(result => {
      refetch(); // Refetch cart to update the number of items in the cart
      console.log(result);

      // Trigger bKash payment when the response is received
      clickPayButton();
    });
  };

  return (
    <div>
      <div>
        {total > 0 ? (
          <button onClick={handlePayment} className="btn btn-warning w-full my-3">
            Pay
          </button>
        ) : (
          <button className="btn btn-warning w-full my-3" disabled>
            Pay
          </button>
        )}
      </div>
      {/* Add a button with the bKash ID for triggering payment */}
      <button id="bKash_button" style={{ display: "none" }}></button>
    </div>
  );
};

export default MyCart;
