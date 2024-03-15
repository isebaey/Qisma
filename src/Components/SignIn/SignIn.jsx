import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import login from "../../Assets/login.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { AuthenticationContext } from "../../Context/AuthenticationContext";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function SignIn() {
  const authContext = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { fetchCartData } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (response.data.message === "success") {
          const userData = {
            user: response.data.user,
            token: response.data.token,
          };
          localStorage.setItem("token", userData.token);
          const signInResponse = await authContext.signIn(userData);
          if (signInResponse.success) {
            setRedirect(true);
            fetchCartData();
          } else {
            setError(signInResponse.error);
          }
        } else {
          setError("An error occurred during sign in.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Helmet>
        <title>Sign In to Qisma Store</title>
      </Helmet>
      <main className="overflow-hidden">
        <div className="row">
          <div className="col-md-6">
            <img className="img-fluid" src={login} alt="" />
          </div>
          <div className="ps-5 col-md-6 d-flex flex-column justify-content-center align-content-center">
            <h2>Welcome 👋</h2>
            <p className="text-muted">Please login here</p>
            <form onSubmit={formik.handleSubmit}>
              <label className="mt-4" htmlFor="email">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                className="form-control w-75"
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="alert alert-danger py-2 w-75">
                  {formik.errors.email}
                </div>
              ) : null}

              <label className="mt-4" htmlFor="password">
                Password <span className="text-danger">*</span>
              </label>
              <input
                className="form-control w-75"
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="alert alert-danger py-2 w-75">
                  {formik.errors.password}
                </div>
              ) : null}

              {formik.errors.backend ? (
                <div className="alert alert-danger mt-3 w-75 text-center">
                  {formik.errors.backend}
                </div>
              ) : null}

              <button
                type="submit"
                className="mt-4 btn btn-dark w-75 position-relative"
                style={{ height: "40px" }}
                disabled={formik.isSubmitting}
              >
                {loading ? (
                  <ClipLoader color="#fff" size={20} />
                ) : formik.values.email && formik.values.password ? (
                  <span>Login</span>
                ) : null}
              </button>
            </form>

            <div className="forget d-flex justify-content-between w-75">
              <Link
                to="/signup"
                className="mt-4 text-decoration-none text-dark"
              >
                Create an account?
              </Link>
              <Link
                to="/forgotpassword"
                className="mt-4 text-decoration-none text-dark"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
