import login_image from "../assets/login_image.svg";
import { LuUser } from "react-icons/lu";
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";
import { useState } from "react";
import Cookies from "js-cookie";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Footer from "../components/Footer.jsx";
import medics_logo from "../assets/medics_logo.svg";

import aryu_logo from "../assets/aryu_logo.svg";

const Login = () => {
  let navigate = useNavigate();

  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function onCLickLogin() {
  // const onCLickLogin = async (e) => {
  //   setError("");
  //   e.preventDefault();
  //   try {
  //     // Make API request to login
  //     const response = await axios.post(`${API_URL}/api/auth/login`, formData);
  //     console.log(response);
  //     if (response.data && response.data.token) {
  //       const data = response.data;
  //       console.log(data.user);
  //       // Store user data and token
  //       localStorage.setItem("hrmsuser", JSON.stringify(data.user)); // Corrected: JSON.stringify
  //       Cookies.set("token", data.token, { path: "/" }); // Corrected: path adjusted

  //       // Navigate to the dashboard
  //       console.log("login redirect..");

  //       navigate("/dashboard", { replace: true }); // 'replace' avoids adding to history stack
  //       window.location.reload();
  //       console.log("hello");
  //       // Scroll to the top of the page
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "instant",
  //       });
  //     }else if (response.data && response.data.message) {

  //     }

  //     else {
  //       setError({ general: "Login failed, token not found." });
  //     }
  //   } catch (err) {
  //     console.log(err.response.data);
  //     if (err.response) {
  //       setError(err.response.data);
  //     } else {
  //       setError({ general: "An unexpected error occurred." });
  //     }
  //   }
  // };
  const onCLickLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);

      if (response.data && response.data.token) {
        const data = response.data;

        // Store user data and token
        localStorage.setItem("hrmsuser", JSON.stringify(data.user));
        Cookies.set("token", data.token, { path: "/" });
        localStorage.setItem("admin_token",data.token);
        //  Redirect based on backend response
        navigate(data.redirect || "/dashboard", { replace: true });

        // Optional refresh
        window.scrollTo({ top: 0, behavior: "instant" });
        window.location.reload();
      } else {
        setError({ general: "Login failed, token not found." });
      }
    } catch (err) {
      console.log(err.response?.data || err);
      setError(
        err.response?.data || { general: "An unexpected error occurred." }
      );
    }
  };

  const handleKeyUp = (event) => {
    setError("");
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility state
  };

  return (
    <div className="min-h-screen bg-[#F8F8FA]">
      <div className="flex  items-center justify-center ">
        <img src={aryu_logo} alt="" className="w-20 mt-6" />
        {/* <img src={medics_logo} alt="" /> */}
        {/* <img src={medicsresearch_logo} alt="" /> */}
      </div>

      <p className="font-semibold text-3xl md:text-4xl text-[#0050aa] text-center pt-10 font-se">
        HR MANAGEMENT SYSTEM
      </p>

      <div className="flex items-center justify-center  ">
        <div className="lg:basis-[50%] flex flex-col items-center justify-center gap-3">
          <p className="text-[#0050aa] font-semibold font text-2xl md:text-4xl">
          HRMS ADMIN LOGIN
          </p>
          {/* <form onSubmit={handlesubmit}> */}
          <div className="flex md:w-[450px] gap-3 items-center mt-3 bg-white px-5 py-4 rounded-2xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)]">
            <LuUser className="text-2xl" />
            <input
              type="text"
              placeholder="Username"
              name="email"
              id="email"
              // value={formData.email}
              onChange={handleInputChange}
              className="border-none w-full outline-none bg-transparent text-black placeholder-black"
              onKeyUp={handleKeyUp}
            />
          </div>
          {error?.email && <p className="error text-red-500">{error?.email}</p>}

          <div className="relative flex md:w-[450px] gap-3 items-center mt-3 bg-white px-5 py-4 rounded-2xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)]">
            <SlLock className="text-2xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              // value={formData.password}
              onChange={handleInputChange}
              className="border-none w-full outline-none bg-transparent text-black placeholder-black"
              onKeyUp={handleKeyUp}
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 cursor-pointer"
            >
              {showPassword ? (
                <FaEye className="text-2xl" />
              ) : (
                <FaEyeSlash className="text-2xl" />
              )}
            </span>
          </div>
          {error?.password && (
            <p className="error text-red-500">{error.password}</p>
          )}

          <button
            onClick={onCLickLogin}
            className="font-semibold  mt-3  bg-gradient-to-r from-[#004faac3] to-[#0050aa] px-8 py-3 rounded-full text-white hover:scale-105 duration-300"
          >
            Login Now
          </button>
          {/* </form> */}
        </div>

        <div className="basis-[50%] max-lg:hidden ">
          <img src={login_image} alt="" className="w-[550px]" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
