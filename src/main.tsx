import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	redirect,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import ProtectedRoute from './lib/AccessLevelUtils';

import LoginPage from './pages/Login/LoginPage';
import EmployeePage from './pages/Employee/EmployeePage';
import EmployeeDashboardPage from './pages/Employee/Dashboard/DashboardPage';
import RequestPage from './pages/Employee/Request/RequestPage';
import TeamLeadPage from './pages/TeamLead/TeamLeadPage';
import TeamLeadDashboardPage from './pages/TeamLead/Dashboard/DashboardPage';
import SchedulePage from './pages/TeamLead/Schedule/SchedulePage';
import AttendancePage from './pages/TeamLead/Attendance/AttendancePage';
import ManagePage from './pages/TeamLead/Manage/ManagePage';
import SuperAdminPage from './pages/SuperAdmin/SuperAdminPage';
import SuperAdminDashboardPage from './pages/SuperAdmin/Dashboard/DashboardPage';
import AttendanceDashboard from './pages/SuperAdmin/Attendance/AttendanceDashboard';
import SuperAdminEmployeeDashboard from './pages/SuperAdmin/Employee/SuperAdminEmployeeDashboard';
import SuperAdminDepartmentDashboard from './pages/SuperAdmin/Department/SuperAdminDepartmentDashboard';
import SuperAdminHolidayDashboard from './pages/SuperAdmin/Holiday/SuperAdminHolidayDashboard';

import './index.css';

// Create a client
const queryClient = new QueryClient();
queryClient.setDefaultOptions({});

const router = createBrowserRouter([
	{
		path: '/',
		element: <></>,
		children: [{ index: true, loader: () => redirect('/login') }],
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/employee',
		element: (
			<ProtectedRoute page={<EmployeePage />} requiredLevel="EMPLOYEE" />
		),
		children: [
			{ index: true, loader: async () => redirect('/employee/dashboard') },
			{ path: 'dashboard', element: <EmployeeDashboardPage /> },
			{ path: 'request', element: <RequestPage /> },
		],
	},
	{
		path: '/teamlead',

		element: (
			<ProtectedRoute page={<TeamLeadPage />} requiredLevel="TEAM_LEADER" />
		),
		children: [
			{ index: true, loader: async () => redirect('/teamlead/dashboard') },
			{ path: 'dashboard', element: <TeamLeadDashboardPage /> },
			{ path: 'manage', element: <ManagePage /> },
			{ path: 'schedule', element: <SchedulePage /> },
			{ path: 'attendance', element: <AttendancePage /> },
		],
	},
	{
		path: '/superadmin',
		element: <ProtectedRoute page={<SuperAdminPage />} requiredLevel="ADMIN" />,
		children: [
			{ index: true, loader: async () => redirect('/superadmin/dashboard') },
			{ path: 'dashboard', element: <SuperAdminDashboardPage /> },
			{ path: 'holidays', element: <SuperAdminHolidayDashboard /> },
			{ path: 'schedule', element: <SchedulePage /> },
			{ path: 'attendance', element: <AttendanceDashboard /> },
			{ path: 'employee', element: <SuperAdminEmployeeDashboard /> },
			{ path: 'departments', element: <SuperAdminDepartmentDashboard /> },
		],
	},
	{
		path: '*',
		loader: () => redirect('/login'),
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<RouterProvider router={router} />
				<Toaster
					richColors
					closeButton
					toastOptions={{
						classNames: {
							error: 'bg-red-400',
							success: 'text-green-400',
							warning: 'text-yellow-400',
							info: 'bg-blue-400',
						},
					}}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
