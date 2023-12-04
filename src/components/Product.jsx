import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

import "./styles.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { setCartCount } = useAuth();
  const [productTotal, setProductTotal] = useState();

  useEffect(() => {
    (async function fetchData() {
      try {
        const result = await fetch("http://localhost:7090/shop/v1/products");
        const response = await result.json();
        setProducts(response);
        productNumber();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [productTotal]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productNumber = async () => {
    try {
      const result = await fetch("http://localhost:7090/shop/v1/products");
      const response = await result.json();

      let initialLength = productTotal;
      const productName = response.reduce(function (newLength, length) {
        return newLength + length;
      }, initialLength);

      setProductTotal(productName);
    } catch (error) {
      console.error("Error updating productTotal:", error);
    }
  };

  async function handleAddToCartClick(productId) {
    const customer_id = localStorage.getItem("userID");

    console.log("Product ID:", productId);
    console.log("Customer ID:", customer_id);

    const newOrder = await fetch("http://localhost:7090/shop/v1/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        customer_id: Number(customer_id),
      }),
    });

    if (newOrder.status === 409) {
      const res = await newOrder.json();
      alert("Product has already been added to the cart");
      return;
    }

    if (newOrder.status === 200 || newOrder.status === 201) {
      const res = await newOrder.json();
      alert("Product added to the shopping cart: " + productId);
      console.log(res);
      cartNumber();
    }
  }

  async function cartNumber() {
    try {
      console.log("Getting cart items list");
      const id = localStorage.getItem("userID");
      console.log("Customer ID: " + id);

      let customer_id = localStorage.getItem("userID");

      const rs = await fetch(
        "http://localhost:7090/shop/v1/orders-with-customerId",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            customer_id: id,
          }),
        }
      );

      if (rs.status === 200) {
        let orders = await rs.json();
        console.log(orders);
        const orderCount = orders.order.length;
        console.log("Cart Item Count: " + orderCount);

        setCartCount(orderCount);
      }
      // }
    } catch (error) {
      console.error("Error updating cart item count:", error);
    }
  }

  return (
    <>
      <section className="products section-padding">
        {products.map(
          (product) => (
            // console.log(product.image),
            (
              <div
                key={product.id}
                className="col-lg-4 col-12 mb-3 product-card"
              >
                <div className="product-thumb">
                  <img
                    src={product.image}
                    className="img-fluid product-image"
                    alt={product.name}
                  />

                  <div className="product-top d-flex">
                    <span className="product-alert">
                      {/* {product.isNew ? "New Arrival" : ""} */}
                    </span>

                    <a
                      href="#"
                      className="bi-heart-fill product-icon ms-auto"
                    ></a>
                  </div>

                  <div className="product-info d-flex">
                    <div>
                      <h5 className="product-title mb-0">
                        <a
                          href={`product-detail/${product.id}`}
                          className="product-title-link"
                        >
                          {product.name}
                        </a>
                      </h5>

                      <div className="product-top d-flex">
                        <span className="product-alert me-auto">
                          New Arrival
                        </span>

                        <a href="#" className="bi-heart-fill product-icon"></a>
                      </div>

                      <p className="product-p">{product.description}</p>
                    </div>

                    {/* <div className="price-icon"> */}
                    <small className="product-price text-muted ms-auto">
                      ${product.price}
                    </small>
                    <span
                      className="material-symbols-outlined cart"
                      onClick={() => handleAddToCartClick(product.id)}
                    >
                      {" "}
                      <br />
                      shopping_cart
                    </span>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            )
          )
        )}
      </section>
    </>
  );
};

export default ProductList;
