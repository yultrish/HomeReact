import React from "react";
import "./Top.css";
import caro4 from "./images/shop-caro4.webp";
import makeupCaro from "./images/make-caro.webp";
import bagCaro from "./images/caro-bag2.gif";

const Top = () => {
  return (
    <>
      <div class="container">
        {/* <!-- carousel --> */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide carousel-container"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={caro4}
                className="d-block w-100 h-80 caro-4"
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img src={bagCaro} className="d-block w-100 h-80" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={bagCaro} className="d-block w-100 h-80" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        {/* <!-- carousel-end --> */}
        <div className="navbar">
          <div class="logo">
            {/* <!-- <a href="index.html"><img src="https://i.ibb.co/kDVwgwp/logo.png" alt="RedStore" width="125px" /></a> --> */}
          </div>
          <nav>
            <ul id="MenuItems">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="product.html">Products</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="account.html">Account</a>
              </li>
            </ul>
          </nav>
          <a href="./cart.html">
            <img
              src="https://i.ibb.co/PNjjx3y/cart.png"
              alt="cart-icon"
              width="30px"
              height="30px"
            />
            <span class="cart-number">0</span>
          </a>
          <img
            src="https://i.ibb.co/6XbqwjD/menu.png"
            alt=""
            className="menu-icon"
            onclick="menutoggle()"
          />
        </div>
      </div>
    </>
  );
};

export default Top;
