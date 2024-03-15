import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailResetDone, setEmailResetDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "resetCode") {
      setResetCode(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Reset Code:", resetCode);
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          resetCode,
        }
      );
      console.log("success", response.data.status);
      setVerificationStatus("success");
      toast.success("Reset code verified successfully!");
    } catch (error) {
      setError("An error occurred.");
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email,
          newPassword,
        }
      );
      console.log(response.data);
      toast.success("Password reset successfully!");
      localStorage.setItem("token", response.data);
      setEmailResetDone(true);
    } catch (error) {
      setError("An error occurred.");
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  }

  if (emailResetDone) {
    return <Navigate to="/Home" />;
  }

  return (
    <main className="container p-5 my-5">
      <div className="row justify-content-center my-5 py-5">
        <div className="col-md-6">
          <div className="card p-4">
            {verificationStatus === "success" ? (
              <form onSubmit={handlePasswordReset}>
                <h2 className="text-center mb-4">Reset your Account</h2>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-dark mt-3 w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#fff" size={20} loading={loading} />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Verify Reset Code</h2>
                <div className="form-group">
                  <label htmlFor="resetCode">Reset Code</label>
                  <input
                    className="form-control"
                    type="text"
                    name="resetCode"
                    id="resetCode"
                    value={resetCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="submit"
                  className="btn btn-dark mt-3 w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#fff" size={20} loading={loading} />
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>
            )}
            <div className="mt-3 text-center">
              <Link className="text-decoration-none text-dark" to="/signin">
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
