"use client";
import Link from "next/link";
import InputField from "../components/InputFeild";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Register() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/auth/register", {
        userName,
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Resgistration successful in component:", response.data);
        router.push("/login");
        // Handle successful login (e.g., redirect to a dashboard)
      } else {
        console.error("Resgistration failed:", response.data.error);
        // Handle login failure (e.g., display an error message)
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleRegister}>
        <InputField
          label="Name"
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
