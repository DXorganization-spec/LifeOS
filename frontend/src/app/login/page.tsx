"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const accessToken =
        response.data?.access_token;

      if (!accessToken) {
        localStorage.removeItem("token");
        alert("Login Failed");
        return;
      }

      localStorage.setItem(
        "token",
        accessToken
      );

      router.push("/dashboard");
    } catch (error) {
      localStorage.removeItem("token");
      alert("Login Failed");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>LifeOS Login</h1>

      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
