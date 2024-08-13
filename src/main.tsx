import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ManageTeams from './components/AdminDashboard/ManageTeams';
import Projects from './components/AdminDashboard/Projects';
import Messages from './components/AdminDashboard/Messages';
import Settings from './components/AdminDashboard/Settings';
import Employee from './components/AdminDashboard/Employee'; // Import the Employee component
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
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/messages',
    element: <Messages />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/employeelist',
    element: <Employee />, // Add the Employee route
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
