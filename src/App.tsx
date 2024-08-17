import React, { useState, useEffect } from 'react';
import { TableComponent } from '@/components/AdminDashboard/AttendanceComponent';
import { PaginationComponent } from '@/components/AdminDashboard/PaginationComponent';
import SheetComponent from '@/components/AdminDashboard/SheetComponent';

// Import CSS files
import './AdminDashboard/calendar.css';
import './AdminDashboard/dialog-sheet.css';
import './AdminDashboard/general.css';
import './AdminDashboard/header.css';
import './AdminDashboard/links-logout.css';
import './AdminDashboard/main-content.css';
import './AdminDashboard/profile.css';
import './AdminDashboard/settings.css';
import './AdminDashboard/status-situation.css';
import './AdminDashboard/table.css';
import './App.css'; // Your main App CSS  


function App() {
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
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Attendance Dashboard</h1>
          <p className="header-subtitle">Manage your records efficiently</p>
        </div>
        <div className="header-right">
          <SheetComponent /> {/* Profile component */}
          <div className="current-time">{currentTime}</div>
        </div>
      </header>
      <main className="main-content">
        <section className="table-section">
          <TableComponent />
          <PaginationComponent />
        </section>
      </main>
    </div>
  );
}

export default App;
