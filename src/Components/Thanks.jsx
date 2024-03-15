import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { PropagateLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function Thanks() {
  const { getOrders, orders } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
    setLoading(false);
  }, []);

  const lastOrder =
    orders && orders.length > 0 ? orders[orders.length - 1] : null;

  return (
    <>
      <Helmet>
        <title>Thanks</title>
      </Helmet>

      {loading ? (
        <div className="loader-container d-flex align-items-center justify-content-center">
          <PropagateLoader color="#000000" />
        </div>
      ) : (
        <div className="pt-5 mt-5 container text-center d-flex flex-column justify-content-center vh-100">
          <div className="order-details mt-5 pt-5">
            <h1 className="mt-5 pt-5 fw-bolder">Thank you for your order!</h1>
            {lastOrder ? (
              <p className="my-3">
                Your order has been confirmed. You will receive an email
                confirmation shortly. Your order ID is <b>{lastOrder._id}</b>
              </p>
            ) : (
              <p className="my-3">No orders found.</p>
            )}
            <div className="buttons mt-4">
              <Link className="btn btn-dark btn-lg" to={"/order"}>
                View order
              </Link>
              <Link className="btn btn-outline-dark btn-lg ms-3" to={"/orders"}>
                View all orders
              </Link>
            </div>{" "}
          </div>
          <div className="row mb-5 mt-auto">
            <div className="col-md-3">
              <div className="info d-flex flex-column align-items-start gap-2">
                <i className="fa-solid fa-truck-fast fs-3 "></i>
                <h3>Free Shipping</h3>
                <p>Free shipping for orders above £150</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info d-flex flex-column align-items-start gap-2">
                <i className="fa-solid fa-sack-dollar fs-3 "></i>
                <h3>Money Guarantee</h3>
                <p>Within 30 days for an exchange</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info d-flex flex-column align-items-start gap-2">
                <i className="fa-solid fa-headset fs-3 "></i>
                <h3>Online Support</h3>
                <p>24 hours a day, 7 days a week</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info d-flex flex-column align-items-start gap-2">
                <i className="fa-solid fa-credit-card fs-3 "></i>
                <h3>Flexible Payment</h3>
                <p>Pay with multiple credit cards</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
