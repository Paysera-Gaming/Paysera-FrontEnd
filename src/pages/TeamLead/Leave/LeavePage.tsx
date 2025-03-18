import { getAttendanceToday, TAttendance } from '@/api/AttendanceAPI';
import { overtimeRequestColumns } from '@/components/DataTable/OverTimeApprovalColumn';
import { OverTimeApprovalTable } from '@/components/DataTable/OverTimeApprovalTable';
import ErrorDisplay from '@/components/ErrorComponent/ErrorDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useUserStore } from '@/stores/userStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function LeavePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['LeaveRequest'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return getAttendanceToday(departmentId.toString());
			} else {
				throw new Error('No Department Id Found');
			}
		},
		select: (data) => data.filter((user) => user.isRequestingOvertime),
	});

	const queryClient = useQueryClient();
	// this stupid socket will run even in other departments
	// we are not paid enough to fix this
	// we are not even paid at all!
	useWebSocket('attendance', () => {
		// this will invalidate old queries and get new queries
		queryClient.invalidateQueries({ queryKey: ['AttendanceToday'] });
	});

	if (isError) {
		return <ErrorDisplay />;
	}

	if (isLoading) {
		return (
			<div className="min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md ">
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
		<div className=" min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Overtime Approval
			</h2>

			<OverTimeApprovalTable
				data={data as TAttendance[]}
				columns={overtimeRequestColumns}
			></OverTimeApprovalTable>
		</div>
	);
}
