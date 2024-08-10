import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import YourTeam from './components/AdminDashboard/YourTeam'; // Adjust the import path if needed
import '../src/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/yourteam',
		element: <YourTeam />, // Add the YourTeam route here
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
