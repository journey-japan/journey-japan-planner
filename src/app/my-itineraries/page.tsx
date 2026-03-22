"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/lib/auth-context";
import { getUserItineraries } from "@/lib/db";
import type { Itinerary } from "@/types";

export default function MyItinerariesPage() {
  const { user, loading: authLoading } = useAuth();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    getUserItineraries(user.id).then((data) => {
      setItineraries(data);
      setLoading(false);
    });
  }, [user, authLoading]);

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">My Itineraries</h1>
          <Link
            href="/editor/new"
            className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-5 py-2.5 rounded-lg transition-colors"
          >
            + Create New
          </Link>
        </div>

        {/* Not logged in */}
        {!authLoading && !user && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Log in to see your itineraries</h2>
            <p className="text-sm text-gray-500 mb-6">
              Save and manage your Japan trip plans by creating an account.
            </p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-login-modal"))}
              className="text-sm font-medium text-white bg-accent hover:bg-accent-hover px-6 py-2.5 rounded-lg transition-colors"
            >
              Log In
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && user && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-500">Loading your itineraries...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && user && itineraries.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">No itineraries yet</h2>
            <p className="text-sm text-gray-500 mb-6">
              Start planning your Japan trip and publish your first itinerary.
            </p>
            <Link
              href="/editor/new"
              className="inline-block text-sm font-medium text-white bg-accent hover:bg-accent-hover px-6 py-2.5 rounded-lg transition-colors"
            >
              Start Planning
            </Link>
          </div>
        )}

        {/* Itinerary list */}
        {!loading && itineraries.length > 0 && (
          <div className="space-y-4">
            {itineraries.map((itin) => (
              <Link
                key={itin.id}
                href={`/itineraries/${itin.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-accent hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-900 group-hover:text-accent transition-colors truncate">
                        {itin.title}
                      </h2>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          itin.status === "published"
                            ? "bg-accent-light text-accent"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {itin.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                      {itin.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="capitalize">📍 {itin.area}</span>
                      <span>📅 {itin.durationDays} days</span>
                      <span>👁 {itin.viewCount} views</span>
                      <span>
                        Updated{" "}
                        {new Date(itin.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-300 group-hover:text-accent flex-shrink-0 mt-1 ml-4 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
