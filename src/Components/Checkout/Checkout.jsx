import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const { cartId } = useContext(CartContext);
  const [redirect, setRedirect] = useState(false);

  async function createCashOrder(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const details = formData.get("details");
    const phone = formData.get("phone");
    const city = formData.get("city");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress: {
            details,
            phone,
            city,
          },
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      console.log(response.data.data.user);
      setLoading(false);
      setRedirect(true);
    } catch (error) {
      console.log("Create Order Error:", error);
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to="/thanks" />;
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="pt-5 mt-5">
        <main className="container p-5 my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4">
                <h2 className="text-center mb-4">Checkout</h2>
                <form onSubmit={createCashOrder}>
                  <div className="form-group">
                    <label htmlFor="phone">Your Phone</label>
                    <input
                      className="form-control"
                      type="tel"
                      name="phone"
                      id="phone"
                    />

                    <label className="mt-3" htmlFor="details">
                      Your Address
                    </label>
                    <input
                      className="form-control"
                      type="address"
                      name="details"
                      id="details"
                    />

                    <label className="mt-3" htmlFor="city">
                      City
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="city"
                      id="city"
                    />
                  </div>
                  <button type="submit" className="btn btn-dark mt-3 w-100">
                    {loading ? (
                      <ClipLoader color="#fff" size={20} loading={loading} />
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <Link className="text-decoration-none text-dark" to="/cart">
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
