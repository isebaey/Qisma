import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Offline>
        <div
          className="offline-notification d-flex flex-column justify-content-center align-items-center  position-fixed"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: "9999",
          }}
        >
          <p className="m-0 fs-5 ">You are offline!</p>
          <p className="m-0 fs-5 ">Please check your internet connection.</p>
        </div>
      </Offline>
      <Outlet />
      <Footer />
    </>
  );
}
