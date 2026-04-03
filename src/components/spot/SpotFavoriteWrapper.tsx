"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserFavoriteSpotIds } from "@/lib/db";
import FavoriteButton from "./FavoriteButton";

interface SpotFavoriteWrapperProps {
  spotId: string;
}

export default function SpotFavoriteWrapper({ spotId }: SpotFavoriteWrapperProps) {
  const { user, loading } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    getUserFavoriteSpotIds(user.id).then((ids) => {
      setIsFavorited(ids.includes(spotId));
      setChecked(true);
    });
  }, [user, loading, spotId]);

  if (!user || !checked) return null;

  return (
    <FavoriteButton
      spotId={spotId}
      isFavorited={isFavorited}
      size="md"
      onToggle={(fav) => setIsFavorited(fav)}
    />
  );
}
