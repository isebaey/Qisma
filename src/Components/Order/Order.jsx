import React, { useContext, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

const Order = () => {
  const { orders, loading, getOrders } = useContext(CartContext);

  useEffect(() => {
    getOrders();
  }, []);

  const lastOrder =
    orders && orders.length > 0 ? orders[orders.length - 1] : null;

  return (
    <>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <div className="container mt-5 py-5 my-5">
        <h1 className="text-center mb-4 display-4">Last Order Details</h1>
        {loading ? (
          <div className="d-flex align-items-center justify-content-center">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <div className="row justify-content-center">
            {orders?.length > 0 ? (
              <div className="col-md-6">
                <div className="card shadow-sm py-4">
                  <div className="card-body">
                    <h5 className="card-title">
                      Order ID: <b>{lastOrder._id}</b>
                    </h5>
                    <p className="card-text mt-3">
                      <strong>Total Price:</strong> £{" "}
                      {lastOrder.totalOrderPrice}
                    </p>
                    <p className="card-text">
                      <strong>Payment Method:</strong>{" "}
                      <i class="fa-solid fa-sack-dollar text-success"></i>{" "}
                      {lastOrder.paymentMethodType}
                    </p>
                    <p className="card-text">
                      <strong>Is Paid:</strong>{" "}
                      {lastOrder.isPaid ? (
                        <i class="text-success fa-solid fa-circle-check text-success"></i>
                      ) : (
                        <i class="fa-solid fa-circle-xmark text-danger"></i>
                      )}
                      {lastOrder.isPaid ? "Yes" : " No"}
                    </p>
                    <p className="card-text">
                      <strong>Is Delivered:</strong>{" "}
                      {lastOrder.isDelivered ? (
                        <i class="fa-solid fa-circle-check text-success"></i>
                      ) : (
                        <i class="fa-solid fa-circle-xmark text-danger"></i>
                      )}
                      {lastOrder.isDelivered ? "Yes" : " No"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center">No orders found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
