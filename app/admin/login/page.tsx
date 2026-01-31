"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for registration success message
    if (searchParams.get("registered") === "true") {
      setSuccess("Registration successful! You can now log in.");
      // Optional: remove the query param from URL without reloading
      router.replace("/admin/login", { scroll: false });
    }

    const stored = localStorage.getItem("bis_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.id) {
          router.replace("/admin/dashboard");
        }
      } catch (err) {
        console.error("Invalid token data");
        localStorage.removeItem("bis_data");
      }
    }
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("bis_data", JSON.stringify(data));
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Admin Login
        </h1>

        {success && (
          <div
            className="px-4 py-3 text-sm text-green-700 bg-green-100 border border-green-200 rounded-lg"
            role="alert"
          >
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && (
            <div
              className="px-4 py-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          <Link
            href="/admin/register"
            className="text-blue-600 hover:underline"
          >
            Don&apos;t have an account? Register
          </Link>
        </p>
      </div>
    </div>
  );
}
