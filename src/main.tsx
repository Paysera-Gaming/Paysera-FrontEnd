import React from 'react';
import ReactDOM from 'react-dom/client';

// login
import LoginPage from './pages/Login/LoginPage';
// employee pages
import EmployeePage from './pages/Employee/EmployeePage';
import EmployeeDashboardPage from './pages/Employee/Dashboard/DashboardPage';
import RequestPage from './pages/Employee/Request/RequestPage';
// Teamlead pages
import TeamLeadPage from './pages/TeamLead/TeamLeadPage';
import TeamLeadDashboardPage from './pages/TeamLead/Dashboard/DashboardPage';
import SchedulePage from './pages/TeamLead/Schedule/SchedulePage';
import AttendancePage from './pages/TeamLead/Attendance/AttendancePage';
import ManagePage from './pages/TeamLead/Manage/ManagePage';

// admin
import AdminPage from './pages/AdminPage/AdminPage';
import AdminManageTeams from './components/AdminDashboard/ManageTeams/index';
import Settings from './components/AdminDashboard/AccountPreferences';
import Employee from './components/AdminDashboard/Employee';

import './index.css';

import {
	createBrowserRouter,
	RouterProvider,
	redirect,
	Outlet,
} from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <></>,
		children: [{ index: true, loader: () => redirect('/login') }],
	},
	{
		path: '/login',
		element: <LoginPage></LoginPage>,
	},
	{
		path: '/employee',
		element: <EmployeePage></EmployeePage>,
		children: [
			{
				index: true,
				loader: () => redirect('/employee/dashboard'),
			},
			{
				path: 'dashboard',
				element: <EmployeeDashboardPage></EmployeeDashboardPage>,
			},
			{ path: 'request', element: <RequestPage></RequestPage> },
		],
	},
	{
		path: '/teamlead',
		element: <TeamLeadPage></TeamLeadPage>,
		children: [
			{
				index: true,
				loader: () => redirect('/teamlead/dashboard'),
			},
			{
				path: 'dashboard',
				element: <TeamLeadDashboardPage></TeamLeadDashboardPage>,
			},
			{ path: 'manage', element: <ManagePage></ManagePage> },
			{ path: 'schedule', element: <SchedulePage></SchedulePage> },
			{ path: 'attendance', element: <AttendancePage></AttendancePage> },
		],
	},
	{
		path: '/admin',
		element: <Outlet></Outlet>,
		children: [
			{
				index: true,
				loader: () => redirect('/admin/dashboard'),
			},
			{ path: 'dashboard', element: <AdminPage></AdminPage> },

			{
				path: 'manageteams',
				element: <AdminManageTeams />,
			},

			{
				path: 'accountpreferences',
				element: <Settings />,
			},
			{
				path: 'employeelist',
				element: <Employee />,
			},

		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
