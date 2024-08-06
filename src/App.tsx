// src/App.tsx

import { useState } from 'react';
import { TableComponent } from '@/components/TableComponent';
import { CalendarComponent } from '@/components/CalendarComponent';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Admin Dashboard</h1>
                <p className="header-subtitle">Manage your records efficiently</p>
            </header>
            <main className="main-content">
                <section className="calendar-section">
                    <CalendarComponent />
                </section>
                <section className="table-section">
                    <TableComponent />
                </section>
 
            </main>
        </div>
    );
}

export default App;
