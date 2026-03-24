"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ItineraryItem } from "@/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Tokyo center coordinates
const TOKYO_CENTER = { lat: 35.6762, lng: 139.7503 };

interface GoogleMapProps {
  items: ItineraryItem[];
  activeItemIndex?: number;
  onMarkerClick?: (index: number) => void;
}

// Load Google Maps script once
let isScriptLoaded = false;
let isScriptLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve) => {
    if (isScriptLoaded) {
      resolve();
      return;
    }

    loadCallbacks.push(resolve);

    if (isScriptLoading) return;
    isScriptLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isScriptLoaded = true;
      isScriptLoading = false;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };
    script.onerror = () => {
      isScriptLoading = false;
      console.error("Failed to load Google Maps script");
    };
    document.head.appendChild(script);
  });
}

export default function GoogleMap({ items, activeItemIndex, onMarkerClick }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const [mapReady, setMapReady] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;

    loadGoogleMapsScript().then(() => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: TOKYO_CENTER,
        zoom: 12,
        mapId: "journey-japan-map",
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      mapInstanceRef.current = map;
      setMapReady(true);
    });
  }, []);

  // Update markers when items change
  const updateMarkers = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapReady) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    // Clear existing polyline
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    if (items.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    const path: google.maps.LatLngLiteral[] = [];

    items.forEach((item, index) => {
      if (!item.spot.lat || !item.spot.lng) return;

      const position = { lat: item.spot.lat, lng: item.spot.lng };
      bounds.extend(position);
      path.push(position);

      // Create custom marker element
      const markerEl = document.createElement("div");
      markerEl.className = "google-map-marker";
      markerEl.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transform: ${index === activeItemIndex ? "scale(1.2)" : "scale(1)"};
          transition: transform 0.2s;
        ">
          <div style="
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: ${index === activeItemIndex ? "#1a4a2e" : "#2B5F3F"};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 2px solid white;
          ">${index + 1}</div>
          <div style="
            margin-top: 4px;
            background: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            color: #374151;
            box-shadow: 0 1px 4px rgba(0,0,0,0.15);
            white-space: nowrap;
            max-width: 120px;
            overflow: hidden;
            text-overflow: ellipsis;
          ">${(item.spot.nameEn.length > 16 ? item.spot.nameEn.slice(0, 16) + "…" : item.spot.nameEn).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")}</div>
        </div>
      `;

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position,
        map,
        content: markerEl,
        title: item.spot.nameEn,
      });

      marker.addListener("click", () => {
        onMarkerClick?.(index);
      });

      markersRef.current.push(marker);
    });

    // Draw route polyline
    if (path.length > 1) {
      polylineRef.current = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#2B5F3F",
        strokeOpacity: 0.6,
        strokeWeight: 3,
        map,
      });
    }

    // Fit bounds with padding
    if (items.length === 1) {
      map.setCenter(path[0]);
      map.setZoom(15);
    } else {
      map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
    }
  }, [items, activeItemIndex, mapReady, onMarkerClick]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="relative overflow-hidden h-full">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #d4e4d8 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, #c8d8cc 0%, transparent 50%), linear-gradient(135deg, #e4ece6 0%, #d8e4dc 100%)",
          }}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-sm text-gray-500">
          Google Maps API key not configured
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapRef} className="absolute inset-0" />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
