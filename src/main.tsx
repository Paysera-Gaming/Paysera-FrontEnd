import React from 'react';
import ReactDOM from 'react-dom/client';
// login
import LoginPage from './pages/Login/LoginPage';
// employee routes
import EmployeePage from './pages/Employee/EmployeePage';
import FillUpPage from './pages/Employee/FillUpForm/FillUpPage';
import ClockPage from './pages/Employee/ClockIn/ClockPage';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{ path: '/', element: <>TESTING</> },
	{
		path: '/login',
		element: <LoginPage></LoginPage>,
	},
	{
		path: '/employee',
		element: <EmployeePage></EmployeePage>,
		children: [
			{ path: 'request', element: <FillUpPage></FillUpPage> },
			{ path: 'clock', element: <ClockPage></ClockPage> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
