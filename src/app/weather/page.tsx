'use client';

import { useState, useEffect } from 'react';

const Weather = () => {
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if geolocation is available in the browser
    if (navigator.geolocation) {
      // Get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: Update state with latitude and longitude
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          // Error: Set an error message if the location could not be fetched
          setError('Unable to retrieve location');
          console.error(err);
        }
      );
    } else {
      // Browser doesn't support geolocation
      setError('Geolocation is not supported by this browser');
    }
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-300 to-blue-500">
      <div className="w-full sm:w-96 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Your Location</h2>

        {error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="text-center text-gray-700">
            <p>Latitude: {location.latitude ? location.latitude : 'Loading...'}</p>
            <p>Longitude: {location.longitude ? location.longitude : 'Loading...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
