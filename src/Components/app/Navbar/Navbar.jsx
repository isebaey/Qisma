import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Line from "../Line/Line";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "../../../Context/AuthenticationContext";
import { CartContext } from "../../../Context/CartContext";

export default function Navbar() {
  const { signOut } = useContext(AuthenticationContext);
  const [cartlistCount, setCartlistCount] = useState(0);
  const { fetchCartData } = useContext(CartContext);

  useEffect(() => {
    const getCartCount = async () => {
      try {
        const count = await fetchCartData();
        setCartlistCount(count);
      } catch (error) {
        console.error("Error fetching cartlist count:", error);
      }
    };
    getCartCount();
  }, [fetchCartData]);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="main-Navbar fixed-top ">
      <Line />
      <nav className="navbar navbar-expand-lg navbar-custom ">
        <div className="container">
          <NavLink exact to={"/"} className="navbar-brand brand">
            Qisma
          </NavLink>
          <button
            className="navbar-toggler toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon togglerIcon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-collapse-custom"
            id="navbarSupportedContent"
          >
            <ul className="mx-auto navbar-nav ms-auto mb-2 mb-lg-0 navList">
              <li className="nav-item">
                <NavLink
                  exact
                  to={"/"}
                  className="nav-link navLink"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              {localStorage.getItem("userId") ? (
                <li className="nav-item">
                  <NavLink
                    to={"/cart"}
                    className="nav-link navLink"
                    activeClassName="active"
                  >
                    Cart
                  </NavLink>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("userId") ? (
                <li className="nav-item">
                  <NavLink
                    to={"/wishList"}
                    className="nav-link navLink "
                    activeClassName="active"
                  >
                    <div className="wish-count position-relative">
                      Wish List
                    </div>
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <NavLink
                  to={"/products"}
                  className="nav-link navLink"
                  activeClassName="active"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/categories"}
                  className="nav-link navLink"
                  activeClassName="active"
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={"/brands"}
                  className="nav-link navLink"
                  activeClassName="active"
                >
                  Brands
                </NavLink>
              </li>
              {localStorage.getItem("userId") ? (
                <li className="nav-item">
                  <NavLink
                    to={"/profile"}
                    className="nav-link navLink"
                    activeClassName="active"
                  >
                    Profile
                  </NavLink>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="log-we-cart cartAndLogout">
              <NavLink
                to={"/cart"}
                className="cartIconLink text-decoration-none position-relative "
              >
                <i className="fa-solid fa-cart-shopping text-dark cartIcon"></i>
                {cartlistCount > 0 && (
                  <span className="v-badge position-absolute top-0 start-100 translate-middle badge rounded-pill py-1 px-2 fs-6">
                    {cartlistCount}
                  </span>
                )}
              </NavLink>
              {localStorage.getItem("userId") ? (
                <NavLink
                  to={"/signin"}
                  className="logout logoutLink ms-4"
                  activeClassName="active"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to={"/signin"}
                  className="logout logoutLink "
                  activeClassName="active"
                >
                  Login <i class="fa-solid fa-key"></i>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
