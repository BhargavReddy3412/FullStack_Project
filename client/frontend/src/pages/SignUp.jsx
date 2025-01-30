import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../url";

const SignUp = () => {
  const [signUpValues, setSignUpValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "user", // Default role set to 'user'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpValues({ ...signUpValues, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      if (
        signUpValues.username === "" ||
        signUpValues.email === "" ||
        signUpValues.password === "" ||
        signUpValues.address === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${path}/Api/v1/sign-up`,
          signUpValues
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label className="text-zinc-400"> Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={signUpValues.username}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Email</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              required
              value={signUpValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={signUpValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={signUpValues.address}
              onChange={handleChange}
            />
          </div>
          {/* Role Selection */}
          <div className="mt-4">
            <label className="text-zinc-400">Role</label>
            <select
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              name="role"
              value={signUpValues.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition-all duration-300"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an Account? &nbsp;
            <Link to="/LogIn" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
