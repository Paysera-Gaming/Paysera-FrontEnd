import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ManageTeams from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/ManageTeams';

import Settings from './components/AdminDashboard/AccountPreferences';
import Employee from './components/AdminDashboard/Employee';
import Announcement from './components/AdminDashboard/Announcement/Announcement';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/manageteams',
    element: <ManageTeams />,
  },


  {
    path: '/accountpreferences',
    element: <Settings />,
  },
  {
    path: '/employeelist',
    element: <Employee />,
  },
  {
    path: '/announcement',
    element: <Announcement />, // Add the Announcement route
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
