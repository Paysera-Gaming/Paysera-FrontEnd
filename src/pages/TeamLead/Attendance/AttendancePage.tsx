import { TAttendance } from '@/api/AttendanceAPI';
import { AttendanceTable } from '@/components/DataTable/AttedanceTable';
import { attendanceColumns } from '@/components/DataTable/AttendanceColumns';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';
import { getAttendance } from '@/api/AttendanceAPI';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorDisplay from '@/components/ErrorComponent/ErrorDisplay';

export default function AttendancePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['Attendance'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return getAttendance(departmentId.toString());
			} else {
				throw new Error('No Department Id Found');
			}
		},
	});
	const attendanceData: TAttendance[] = data ?? [];

	if (isError) {
		return <ErrorDisplay />;
	}

	if (isLoading) {
		return (
			<div className=" w-full h-full border-border border-solid border p-5 rounded-md ">
				<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
					Attendance
				</h2>
				<div className="grid grid-cols-5 w-full mt-2 gap-2">
					<Skeleton className="col-span-5 h-10" />
					<Skeleton className="col-span-5 h-72" />
					<div className="col-span-3"></div>
					<Skeleton className="col-span-1 h-10" />
					<Skeleton className="col-span-1 h-10" />
				</div>
			</div>
		);
	}

	return (
		<div className="w-full flex-1 inline-block border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Attendance
			</h2>

			{/* table */}
			<AttendanceTable
				data={attendanceData}
				columns={attendanceColumns}
			></AttendanceTable>
		</div>
	);
}
