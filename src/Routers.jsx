import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Wel from "./Pages/Wel";
import Checkout from "./Pages/CheckOut";
// import Door from "./components/door";
import Signup from "./Pages/Signup";
import Payment from "./Payment";
import Completion from "./Completion";
// import Payment from "./Payment";
// import Completion from "./Completion";
import CheckoutForm from "./CheckoutForm";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from "react";

function Routers() {
  const [stripePublishableKey, setStripePublishableKey] = useState(null);

  useEffect(() => {
    // Fetch the publishable key from your backend
    const fetchPublishableKey = async () => {
      try {
        const response = await fetch('http://localhost:7090/payment/config'); // Replace with your actual endpoint
        const data = await response.json();
        setStripePublishableKey(data.publishableKey);
      } catch (error) {
        console.error('Error fetching publishable key:', error);
      }
    };

    fetchPublishableKey();
  }, []);

  if (!stripePublishableKey) {
    // You might want to handle the loading state differently
    return <div>Loading...</div>;
  }
  const stripePromise = loadStripe(stripePublishableKey);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
        <Route path="/wel" element={<Wel />} />
          <Route
          path="/checkoutform"
          element={
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          }
        />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
