"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const { error: signInError } = await authClient.signIn.email({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    setLoading(false);
    if (signInError) {
      setError(
        signInError.status === 429
          ? "Too many attempts. Try again in a minute."
          : "Invalid email or password."
      );
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-xs">
        <h1 className="text-xl font-bold tracking-tight text-black text-center mb-6">
          Webmaster Sign In
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-black mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Webmaster email"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm text-black placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-black mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-sm text-black placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 outline-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex justify-center items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}