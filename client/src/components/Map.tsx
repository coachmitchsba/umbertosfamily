/*
 * Map Component — Umberto's Family Pizzeria
 * Google Maps integration with dark styling
 */
import { useEffect, useRef, useState } from "react";

interface MapViewProps {
  onMapReady?: (map: google.maps.Map) => void;
  defaultCenter?: { lat: number; lng: number };
  defaultZoom?: number;
  mapStyle?: "dark" | "default";
}

const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1a1208" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1208" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#a08060" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d4a843" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#a08060" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38291a" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#5c3d1a" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1b2a" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

declare global {
  interface Window {
    __manus_google_maps_loaded?: boolean;
    __manus_google_maps_callbacks?: (() => void)[];
    initMap?: () => void;
  }
}

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve) => {
    if (window.google?.maps) {
      resolve();
      return;
    }
    if (!window.__manus_google_maps_callbacks) {
      window.__manus_google_maps_callbacks = [];
    }
    window.__manus_google_maps_callbacks.push(resolve);
    if (!document.getElementById("google-maps-script")) {
      window.initMap = () => {
        window.__manus_google_maps_loaded = true;
        window.__manus_google_maps_callbacks?.forEach((cb) => cb());
        window.__manus_google_maps_callbacks = [];
      };
      const script = document.createElement("script");
      script.id = "google-maps-script";
      const apiKey = import.meta.env.VITE_FRONTEND_FORGE_API_KEY || "";
      script.src = `${import.meta.env.VITE_FRONTEND_FORGE_API_URL || "https://maps.manus.im/maps/api"}/js?key=${apiKey}&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

export function MapView({ onMapReady, defaultCenter = { lat: 40.75, lng: -73.5 }, defaultZoom = 10, mapStyle = "dark" }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const map = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: defaultZoom,
          styles: mapStyle === "dark" ? DARK_MAP_STYLES : [],
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        });
        mapInstanceRef.current = map;
        setLoading(false);
        onMapReady?.(map);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[oklch(0.14_0.018_60)] text-[oklch(0.55_0.03_80)] font-body text-sm">
        Map unavailable. Please visit our Locations page for directions.
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.14_0.018_60)] z-10">
          <div className="w-8 h-8 border-2 border-[oklch(0.46_0.22_25)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

export default MapView;
