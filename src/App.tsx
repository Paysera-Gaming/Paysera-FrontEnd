// src/App.tsx

import { useState } from 'react';
import { TableComponent } from '@/components/TableComponent';
import { CalendarComponent } from '@/components/CalendarComponent';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
    const [isCalendarVisible, setIsCalendarVisible] = useState(true);

    const toggleCalendar = () => {
        setIsCalendarVisible(!isCalendarVisible);
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Admin Dashboard</h1>
                <p className="header-subtitle">Manage attendance records and more</p>
            </header>
            <main className="main-content">
                <section className="toggle-section">
                    <Button className="toggle-button" onClick={toggleCalendar}>
                        {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'}
                    </Button>
                </section>
                <section className="calendar-section">
                    {isCalendarVisible && <CalendarComponent />}
                </section>
                <section className="table-section">
                    <TableComponent />
                </section>
                <section className="actions-section">
                    <Button className="primary-button">Add New Record</Button>
                    <Button className="secondary-button">View Reports</Button>
                </section>
            </main>
        </div>
    );
}

export default App;
