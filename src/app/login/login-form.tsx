"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function Login() {
  const [state, formAction, pending] = useActionState(login, null);
  const message = state?.message;

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="mx-auto my-5 w-[500px] max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h1>
        <form className="space-y-4" action={formAction}>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          {message && <p className="text-sm text-red-500">{message}</p>}
          <button
            formAction={formAction}
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
