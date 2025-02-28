import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import ProtectedRoute from './lib/AccessLevelUtils';
import ConfirmationDialog from '@/lib/ConfirmationDialog.tsx';

// pages
import LoginPage from './pages/Login/LoginPage';
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage';
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
import SuperAdminAnnouncementDashboard from './pages/SuperAdmin/Announcement/SuperAdminAnnouncementDashboard';
import SuperAuditorPage from './pages/SuperAuditor/SuperAuditorPage';
import SuperAuditorDashboardPage from './pages/SuperAuditor/Dashboard/DashboardPage';
import SuperAuditorAnnouncementDashboard from './pages/SuperAuditor/Announcement/SuperAuditorAnnouncementDashboard';
import SuperAuditorHolidayDashboard from './pages/SuperAuditor/Holiday/SuperAuditorHolidayDashboard';
import SuperAuditorEmployeeDashboard from './pages/SuperAuditor/Employee/SuperAuditorEmployeeDashboard';
import SuperAuditorDepartmentDashboard from './pages/SuperAuditor/Department/SuperAuditorDepartmentDashboard';
import SuperAuditorAttendanceDashboard from './pages/SuperAuditor/Attendance/AttendanceDashboard';

import './index.css';
import PersonalSchedulePage from './pages/TeamLead/Personal_Schedule/PersonalSchedulePage';
import OvertimePage from './pages/TeamLead/OverTime/OverTimePage';
import ExperimentalPage from './pages/Experimental/ExperimentalPage';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes before queries become stale
            refetchOnWindowFocus: true, // Refetch when window is focused
            refetchOnReconnect: true, // Refetch when network reconnects
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <></>,
        children: [{ index: true, loader: () => redirect('/login') }],
    },
    {
        path: '/experimental',
        element: <ExperimentalPage></ExperimentalPage>,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
    },
    {
        path: '/reset-password', // Add the reset-password route
        element: <ResetPasswordPage />,
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
            // <TeamLeadPage />
            <ProtectedRoute page={<TeamLeadPage />} requiredLevel="TEAM_LEADER" />
        ),
        children: [
            { index: true, loader: async () => redirect('/teamlead/dashboard') },
            { path: 'dashboard', element: <TeamLeadDashboardPage /> },
            { path: 'manage', element: <ManagePage /> },
            { path: 'schedule', element: <SchedulePage /> },
            { path: 'attendance', element: <AttendancePage /> },
            {
                path: 'personal',
                element: <PersonalSchedulePage />,
            },
            {
                path: 'overtime',
                element: <OvertimePage />,
            },
        ],
    },
    {
        path: '/superadmin',
        element: <ProtectedRoute page={<SuperAdminPage />} requiredLevel="ADMIN" />,
        children: [
            { index: true, loader: async () => redirect('/superadmin/dashboard') },
            { path: 'dashboard', element: <SuperAdminDashboardPage /> },
            { path: 'announcement', element: <SuperAdminAnnouncementDashboard /> },
            { path: 'holidays', element: <SuperAdminHolidayDashboard /> },
            { path: 'schedule', element: <SchedulePage /> },
            { path: 'attendance', element: <AttendanceDashboard /> },
            { path: 'employee', element: <SuperAdminEmployeeDashboard /> },
            { path: 'departments', element: <SuperAdminDepartmentDashboard /> },
        ],
    },
    {
        path: '/superauditor',
        element: <ProtectedRoute page={<SuperAuditorPage />} requiredLevel="SUPERAUDITOR" />, // Add SuperAuditor route
        children: [
            { index: true, loader: async () => redirect('/superauditor/dashboard') },
            { path: 'dashboard', element: <SuperAuditorDashboardPage /> },
            { path: 'announcement', element: <SuperAuditorAnnouncementDashboard /> },
            { path: 'holidays', element: <SuperAuditorHolidayDashboard /> },
            { path: 'schedule', element: <SchedulePage /> },
            { path: 'attendance', element: <SuperAuditorAttendanceDashboard /> },
            { path: 'employee', element: <SuperAuditorEmployeeDashboard /> },
            { path: 'departments', element: <SuperAuditorDepartmentDashboard /> },
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
                    position={'top-center'}
                    toastOptions={{
                        classNames: {
                            error: 'bg-red-400',
                            success: 'text-green-400',
                            warning: 'text-yellow-400',
                            info: 'bg-blue-400',
                        },
                    }}
                />
                <ConfirmationDialog />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    </React.StrictMode>
);