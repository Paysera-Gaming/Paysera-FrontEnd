// src/components/AdminDashboard/YourTeam.tsx

import React from 'react';
import SheetComponent from './SheetComponent'; // Import the SheetComponent

function YourTeam() {
  const teamMembers = [
    { id: 1, name: 'Ken Smith', role: 'Project Manager', email: 'ken99@yahoo.com' },
    { id: 2, name: 'Abe Johnson', role: 'Developer', email: 'abe45@gmail.com' },
    { id: 3, name: 'Monserrat Lee', role: 'Designer', email: 'monserrat44@gmail.com' },
    { id: 4, name: 'Silas Parker', role: 'QA Engineer', email: 'silas22@gmail.com' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <SheetComponent /> {/* Add SheetComponent here */}
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Your Team</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Role</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.role}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default YourTeam;
