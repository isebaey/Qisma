import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          { email: values.email }
        );
        if (response.data.statusMsg === "success") {
          setEmailSent(true);
          toast.success("Check your email for the Reset code please");
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
  });

  if (emailSent) {
    return <Navigate to="/verifycode" />;
  }

  return (
    <div className="pt-5 mt-5">
      <main className="container p-5 my-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <h2 className="text-center mb-4">Forgot Password</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-dark mt-3 w-100"
                  disabled={formik.isSubmitting}
                >
                  {loading ? (
                    <ClipLoader color="#fff" size={20} loading={loading} />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-3 text-center">
                <Link className="text-decoration-none text-dark" to="/signin">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
    </div>
  );
}
