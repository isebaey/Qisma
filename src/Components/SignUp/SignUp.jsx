import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import login from "../../Assets/login.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerSubmit(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(data);
      setLoading(false);
      setBackendMessage(data.message);
      if (data.message === "success") {
        setRedirect(true);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setBackendMessage(error.response.data.message);
      } else {
        setBackendMessage("An error occurred. Please try again later.");
      }
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum length is 3")
      .max(10, "Max length is 10"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][\w @]{5,8}$/, "Invalid password (e.g. Ahmad@123)"),
    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Password and rePassword do not match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian phone number"
      ),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Sign Up to Qisma Store</title>
      </Helmet>

      <main className="">
        <div className="">
          <div className="row">
            <div className="col-md-6">
              <img className="img-fluid" src={login} alt="" />
            </div>
            <div className="ps-5 col-md-6 d-flex flex-column justify-content-center align-content-center">
              <h2>Create account 👋</h2>
              <p className="text-muted">Please enter details</p>
              <form onSubmit={formik.handleSubmit}>
                <label className="mt-4" htmlFor="name">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control w-75"
                  type="text"
                  name="name"
                  id="name"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger py-2 w-75">
                    {formik.errors.name}
                  </div>
                ) : null}

                <label className="mt-4" htmlFor="email">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control w-75"
                  type="email"
                  name="email"
                  id="email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alert alert-danger py-2 w-75">
                    {formik.errors.email}
                  </div>
                ) : null}

                <label className="mt-4" htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control w-75"
                  type="password"
                  name="password"
                  id="password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alert alert-danger py-2 w-75">
                    {formik.errors.password}
                  </div>
                ) : null}

                <label className="mt-4" htmlFor="rePassword">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control w-75"
                  type="password"
                  name="rePassword"
                  id="rePassword"
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="alert alert-danger py-2 w-75">
                    {formik.errors.rePassword}
                  </div>
                ) : null}

                <label className="mt-4" htmlFor="phone">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className="form-control w-75"
                  type="tel"
                  name="phone"
                  id="phone"
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger py-2 w-75">
                    {formik.errors.phone}
                  </div>
                ) : null}

                <button
                  disabled={
                    !formik.isValid || formik.dirty === false || loading
                  }
                  type="submit"
                  className="mt-4 btn btn-dark w-75 position-relative"
                  style={{ height: "40px" }} // Adjust the height as needed
                >
                  {loading && (
                    <ClipLoader
                      color="#fff"
                      size={20}
                      className="position-absolute top-50 start-50 translate-middle"
                    />
                  )}
                  <span className={loading ? "visually-hidden" : ""}>
                    Sign Up
                  </span>
                </button>
                {backendMessage && (
                  <div
                    className={`alert ${
                      backendMessage === "success"
                        ? "alert-success"
                        : "alert-danger"
                    } py-2 mt-3 w-75 text-center`}
                  >
                    {backendMessage === "success"
                      ? "Account created successfully!"
                      : backendMessage}
                  </div>
                )}
              </form>
              <div className="forget d-flex justify-content-between w-75">
                <Link
                  to={"/signin"}
                  className="mt-4 text-decoration-none text-dark"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
