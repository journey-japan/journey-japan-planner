import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import CookieConsent from "@/components/layout/CookieConsent";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";

const SITE_URL = "https://plan.journeyjpn.com";
const SITE_NAME = "Journey Japan";
const SITE_DESCRIPTION =
  "Plan your perfect Japan trip with itineraries curated by professional travel agents. Customize your schedule with an intuitive drag-and-drop editor, explore 50+ must-visit spots in Tokyo, Kyoto & Osaka, and book tours directly from your plan — all for free.";

export const metadata: Metadata = {
  title: {
    default: "Journey Japan — Free Japan Trip Planner by Professional Travel Agents",
    template: "%s | Journey Japan",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Japan trip planner",
    "Japan itinerary",
    "Tokyo itinerary",
    "Kyoto itinerary",
    "Osaka itinerary",
    "Japan travel",
    "Japan vacation planner",
    "drag and drop trip planner",
    "Japan travel guide",
    "best things to do in Tokyo",
    "Japan trip builder",
    "free Japan itinerary planner",
    "customizable Japan itinerary",
    "professional travel agent Japan itinerary",
    "book Japan tours online",
    "Japan trip planning tool",
    "interactive Japan travel planner",
    "Japan sightseeing planner",
    "plan trip to Japan",
    "Japan travel booking",
  ],
  authors: [{ name: "Journey Japan" }],
  creator: "Journey Japan",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Journey Japan — Drag & Drop Japan Trip Planner by Travel Pros",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/hero-bg_r1.jpg",
        width: 1200,
        height: 630,
        alt: "Journey Japan — customizable Japan trip planner with drag-and-drop editor and professional itineraries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Japan — Drag & Drop Japan Trip Planner by Travel Pros",
    description: SITE_DESCRIPTION,
    images: ["/hero-bg_r1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 bg-white">
        <AuthProvider>
          {children}
          <CookieConsent />
          <GoogleAnalytics />
        </AuthProvider>
      </body>
    </html>
  );
}
