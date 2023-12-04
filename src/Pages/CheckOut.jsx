import React, { useEffect, useState } from "react";
import "./CheckOut.css";
import { useAuth } from "../context/useAuth";

function Checkout() {
  const [customerData, setCustomerData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!auth) {
        // User is not logged in, clear the checkout items
        setOrders([]);
        return;
      }

      const customerId = localStorage.getItem("userID");
      console.log("customer id:", customerId);

      // if (customerId > 0) {
      // try {
      //   const customerResponse = await fetch(
      //     `http://localhost:7090/shop/v1/customer/${customerId}`
      //   );
      //   if (customerResponse.status === 200) {
      //     const customerData = await customerResponse.json();
      //     populateAddress(customerData);
      //   } else {
      //     console.error(
      //       "Failed to fetch customer information. Status:",
      //       customerResponse.status
      //     );
      //   }
      // } catch (error) {
      //   console.error("Error fetching customer information:", error);
      // }

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
          console.log("orders:", orders);
          setOrders(orders);
          calculateTotalPrice(orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      // }
    }

    fetchData();
  }, [auth]);

  function calculateTotalPrice(orders) {
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
  }

  function populateAddress(customerData) {
    // Update the state with the customer's address
    setCustomerData(customerData);
  }

  async function clearCart() {
    try {
      const customerId = localStorage.getItem("userID");
      const response = await fetch(
        `http://localhost:7090/shop/v1/clear-cart/${customerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Cart cleared successfully!");
        // window.location.href = 'index.html';
      } else {
        console.error("Failed to clear the cart. Status:", response.status);
        alert("An error occurred while clearing the cart.");
      }
    } catch (error) {
      console.error("Error clearing the cart:", error);
      alert("An error occurred while clearing the cart.");
    }
  }

  return (
    <div className="iphone">
      <header className="header">
        <h1>Checkout</h1>
      </header>

      <form action="" className="form">
        <div>
          <h2>Address</h2>

          <div className="card">
            {customerData ? (
              <address>
                NAME: {customerData.name}
                <br />
                CITY: {customerData.city}
              </address>
            ) : null}
          </div>
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
          <button
            className="button button--full"
            id="buy-now-button"
            onClick={clearCart}
          >
            Buy Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
