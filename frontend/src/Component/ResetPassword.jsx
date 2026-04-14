import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // ✅ token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Invalid reset link");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post(
        "http://localhost:2222/user/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      toast.success(res.data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="wrap reset-page">
      <div className="card">
        <h1>Reset Password</h1>
        <p>Enter your new password</p>

        <form onSubmit={handleSubmit}>

          <div className="field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>New Password</label>
          </div>

          <div className="field">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
          </div>

          <button className="btn">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
