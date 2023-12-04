// PaymentForm.jsx
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import Confetti from "react-dom-confetti";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function PaymentForm({ orders, onPaymentSuccess }) {
  const [paymentError, setPaymentError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [showCheckoutForm, setShowCheckoutForm] = useState(true);

  const confettiAnimation = useSpring({
    opacity: paymentSuccess ? 1 : 0,
    from: { opacity: 0 },
    reset: true,
  });

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const flowerAnimation = useSpring({
    opacity: paymentSuccess ? 1 : 0,
    marginTop: paymentSuccess ? 0 : -100,
    from: { opacity: 0, marginTop: -100 },
    reset: true,
  });

  const flowerStyle = {
    width: "50px",
    height: "50px",
    background: "url('/path-to-your-flower-image.png')",
    backgroundSize: "cover",
    position: "absolute",
  };

  const handlePayment = async () => {
    try {
      if (isProcessing) {
        return;
      }

      setIsProcessing(true);

      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card Element not found.");
      }

      const totalAmount = calculateTotalAmount(orders);

      const response = await fetch(
        "http://localhost:7090/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
          }),
        }
      );

      const { clientSecret } = await response.json();

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        setPaymentSuccess(true);
        setShowCheckoutForm(false);

        // Call the onPaymentSuccess callback passed from parent component
        onPaymentSuccess();
      }
    } catch (error) {
      console.error("Payment failed:", error.message);
      setPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotalAmount = () => {
    if (!orders || orders.length === 0) {
      return 0;
    }

    const prices = orders.map((order) =>
      parseFloat(order.products.price.toFixed(2))
    );
    const taxRate = 0.2;
    const totalTax = taxRate * prices.reduce((total, price) => total + price, 0);
    const subtotal = prices.reduce((total, price) => total + price, 0);
    const total = subtotal - totalTax;

    return Math.round(total * 100);
  };

  return (
    <div>
      {showCheckoutForm && (
        <form>
          <label>
            Card details
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </label>

          <button type="button" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>

          {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
        </form>
      )}

      {!showCheckoutForm && (
        <animated.div style={{ ...confettiAnimation, marginTop: "10px" }}>
          <Confetti active={paymentSuccess} config={confettiConfig} />
          <animated.div style={{ ...flowerAnimation, ...flowerStyle }} />
          <div style={{ color: "green" }}>
            Congratulations! Your payment was successful.
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default PaymentForm;
