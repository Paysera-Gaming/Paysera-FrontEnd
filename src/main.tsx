import React from 'react';
import ReactDOM from 'react-dom/client';
import ManageTeamsAdmin from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/ManageTeams';
// Teamlead pages
import TeamLeadPage from './pages/TeamLead/TeamLeadPage';
import TeamLeadDashboardPage from './pages/TeamLead/Dashboard/DashboardPage';
import SchedulePage from './pages/TeamLead/Schedule/SchedulePage';
import AttendancePage from './pages/TeamLead/Attendance/AttendancePage';
import ManagePage from './pages/TeamLead/Manage/ManagePage';
import Settings from './components/AdminDashboard/AccountPreferences';
import Employee from './components/AdminDashboard/Employee';
import Announcement from './components/AdminDashboard/Announcement/Announcement';
import './index.css';
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';

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
		element: <AdminPage></AdminPage>,
		children: [
			{
				path: '/manageteams',
				element: <ManageTeamsAdmin />,
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
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
