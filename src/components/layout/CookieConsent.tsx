"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getCookiePreferences,
  saveCookiePreferences,
  type CookiePreferences,
} from "@/lib/cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const prefs = getCookiePreferences();
    if (!prefs) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const save = useCallback(
    (prefs: Pick<CookiePreferences, "analytics" | "marketing">) => {
      saveCookiePreferences(prefs);
      setVisible(false);
      // Notify other components (e.g. GoogleAnalytics) about consent change
      window.dispatchEvent(new Event("cookie-consent-change"));
    },
    [],
  );

  function handleAcceptAll() {
    save({ analytics: true, marketing: true });
  }

  function handleRejectAll() {
    save({ analytics: false, marketing: false });
  }

  function handleSavePreferences() {
    save({ analytics, marketing });
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl border border-gray-200 p-5 pointer-events-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-1">
          We value your privacy
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4">
          We use cookies to provide essential site functionality and, with your
          consent, for analytics and marketing purposes. You can choose which
          categories to allow.{" "}
          <a href="/privacy" className="text-accent hover:underline">
            Learn more
          </a>
        </p>

        {showDetails && (
          <div className="space-y-3 mb-4 border-t border-gray-100 pt-4">
            {/* Necessary — always on */}
            <label className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Necessary
                </span>
                <p className="text-xs text-gray-500">
                  Required for the site to function. Cannot be disabled.
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-accent rounded-full opacity-60 cursor-not-allowed" />
                <div className="absolute left-[18px] top-[2px] w-4 h-4 bg-white rounded-full" />
              </div>
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Analytics
                </span>
                <p className="text-xs text-gray-500">
                  Help us understand how visitors use our site (Google Analytics).
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                onClick={() => setAnalytics(!analytics)}
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  analytics ? "bg-accent" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-transform ${
                    analytics ? "left-[18px]" : "left-[2px]"
                  }`}
                />
              </button>
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  Marketing
                </span>
                <p className="text-xs text-gray-500">
                  Used to deliver relevant ads and measure campaign effectiveness.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={marketing}
                onClick={() => setMarketing(!marketing)}
                className={`relative w-9 h-5 rounded-full transition-colors ${
                  marketing ? "bg-accent" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-[2px] w-4 h-4 bg-white rounded-full transition-transform ${
                    marketing ? "left-[18px]" : "left-[2px]"
                  }`}
                />
              </button>
            </label>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {!showDetails ? (
            <>
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
              >
                Accept All
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
              >
                Save Preferences
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
