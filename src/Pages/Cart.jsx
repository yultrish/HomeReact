import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/useAuth";

function CartPage() {
  const [orders, setOrders] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { cartCount, setCartCount, auth } = useAuth();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        if (!auth) {
          // User is not logged in, clear the cart items
          setOrders([]);
          return;
        }

        const customerId = localStorage.getItem("userID");
        console.log("customer id");
        console.log(customerId);

        if (customerId > 0) {
          const response = await fetch(
            "http://localhost:7090/shop/v1/orderWithCustomerId",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ customer_id: customerId }),
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            setOrders(data);

            // Calculate and display total prices
            calculateTotalPrice(data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCartItems();
  }, [auth]);

  const calculateTotalPrice = (data) => {
    const prices = data.map((order) => order.products.price);
    const totalPrice = prices.reduce((total, price) => total + price, 0);
    const taxRate = 0.2;
    const taxAmount = totalPrice * taxRate;
    const netTotal = totalPrice - taxAmount;

    setSubtotal(totalPrice.toFixed(2));
    setTax(taxAmount.toFixed(2));
    setTotal(netTotal.toFixed(2));
  };

  const handleRemoveOrder = async (orderId) => {
    try {
      const confirmed = window.confirm(
        `Are you sure you want to delete this order with id ${orderId}`
      );
      if (confirmed) {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);

        // Perform the deletion logic by making a DELETE request to your API
        const result = await fetch(
          `http://localhost:7090/shop/v1/order/${orderId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.status === 200 || result.status === 201) {
          const response = await result.json();
          console.log(response);
          console.log("Deleted successfully");
          setCartCount(cartCount - 1);
          calculateTotalPrice(updatedOrders);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="small container cart-page">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <div className="cart-info">
                    <img src={order.products.image} alt={order.products.name} />
                    <div>
                      <p>{order.products.name}</p>
                      <small>Price: GHC{order.products.price.toFixed(2)}</small>
                      <a
                        href="#"
                        className="btn-outline-danger remove"
                        onClick={() => handleRemoveOrder(order.id)}
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                </td>
                <td className="quantity">
                  <input type="number" value="1" min="1" />
                </td>
                <td className="Itemprice">
                  GHC{order.products.price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price">
          <table>
            <tbody>
              <tr>
                <td className="subtotal">Subtotal</td>
                <td className="sub-total">GHC{subtotal}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td className="tax">GHC{tax}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td className="total">GHC{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
