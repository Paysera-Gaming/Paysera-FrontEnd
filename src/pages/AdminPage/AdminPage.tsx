import { useState, useEffect } from 'react';
import { AttendanceComponent } from '@/components/AdminDashboard/AttendanceComponent/index.tsx';
import SheetComponent from '@/components/AdminDashboard/SheetComponent';

// Import CSS files

import '../../css/AdminDashboard/header.css';
import '../../css/AdminDashboard/dialog-sheet.css';
import '../../css/AdminDashboard/links-logout.css';
import '../../css/AdminDashboard/main-content.css';
import '../../css/AdminDashboard/profile.css';
import '../../css/AdminDashboard/settings.css';
import '../../css/AdminDashboard/status-situation.css';
import '../../css/AdminDashboard/table.css';

function AdminPage() {
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
                    <AttendanceComponent />
                </section>
            </main>
        </div>
    );
}

export default AdminPage;