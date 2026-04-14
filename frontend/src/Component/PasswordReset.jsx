import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:2222/user/forgot-password",
        { email }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="wrap forgot-page">
      <div className="card">
        <h1>Forgot Password</h1>
        <p>Enter your email to reset password</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <button className="btn">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}
