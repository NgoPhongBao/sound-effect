"use client";

import { useState } from "react";
import { login } from "./actions";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto my-5 w-[500px] max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button
            formAction={login}
            className="w-full rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600 focus:outline-none"
          >
            Login
          </button>
          {/* <button
            formAction={signup}
            className="w-full rounded-lg bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600 focus:outline-none"
          >
            Signup
          </button> */}
        </form>
      </div>
    </div>
  );
}
