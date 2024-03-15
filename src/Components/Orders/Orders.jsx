import React, { useContext, useEffect } from "react";
import { PropagateLoader } from "react-spinners";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

const Orders = () => {
  const { orders, loading, getOrders } = useContext(CartContext);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      <div className="container mt-5 py-5">
        <h1 className="text-center mb-4 display-4">Your Orders</h1>
        {loading ? (
          <div className="vh-100 d-flex align-items-center justify-content-center">
            <PropagateLoader color="#000000" />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {orders?.map((order) => (
              <div key={order._id} className="col">
                <div className="card h-100 shadow border-0">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <p className="card-text">
                      <strong>Total Price:</strong> £ {order.totalOrderPrice}
                    </p>
                    <p className="card-text">
                      <strong>Payment Method:</strong> {order.paymentMethodType}
                    </p>
                    <p className="card-text">
                      <strong>Is Paid:</strong>{" "}
                      <span
                        className={`text-${
                          order.isPaid ? "success" : "danger"
                        }`}
                      >
                        {order.isPaid ? "Yes" : "No"}
                      </span>
                    </p>
                    <p className="card-text">
                      <strong>Is Delivered:</strong>{" "}
                      <span
                        className={`text-${
                          order.isDelivered ? "success" : "danger"
                        }`}
                      >
                        {order.isDelivered ? "Yes" : "No"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
