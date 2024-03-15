import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "../../Context/AuthenticationContext";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { signOut } = useContext(AuthenticationContext);

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="container mt-5 pt-5">
        <h1 className="mb-4">My Profile</h1>
        <div className="row pb-5">
          <aside className="col-md-4">
            <div className="card mb-4 border-0 bg-light">
              <div className="card-body d-flex align-items-center gap-2">
                <i className="fa-solid fa-user-circle fs-1 me-2"></i>
                <div>
                  <h3 className="card-title fw-bold">
                    {localStorage.getItem("username")}
                  </h3>
                  <p className="card-text">
                    This is your profile data at Qisma.com
                  </p>
                </div>
              </div>
            </div>
            <NavLink
              to={"/order"}
              className="btn btn-outline-dark border-0  w-100 mt-4 mb-4 "
            >
              <i className="fa-solid fa-cart-shopping me-2"></i>Last Order
            </NavLink>
            <NavLink
              to={"/orders"}
              className="btn btn-outline-dark border-0 w-100 mb-4"
            >
              <i className="fa-solid fa-truck me-2"></i>My Orders
            </NavLink>
            <NavLink
              to={"/signin"}
              className="btn btn-outline-danger mt-auto w-100"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-sign-out me-2"></i>Log Out
            </NavLink>
          </aside>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h5 className="card-title mb-0">User Details</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>ID:</strong> {localStorage.getItem("userId")}
                  </li>
                  <li className="list-group-item">
                    <strong>Name:</strong> {localStorage.getItem("username")}
                  </li>
                  <li className="list-group-item">
                    <strong>Role:</strong> {localStorage.getItem("userrole")}
                  </li>
                  <li className="list-group-item">
                    <strong>Issued At:</strong>{" "}
                    {new Date(
                      localStorage.getItem("useriat") * 1000
                    ).toLocaleString()}
                  </li>
                  <li className="list-group-item">
                    <strong>Expires At:</strong>{" "}
                    {new Date(
                      localStorage.getItem("userexp") * 1000
                    ).toLocaleString()}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5 py-5">
          <div className="col-md-3">
            <div className="info text-center">
              <i className="fa-solid fa-truck-fast fs-3 text-dark"></i>
              <h3 className="mt-2 mb-1">Free Shipping</h3>
              <p>For orders above £150</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info text-center">
              <i className="fa-solid fa-sack-dollar fs-3 text-dark"></i>
              <h3 className="mt-2 mb-1">Money Guarantee</h3>
              <p>30 days exchange</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info text-center">
              <i className="fa-solid fa-headset fs-3 text-dark"></i>
              <h3 className="mt-2 mb-1">Online Support</h3>
              <p>24/7 assistance</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="info text-center">
              <i className="fa-solid fa-credit-card fs-3 text-dark"></i>
              <h3 className="mt-2 mb-1">Flexible Payment</h3>
              <p>Multiple payment options</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
