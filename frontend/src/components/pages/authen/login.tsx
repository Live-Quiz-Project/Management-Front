import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      console.log("Login successful", data);
    } catch (error) {
      console.error("An error occurred during login", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* <!-- Logo Section --> */}
      <div className="flex-1 flex justify-center items-center bg-oceanBlue">
        {/* <!-- Replace with your actual logo --> */}
        <img src={logo} alt="Logo" className="w-1/2" />
      </div>
      {/* <!-- Login Form Section --> */}
      <div className="flex-1 grid justify-center bg-peach">
        <h1 className="text-2xl font-bold grid justify-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block p-2 border border-gray-300 rounded"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
