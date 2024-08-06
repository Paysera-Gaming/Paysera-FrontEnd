// src/App.tsx

import './App.css';
import { TableComponent } from '@/components/TableComponent';
import { Button } from '@/components/ui/button';

function App() {
    return (
        <div className="admin-dashboard">
            <header className="header">
                <h1>Welcome to the Admin Dashboard</h1>
                <p className="subheader">Manage your attendance records efficiently</p>
            </header>
            <main className="main-content">
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
