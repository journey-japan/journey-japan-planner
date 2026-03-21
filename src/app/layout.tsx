import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Journey Japan — Plan Your Perfect Japan Trip",
  description:
    "Browse curated itineraries from travel professionals, or build your own day-by-day plan with our intuitive drag-and-drop editor. Japan-focused trip planner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans text-gray-900 bg-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
