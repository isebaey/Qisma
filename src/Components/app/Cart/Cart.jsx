import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { CartContext } from "../../../Context/CartContext";
import "./Cart.css";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";

export default function Cart() {
  const {
    loading,
    cartData,
    fetchCartData,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);

  useQuery("cartData", fetchCartData);

  if (loading || !cartData) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <PropagateLoader color="#000000" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="container p-5 m-5 mx-auto">
        <div className="row">
          <div className="col-md-8">
            <h2>Cart</h2>
            {cartData.products.map((item) => (
              <div
                className="every-procuct mt-4 d-flex justify-content-between align-items-center"
                key={item._id}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="me-3"
                    style={{ maxWidth: "100px" }}
                  />
                  <div>
                    <h5>
                      {item.product.title.split(" ").slice(0, 2).join(" ")}
                    </h5>
                    <p>{item.price} £</p>
                  </div>
                </div>
                <div className="add-and-remove border border-light rounded-3 d-flex justify-content-center align-items-center">
                  {item.count ? (
                    <button
                      className="btn btn-outline-dark me-2 fw-bold"
                      onClick={() => {
                        updateQuantity(item.product._id, item.count - 1);
                      }}
                    >
                      ــ
                    </button>
                  ) : (
                    <button className="btn btn-dark me-2 fw-bold disabled">
                      ــ
                    </button>
                  )}

                  <span>{item.count}</span>
                  <button
                    className="btn btn-outline-dark ms-2 fw-bold"
                    onClick={() => {
                      updateQuantity(item.product._id, item.count + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <i
                  className=" fa-regular fa-trash-can fa-xl text-danger delete-icon"
                  onClick={() => {
                    removeFromCart(item.product._id);
                  }}
                ></i>
              </div>
            ))}
            {cartData.products.length ? (
              <button
                className="mt-4 d-block btn btn-outline-danger "
                onClick={clearCart}
              >
                Clear Cart <i className="fa-solid fa-triangle-exclamation"></i>
              </button>
            ) : (
              ""
            )}{" "}
          </div>
          <div className="col-md-4 ps-5 pt-5 my-5">
            <h3>Summary</h3>
            <div className="delivery d-flex justify-content-between py-3">
              <p>Delivery Charge</p>
              <p>FREE</p>
            </div>
            <div className="total d-flex justify-content-between fw-bold">
              <p>Grand Total</p>
              <p>{cartData.totalCartPrice} £</p>
            </div>
            <Link to={"/Checkout"} className="btn mt-1 btn-dark w-100">
              Proceed to Checkout
            </Link>
          </div>
          <div className="p-5 text-bg-light mt-5">
            <p className="fs-3 fw-medium">Continue shopping</p>
            <p>
              Before placing a new order, take a moment to explore our
              collection of products. You might find something else you love!
            </p>
            <Link to={"/products"} className="btn btn-warning">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
