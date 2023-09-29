"use client";
import Link from "next/link";
import InputField from "../components/InputFeild";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
  };
  return (
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <InputField
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
