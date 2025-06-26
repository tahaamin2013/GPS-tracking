"use client";
import { useEffect, useState } from "react";

export default function MobilePage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords); // Update the UI

        // Send to backend
        fetch("/api/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coords),
        });
      });
    };

    sendLocation();
    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold mb-4">📡 Tablet: Sharing Location</h1>
      {location ? (
        <div className="text-center">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
}
