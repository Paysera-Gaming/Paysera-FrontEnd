import React, { useState } from "react";
import axios from "axios";

const Experiment: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city?: string;
  } | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=636dd746b49b4c059b04228348c37d0b`
            );
            const city = response.data.results[0].components.city;
            setLocation((prevLocation) => ({
              ...prevLocation,
              latitude,
              longitude,
              city,
            }));
            console.log(`City: ${city}`);
          } catch (error) {
            console.error("Error fetching city name:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Hello, welcome to experiment</h1>
      <button
        onClick={getLocation}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Get Location
      </button>
      {location && (
        <div className="mt-4">
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {location.city && <p>City: {location.city}</p>}
        </div>
      )}
    </div>
  );
};

export default Experiment;
