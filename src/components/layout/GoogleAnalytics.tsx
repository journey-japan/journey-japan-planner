"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasConsentFor } from "@/lib/cookie-consent";

const GA_ID = "G-5HXRQZT8LF";

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    function checkConsent() {
      setEnabled(hasConsentFor("analytics"));
    }

    checkConsent();

    // Re-check when consent changes
    window.addEventListener("cookie-consent-change", checkConsent);
    return () =>
      window.removeEventListener("cookie-consent-change", checkConsent);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
