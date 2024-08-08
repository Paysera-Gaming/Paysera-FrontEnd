// src/App.tsx

import { TableComponent } from '@/components/AdminDashboard/TableComponent';
import { CalendarComponent } from '@/components/AdminDashboard/CalendarComponent';
import { PaginationComponent } from '@/components/AdminDashboard/PaginationComponent';
import './App.css';
import './admindashboard.css'
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
          <PaginationComponent />
        </section>
      </main>
    </div>
  );
}

export default App;
