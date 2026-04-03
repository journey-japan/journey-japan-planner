"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { addFavorite, removeFavorite } from "@/lib/db";

interface FavoriteButtonProps {
  spotId: string;
  isFavorited: boolean;
  size?: "sm" | "md";
  onToggle?: (isFavorited: boolean) => void;
}

export default function FavoriteButton({ spotId, isFavorited: initialFavorited, size = "md", onToggle }: FavoriteButtonProps) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.dispatchEvent(new Event("open-login-modal"));
      return;
    }

    setLoading(true);
    const newState = !favorited;

    // Optimistic update
    setFavorited(newState);

    const success = newState
      ? await addFavorite(user.id, spotId)
      : await removeFavorite(user.id, spotId);

    if (!success) {
      setFavorited(!newState); // Revert
    } else {
      onToggle?.(newState);
    }

    setLoading(false);
  }

  const iconSize = size === "sm" ? 16 : 20;
  const btnSize = size === "sm" ? "w-7 h-7" : "w-9 h-9";

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`${btnSize} rounded-full flex items-center justify-center transition-all ${
        favorited
          ? "text-red-500 bg-red-50 hover:bg-red-100"
          : "text-gray-400 bg-white/80 hover:text-red-400 hover:bg-red-50"
      } ${loading ? "opacity-50" : ""}`}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
