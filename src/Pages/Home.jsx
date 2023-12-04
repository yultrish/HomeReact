import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/Product";
import Footer from "../components/Footer";
import "../components/styles.css";
// import Header from "../components/Headeer";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* <Header /> */}

      <ProductList />

      <Footer />
    </>
  );
};

export default Home;
