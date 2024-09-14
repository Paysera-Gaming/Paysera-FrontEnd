import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
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

// superadmin
import SuperAdminPage from './pages/SuperAdmin/SuperAdminPage';
import SuperAdminDashboardPage from './pages/SuperAdmin/Dashboard/DashboardPage';
import AttendanceDashboard from './pages/SuperAdmin/Attendance/AttendanceDashboard';
import SuperAdminEmployeeDashboard from './pages/SuperAdmin/Employee/SuperAdminEmployeeDashboard';
import SuperAdminDepartmentDashboard from './pages/SuperAdmin/Department/SuperAdminDepartmentDashboard';

import './index.css';
// Theme provider
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';

import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from 'react-router-dom';
import ProtectedRoute from './lib/AccessLevelUtils';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

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
		element: (
			<ProtectedRoute
				page={<EmployeePage></EmployeePage>}
				requiredLevel="EMPLOYEE"
			></ProtectedRoute>
		),
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
		element: (
			<ProtectedRoute
				page={<TeamLeadPage></TeamLeadPage>}
				requiredLevel="TEAM_LEADER"
			></ProtectedRoute>
		),
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
		path: '/superadmin',
		element: (
			<ProtectedRoute
				page={<SuperAdminPage></SuperAdminPage>}
				requiredLevel="ADMIN"
			></ProtectedRoute>
		),
		children: [
			{
				index: true,
				loader: () => redirect('/superadmin/dashboard'),
			},
			{
				path: 'dashboard',
				element: <SuperAdminDashboardPage />,
				// SuperAdmin Dashboard
			},
			{ path: 'schedule', element: <SchedulePage></SchedulePage> },
			{
				path: 'attendance',
				element: <AttendanceDashboard></AttendanceDashboard>,
			},
			{
				path: 'employee',
				element: <SuperAdminEmployeeDashboard></SuperAdminEmployeeDashboard>,
			},
			{
				path: 'departments',
				element: (
					<SuperAdminDepartmentDashboard></SuperAdminDepartmentDashboard>
				),
			},

            // Add more child routes if needed
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);

