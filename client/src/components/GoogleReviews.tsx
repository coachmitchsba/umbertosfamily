/*
 * GoogleReviews Component — Umberto's Family Pizzeria
 * Fetches live Google Places reviews via the built-in Manus Google Maps proxy
 * Used on Massapequa Park and Farmingdale pages (marketing partner locations)
 */
import { useState, useEffect, useRef } from "react";
import { Star, ExternalLink, Quote } from "lucide-react";
import { MapView } from "@/components/Map";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url: string;
}

interface GoogleReviewsProps {
  placeId: string;
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
}

export default function GoogleReviews({ placeId, locationName, locationAddress, googleMapsUrl }: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mapInitialized = useRef(false);

  const handleMapReady = (map: any) => {
    if (mapInitialized.current) return;
    mapInitialized.current = true;

    try {
      const service = new (window as any).google.maps.places.PlacesService(map);
      service.getDetails(
        {
          placeId,
          fields: ["rating", "user_ratings_total", "reviews"],
        },
        (place: any, status: any) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
            setRating(place.rating || 0);
            setTotalRatings(place.user_ratings_total || 0);
            if (place.reviews && place.reviews.length > 0) {
              // Filter to 4+ star reviews only
              const goodReviews = place.reviews
                .filter((r: any) => r.rating >= 4)
                .slice(0, 5);
              setReviews(goodReviews.length > 0 ? goodReviews : place.reviews.slice(0, 5));
            }
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      );
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (count: number, size = 14) =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < Math.round(count) ? "fill-[oklch(0.68_0.13_75)] text-[oklch(0.68_0.13_75)]" : "text-[oklch(0.80_0.03_60)]"}
      />
    ));

  return (
    <div>
      {/* Hidden map for Places API — 1px so it doesn't show */}
      <div style={{ width: 1, height: 1, overflow: "hidden", position: "absolute", opacity: 0, pointerEvents: "none" }}>
        <MapView
          onMapReady={handleMapReady}
          defaultCenter={{ lat: 40.7, lng: -73.5 }}
          defaultZoom={10}
        />
      </div>

      {/* Reviews header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-0.5">{renderStars(rating, 18)}</div>
            <span className="font-display text-[oklch(0.20_0.025_60)] text-xl tracking-wider">{rating.toFixed(1)}</span>
          </div>
          <p className="font-body text-sm text-[oklch(0.55_0.03_60)]">
            Based on <strong className="text-[oklch(0.28_0.025_60)]">{totalRatings.toLocaleString()}</strong> Google reviews for {locationName}
          </p>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[oklch(0.88_0.015_80)] bg-white px-4 py-2.5 font-display text-xs tracking-wider text-[oklch(0.20_0.025_60)] hover:border-[oklch(0.46_0.22_25)] transition-colors"
        >
          <ExternalLink size={12} /> See All Reviews on Google
        </a>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border border-[oklch(0.88_0.015_80)] p-5 animate-pulse">
              <div className="flex gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-[oklch(0.90_0.01_80)]" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-[oklch(0.90_0.01_80)] rounded w-2/3" />
                  <div className="h-2.5 bg-[oklch(0.90_0.01_80)] rounded w-1/3" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 bg-[oklch(0.90_0.01_80)] rounded" />
                <div className="h-2.5 bg-[oklch(0.90_0.01_80)] rounded w-5/6" />
                <div className="h-2.5 bg-[oklch(0.90_0.01_80)] rounded w-4/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error / fallback */}
      {error && !loading && (
        <div className="text-center py-8 bg-white border border-[oklch(0.88_0.015_80)]">
          <p className="font-body text-sm text-[oklch(0.55_0.03_60)] mb-3">
            Unable to load live reviews right now.
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red text-xs"
          >
            <ExternalLink size={12} /> View Reviews on Google Maps
          </a>
        </div>
      )}

      {/* Reviews grid */}
      {!loading && !error && reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white border border-[oklch(0.88_0.015_80)] p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=C0392B&color=fff&size=40`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-semibold text-[oklch(0.20_0.025_60)] truncate">{review.author_name}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">{renderStars(review.rating, 11)}</div>
                    <span className="font-body text-[0.65rem] text-[oklch(0.55_0.03_60)]">{review.relative_time_description}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Quote size={14} className="text-[oklch(0.46_0.22_25)]/30 absolute -top-1 -left-0.5" />
                <p className="font-body text-xs text-[oklch(0.38_0.03_60)] leading-relaxed pl-3 line-clamp-4">
                  {review.text}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-[oklch(0.88_0.015_80)]">
                <div className="flex items-center gap-1.5">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3" />
                  <span className="font-body text-[0.6rem] text-[oklch(0.55_0.03_60)]">Google Review</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
