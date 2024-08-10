import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import YourTeam from './components/AdminDashboard/YourTeam';
import Projects from './components/AdminDashboard/Projects'; // Import the Projects component
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/yourteam',
    element: <YourTeam />, // Route for YourTeam component
  },
  {
    path: '/projects',
    element: <Projects />, // Route for Projects component
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
