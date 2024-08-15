import React, { useState, useEffect } from 'react';
import { CalendarComponent } from '@/components/AdminDashboard/CalendarComponent';
import { TableComponent } from '@/components/AdminDashboard/AttendanceComponent';
import { PaginationComponent } from '@/components/AdminDashboard/PaginationComponent';
import SheetComponent from '@/components/AdminDashboard/SheetComponent';
import './App.css';
import './admindashboard.css';

function App() {
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update the current time every second
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

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p className="header-subtitle">Manage your records efficiently</p>
        </div>
        <div className="header-right">
          <div className="current-time">{currentTime}</div>
          <SheetComponent /> {/* Profile component */}
        </div>
      </header>
      <main className="main-content">
        <section className="calendar-section">
          <CalendarComponent />
        </section>
        <section className="table-section">
          <TableComponent />
          <PaginationComponent />
        </section>
      </main>
    </div>
  );
}

export default App;
