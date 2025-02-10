import React, { useState } from "react";
import axios from "axios";

const Experiment: React.FC = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city?: string;
    address?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
            if (response.data.results.length > 0) {
              const result = response.data.results[0];
              const city =
                result.components.city ||
                result.components.town ||
                result.components.village;
              const address = result.formatted;
              setLocation((prevLocation) => ({
                latitude: prevLocation?.latitude ?? latitude,
                longitude: prevLocation?.longitude ?? longitude,
                city,
                address,
              }));
              console.log(`City: ${city}`);
              console.log(`Address: ${address}`);
            } else {
              setError("No results found for the given coordinates.");
            }
          } catch (error) {
            setError("Error fetching location details.");
            console.error("Error fetching location details:", error);
          }
        },
        (error) => {
          setError("Error getting location.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
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
          {location.address && <p>Address: {location.address}</p>}
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Experiment;
