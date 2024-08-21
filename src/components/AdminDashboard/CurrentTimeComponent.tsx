// src/components/AdminDashboard/CurrentTimeComponent.tsx
import React, { useState, useEffect } from 'react';
import '../../admindashboard.css'; // Adjust the path according to your project structure

const CurrentTimeComponent = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="current-time">
      {currentTime}
    </div>
  );
};

export default CurrentTimeComponent;
