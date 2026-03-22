import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import CookieConsent from "@/components/layout/CookieConsent";

const SITE_URL = "https://plan.journeyjpn.com";
const SITE_NAME = "Journey Japan";
const SITE_DESCRIPTION =
  "Plan your perfect Japan trip with curated itineraries from travel professionals. Drag-and-drop editor, interactive maps, and 50+ must-visit spots in Tokyo, Kyoto, Osaka & more.";

export const metadata: Metadata = {
  title: {
    default: "Journey Japan — Plan Your Perfect Japan Trip",
    template: "%s | Journey Japan",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Japan trip planner",
    "Japan itinerary",
    "Tokyo itinerary",
    "Kyoto itinerary",
    "Japan travel",
    "Japan vacation planner",
    "drag and drop trip planner",
    "Japan travel guide",
    "best things to do in Tokyo",
    "Japan trip builder",
    "free Japan itinerary planner",
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
    title: "Journey Japan — Plan Your Perfect Japan Trip",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/hero-bg_r1.jpg",
        width: 1200,
        height: 630,
        alt: "Journey Japan — Japan Trip Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journey Japan — Plan Your Perfect Japan Trip",
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
        </AuthProvider>
      </body>
    </html>
  );
}
