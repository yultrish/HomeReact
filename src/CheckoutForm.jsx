// CheckoutForm.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "./context/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./Payment";

function CheckoutForm() {
  const { auth } = useAuth();

  const [customerData, setCustomerData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!auth) {
        // User is not logged in, clear the checkout items
        setOrders([]);
        return;
      }

      const customerId = localStorage.getItem("userID");

      try {
        const orderResponse = await fetch(
          "http://localhost:7090/shop/v1/orderWithCustomerId",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id: customerId }),
          }
        );

        if (orderResponse.status === 200) {
          const orders = await orderResponse.json();
          setOrders(orders);
          calculateTotalPrice(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchData();
  }, [auth]);

  useEffect(() => {
    // Fetch the publishable key before calling loadStripe
    const fetchStripePublishableKey = async () => {
      try {
        const response = await fetch("http://localhost:7090/payment/config");
        const data = await response.json();
        return data.publishableKey;
      } catch (error) {
        console.error("Error fetching Stripe publishable key:", error);
        throw new Error("Failed to fetch Stripe publishable key");
      }
    };

    fetchStripePublishableKey()
      .then((key) => {
        const stripePromise = loadStripe(key);
        setStripePromise(stripePromise);
      })
      .catch((error) => {
        console.error("Error setting up Stripe:", error);
        // Handle the error as needed
      });
  }, []); // Run this effect only once, similar to componentDidMount

  const calculateTotalPrice = (orders) => {
    const prices = orders.map((order) =>
      parseFloat(order.products.price.toFixed(2))
    );
    const taxRate = 0.2;
    const totalTax =
      taxRate * prices.reduce((total, price) => total + price, 0);
    const subtotal = prices.reduce((total, price) => total + price, 0);
    const total = subtotal - totalTax;

    setSubtotal(subtotal.toFixed(2));
    setTax(totalTax.toFixed(2));
    setTotal(total.toFixed(2));
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  return (
    <div className="iphone">
      <header className="header">
        <h1>Checkout</h1>
      </header>

      <div className="form">
        {paymentSuccess ? (
          <div style={{ color: "green" }}>
            Congratulations! Your payment was successful.
          </div>
        ) : (
          <>
            <div>
              <h2>Address</h2>
              <div className="card">{/* Your address display logic */}</div>
            </div>

            <div>
              <h2>Shopping Bill</h2>
              <table>
                <tbody className="tbody">
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.products.name}</td>
                      <td align="right" className="Itemprice">
                        GHC{order.products.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Subtotal</td>
                    <td className="sub-total">GHC{subtotal}</td>
                  </tr>
                  <tr>
                    <td>Tax 10%</td>
                    <td className="tax">GHC{tax}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="total">GHC{total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div>
              {/* Wrap PaymentForm with Elements provider */}
              {stripePromise && (
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    orders={orders}
                    onPaymentSuccess={handlePaymentSuccess}
                  />
                </Elements>
              )}
            </div>
          </>
        )}
        <div>{/* Additional UI components or actions */}</div>
      </div>
    </div>
  );
}

export default CheckoutForm;
