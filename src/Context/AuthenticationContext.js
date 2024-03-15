import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect } from "react";

export const AuthenticationContext = createContext();

export default function AuthenticationContextProvider(props) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const signIn = async (userData) => {
    try {
      setToken(userData.token);
      localStorage.setItem("token", userData.token);
      console.log("Token set:", userData.token);
      getUserData();
      return { success: true };
    } catch (error) {
      console.error("Error signing in:", error);
      return { success: false, error: "An error occurred while signing in" };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("userrole");
      localStorage.removeItem("useriat");
      localStorage.removeItem("userexp");

      return { success: true };
    } catch (error) {
      console.error("Error signing out:", error);
      return { success: false, error: "An error occurred while signing out" };
    }
  };

  function getUserData() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const newUser = jwtDecode(token);
        console.log("This is a new user", newUser);
        localStorage.setItem("userId", newUser.id);
        localStorage.setItem("username", newUser.name);
        localStorage.setItem("userrole", newUser.role);
        localStorage.setItem("useriat", newUser.iat);
        localStorage.setItem("userexp", newUser.exp);
        setUser(newUser);
        console.log("This is an old user", user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }

  return (
    <AuthenticationContext.Provider value={{ signIn, signOut, token }}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}
