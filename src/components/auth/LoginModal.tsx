"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

type AuthMode = "login" | "signup" | "magic-link" | "magic-link-sent" | "signup-success";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, signInWithMagicLink } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function resetForm() {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setError("");
    setLoading(false);
  }

  function handleClose() {
    resetForm();
    setMode("login");
    onClose();
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "login") {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        handleClose();
      }
    } else if (mode === "signup") {
      if (!displayName.trim()) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }
      const { error } = await signUpWithEmail(email, password, displayName);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setError("");
        setMode("signup-success");
        setLoading(false);
      }
    } else if (mode === "magic-link") {
      const { error } = await signInWithMagicLink(email);
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setMode("magic-link-sent");
        setLoading(false);
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
            J
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "signup" ? "Create your account" : mode === "signup-success" ? "Almost there!" : "Welcome back"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {mode === "signup"
              ? "Start planning your perfect Japan trip"
              : mode === "signup-success"
              ? "Just one more step"
              : "Log in to continue planning"}
          </p>
        </div>

        {/* Signup success state */}
        {mode === "signup-success" ? (
          <div className="px-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Account created!</h3>
            <p className="text-sm text-gray-500 mb-6">
              We&apos;ve sent a confirmation email to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
            </p>
            <button
              onClick={() => { setMode("login"); resetForm(); }}
              className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
            >
              Back to Log In
            </button>
          </div>
        ) : mode === "magic-link-sent" ? (
          <div className="px-8 pb-8 text-center">
            <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Check your email</h3>
            <p className="text-sm text-gray-500 mb-6">
              We sent a magic link to <strong>{email}</strong>. Click the link in the email to sign in.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="px-8 pb-8">
            {/* Social logins */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  signInWithGoogle();
                  handleClose();
                }}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Your name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              )}

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />

              {mode !== "magic-link" && (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              )}

              {error && (
                <p className="text-xs text-red-500 px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {loading
                  ? "..."
                  : mode === "signup"
                  ? "Create Account"
                  : mode === "magic-link"
                  ? "Send Magic Link"
                  : "Log In"}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-5 text-center space-y-2">
              {mode === "login" && (
                <>
                  <button
                    onClick={() => { setMode("magic-link"); setError(""); }}
                    className="text-xs text-accent hover:underline"
                  >
                    Sign in with magic link instead
                  </button>
                  <p className="text-xs text-gray-500">
                    Don&apos;t have an account?{" "}
                    <button
                      onClick={() => { setMode("signup"); setError(""); }}
                      className="text-accent font-medium hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}
              {mode === "signup" && (
                <p className="text-xs text-gray-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => { setMode("login"); setError(""); }}
                    className="text-accent font-medium hover:underline"
                  >
                    Log in
                  </button>
                </p>
              )}
              {mode === "magic-link" && (
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-xs text-accent hover:underline"
                >
                  Back to password login
                </button>
              )}
            </div>

            {/* Terms */}
            <p className="text-[11px] text-gray-400 text-center mt-5 leading-relaxed">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and{" "}
              <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
            </p>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
