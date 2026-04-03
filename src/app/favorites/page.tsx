"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getUserFavoriteSpots } from "@/lib/db";
import { formatAdmissionFee } from "@/lib/format";
import FavoriteButton from "@/components/spot/FavoriteButton";
import type { Spot } from "@/types";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/");
      return;
    }
    getUserFavoriteSpots(user.id).then((data) => {
      setSpots(data);
      setLoading(false);
    });
  }, [user, authLoading, router]);

  function handleRemove(spotId: string) {
    setSpots((prev) => prev.filter((s) => s.id !== spotId));
  }

  if (authLoading || loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">My Favorites</h1>
              <p className="text-sm text-gray-500 mt-1">
                {spots.length} saved spot{spots.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/editor/new"
              className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
            >
              Plan a Trip
            </Link>
          </div>

          {spots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {spots.map((spot) => {
                const fee = formatAdmissionFee(spot.admissionFee, spot.admissionFeeCurrency);
                const areaLabel = spot.area.charAt(0).toUpperCase() + spot.area.slice(1);

                return (
                  <div key={spot.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <Link href={spot.slug ? `/spots/${spot.slug}` : `/destinations/${spot.area}`}>
                      <div className="relative h-40 bg-gray-100">
                        {spot.photoUrls?.[0] ? (
                          <Image
                            src={spot.photoUrls[0]}
                            alt={spot.nameEn}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                            📍
                          </div>
                        )}
                        <span className="absolute top-3 left-3 text-xs font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {areaLabel}
                        </span>
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={spot.slug ? `/spots/${spot.slug}` : `/destinations/${spot.area}`}>
                          <h3 className="text-sm font-semibold text-gray-900 leading-tight hover:text-accent transition-colors">
                            {spot.nameEn}
                          </h3>
                          <p className="text-xs text-gray-400 mt-0.5">{spot.nameJa}</p>
                        </Link>
                        <FavoriteButton
                          spotId={spot.id}
                          isFavorited={true}
                          size="sm"
                          onToggle={(fav) => { if (!fav) handleRemove(spot.id); }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">
                        {spot.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                        <span>⏱ ~{spot.avgDurationMin} min</span>
                        {fee && <span>🎫 {fee}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
              <p className="text-4xl mb-4">♡</p>
              <p className="text-gray-400 text-lg mb-2">No favorites yet</p>
              <p className="text-gray-400 text-sm mb-6">
                Browse destinations and tap the heart icon to save spots you love.
              </p>
              <Link
                href="/destinations/tokyo"
                className="bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                Explore Tokyo
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
