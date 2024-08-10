// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import YourTeam from './components/AdminDashboard/YourTeam';
import Projects from './components/AdminDashboard/Projects';
import Messages from './components/AdminDashboard/Messages'; // Import the Messages component
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/yourteam',
    element: <YourTeam />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/messages',
    element: <Messages />, // Route for Messages component
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
