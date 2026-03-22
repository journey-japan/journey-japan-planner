"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import LoginModal from "@/components/auth/LoginModal";

export default function Header() {
  const { user, profile, loading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen for custom event from editor page's "Log in to unlock" button
  useEffect(() => {
    function handleOpenLoginModal() {
      setLoginModalOpen(true);
    }
    window.addEventListener("open-login-modal", handleOpenLoginModal);
    return () => window.removeEventListener("open-login-modal", handleOpenLoginModal);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-sm">
              J
            </div>
            <span className="text-lg font-bold">
              Journey <span className="text-accent">Japan</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <Link href="/itineraries" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Itineraries
            </Link>
            <Link href="/destinations/tokyo" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Destinations
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Pro Picks
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Blog
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors"
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.display_name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-medium">
                      {(profile?.display_name || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {profile?.display_name || user.email?.split("@")[0]}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {profile?.display_name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      {profile?.is_pro && (
                        <span className="inline-block mt-1 text-xs font-semibold text-accent bg-accent-light px-2 py-0.5 rounded-full">
                          PRO
                        </span>
                      )}
                    </div>
                    <Link
                      href="/editor/new"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      + Create New Itinerary
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      My Itineraries
                    </Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          signOut();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                Log in
              </button>
            )}
            <Link
              href="/editor/new"
              className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2 rounded-lg transition-colors"
            >
              Plan a Trip
            </Link>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
}
