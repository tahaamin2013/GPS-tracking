"use client";

import { useEffect, useState } from "react";

export default function MobilePage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(coords);

          // Send to backend
          fetch("/api/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(coords),
          });
        },
        (err) => {
          console.error("Error getting location:", err);
        }
      );
    };

    sendLocation();
    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4">📡 Tablet: Sharing Location</h1>
      {location ? (
        <div className="text-center w-full max-w-xl">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          <div className="mt-4 w-full h-[600px] border rounded overflow-hidden shadow">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=17&t=p&output=embed`}
            ></iframe>
          </div>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
