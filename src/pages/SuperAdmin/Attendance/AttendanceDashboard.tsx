// AttendancePage.tsx
import AttendanceList from '@/components/SuperAdminComponents/AttendanceSuperAdmin/AttendanceList';

export default function AttendancePage() {
	return (
		<div className="w-full h-[150vh] border-border border-solid border p-6 rounded-lg">

			<h2 className="text-3xl font-semibold mb-5">Attendance List</h2>
			<AttendanceList />
		</div>
	);
}
