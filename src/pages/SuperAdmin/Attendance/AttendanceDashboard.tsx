// AttendancePage.tsx
import AttendanceList from '@/components/SuperAdminComponents/AttendanceSuperAdmin/AttendanceList';

export default function AttendancePage() {
    return (
        <div className="w-full h-full p-5">
            <h2 className="text-3xl font-semibold mb-5">Attendance List</h2>
            <AttendanceList />
        </div>
    );
}
