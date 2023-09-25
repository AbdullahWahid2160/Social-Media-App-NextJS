"use client";
import Link from "next/link";
import InputField from "../components/InputFeild";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Login successful in component:", response.data);
        router.push("/feed");
        // Handle successful login (e.g., redirect to a dashboard)
      } else {
        console.error("Login failed:", response.data.error);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
