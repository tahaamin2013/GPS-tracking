'use client'
import { useEffect, useState } from 'react'

export default function DevicesPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await fetch('/api/location')
      const data = await res.json()
      setLocation(data)
    }

    fetchLocation()
    const interval = setInterval(fetchLocation, 5000) // poll every 5 sec
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <h1 className="text-xl font-bold mb-4">📍 Mobile&apos;s Live Location</h1> */}
      {location ? (
        <div className="flex flex-col items-center">
          {/* <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p> */}
          <div className="mt-4 w-[700px] md:w-[1000px] h-[250px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
            ></iframe>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
