import React, { useState } from "react";
import "./login.css";
// import "../components/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
// import { AuthProvider } from "./context/ContextAuth";
// import { AnimatePresence } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if ((email === "", password === "")) {
      alert("enter all details");
      return;
    }

    try {
      const result = await fetch(`http://localhost:7090/api/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const response = await result.json();
      if (response.id) {
        localStorage.setItem("userID", response.id);
        login(response);
        setAuth(true);
        navigate("/home");
        console.log(response.id);
        alert("login successfully");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [activeForm, setActiveForm] = useState("login");

  const toggleForm = (formType) => {
    setActiveForm(formType);
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
      console.log(credentialResponseDecoded);

      // Simulate a backend login with Google response
      const result = await fetch(`http://localhost:7090/api/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          // Pass necessary data from Google response
          // password: credentialResponseDecoded,
          email: credentialResponseDecoded.email,
          image: credentialResponseDecoded.picture,
          // Add any other necessary fields
        }),
      });

      const response = await result.json();
      if (response.id) {
        // Store user information in localStorage
        localStorage.setItem("userID", response.id);
        localStorage.setItem("user", JSON.stringify(response));

        // Perform actions like setting authentication
        setAuth(true);
        // Store user information in context
        login(response);

        // Redirect to the home page
        navigate("/home");

        alert("Login successful");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // const handleSuccess2 = (credentialResponse) => {
  //   try {
  //     var credentialResponseDecoded = jwtDecode(credentialResponse.credential);
  //     console.log(credentialResponseDecoded);

  //     login(credentialResponseDecoded);
  //     setAuth(true);
  //     navigate("/home");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 2.5,
        }}
      >
        <section className="forms-section">
          <h1 className="section-title">Login & Sign Up Form</h1>
          <div className="forms">
            <div
              className={`form-wrapper ${
                activeForm === "login" ? "is-active" : ""
              }`}
            >
              <button
                type="button"
                className="switcher switcher-login"
                onClick={() => toggleForm("login")}
              >
                Login
                <span className="underline"></span>
              </button>
              <form className="form form-login">
                <fieldset>
                  <legend>
                    Please, enter your email and password for login.
                  </legend>
                  <div className="input-block">
                    <label htmlFor="login-email">E-mail</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="login-email"
                      type="email"
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="login-password">Password</label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id="login-password"
                      type="password"
                    />
                  </div>
                </fieldset>
                <button
                  type="submit"
                  className="btn-login"
                  onClick={handleLogin}
                >
                  Login
                </button>
                {/* <Link to="/home"> */}
                <GoogleLogin
                  // onSuccess={handleSuccess2}
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log("Login failed");
                  }}
                  buttonText="Login with Google"
                  cookiePolicy={"single_host_origin"}
                  className="google-login-button"
                />
              </form>
            </div>
            <div
              className={`form-wrapper ${
                activeForm === "signup" ? "is-active" : ""
              }`}
            >
              <button
                type="button"
                className="switcher switcher-signup"
                onClick={() => toggleForm("signup")}
              >
                Sign Up
                <span className="underline"></span>
              </button>
              <form className="form form-signup">
                <fieldset>
                  <legend>
                    Please, enter your email, password, and password
                    confirmation for sign up.
                  </legend>
                  <div className="input-block">
                    <label htmlFor="signup-email">E-mail</label>
                    <input id="signup-email" type="email" required />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password">Password</label>
                    <input id="signup-password" type="password" required />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password-confirm">
                      Confirm password
                    </label>
                    <input
                      id="signup-password-confirm"
                      type="password"
                      required
                    />
                  </div>
                </fieldset>
                <button type="submit" className="btn-signup">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Login;
