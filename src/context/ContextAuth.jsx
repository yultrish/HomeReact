import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");
  const [auth, setAuth] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const login = async (user) => {
    if (user.id) {
      const randomNum =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setToken(randomNum);
      localStorage.setItem("token", randomNum);
      setCurrentUser(JSON.stringify(user));
      setAuth(true);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setCurrentUser("");
    setToken("");
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [currentUser, setToken]);

  const details = {
    auth,
    setAuth,
    setCurrentUser,
    currentUser,
    token,
    setToken,
    login,
    logout,
    cartCount,
    setCartCount,
  };

  return (
    <AuthContext.Provider value={details}>{children}</AuthContext.Provider>
  );
};
