import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar"; // ✅ same Component folder

export default function GreenLogin() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // ✅ LOGIN STATUS
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const dataaa = await axios.post(
        "http://localhost:2222/user/login",
        data
      );

      if (dataaa.data.status === 400) {
        toast.error(dataaa.data.message);
      } else {
        // ✅ SAME OLD LOGIC
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: dataaa.data.body._id,
            email: dataaa.data.body.email,
          })
        );

        toast.success(dataaa.data.message);

        // ✅ redirect (NO reload)
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <>
      {/* ✅ Navbar ONLY AFTER LOGIN */}
      {isLoggedIn && <Navbar />}

      <div className="wrap">
        <div className="card">
          <h1>Sign In</h1>
          <p>Please enter your credentials to continue</p>

          <form onSubmit={handleSubmit} onChange={handleChange}>
            <div className="field">
              <input
                type="email"
                name="email"
                value={data.email}
                className="form-control"
                required
              />
              <label>Email</label>
            </div>

            {/* 🔐 Forgot password */}
            <div className="forgot-password">
              <span onClick={() => navigate("/ForgotPassword")}>
                Forgot Password?
              </span>
            </div>

            <div className="field">
              <input
                type="password"
                name="password"
                value={data.password}
                className="form-control"
                required
              />
              <label>Password</label>
            </div>

            <button className="btn" type="submit">
              Sign In
            </button>

            <a className="account" href="/createaccount">
              Create a New Account?
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
