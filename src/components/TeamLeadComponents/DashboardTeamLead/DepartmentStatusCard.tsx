import { getAttendanceToday } from '@/api/AttendanceAPI';
import { getAllEmployeesInDepartment } from '@/api/EmployeeAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useUserStore } from '@/stores/userStore';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { University } from 'lucide-react';

function CardStatus({ title, value }: { title: string; value: number }) {
	return (
		<Card className="flex flex-col items-start justify-center aspect-3/2 p-5 2xl:p-3">
			<CardHeader className="p-0">
				<CardTitle className="text-muted-foreground text-sm 2xl:text-lg p-0">
					{title}
				</CardTitle>
				<CardContent className="p-0 font-bold 2xl:text-2xl">
					{value}
				</CardContent>
			</CardHeader>
		</Card>
	);
}

export default function DepartmentStatusCard() {
	const userQueries = useQueries({
		queries: [
			// this gets the attendance of the department
			{
				queryKey: ['AttendanceToday', 1],
				queryFn: () => {
					const user = useUserStore.getState().getUser();
					const departmentId = user?.departmentId;

					if (departmentId !== undefined) {
						return getAttendanceToday(departmentId.toString());
					} else {
						throw new Error('No Department Id Found');
					}
				},
			},
			// this gets the employees in the department
			{
				queryKey: ['EmployeesInfo', 2],
				queryFn: () => {
					const user = useUserStore.getState().getUser();
					const departmentId = user?.departmentId;

					if (departmentId !== undefined) {
						return getAllEmployeesInDepartment(departmentId.toString());
					} else {
						throw new Error('No Department Id Found');
					}
				},
			},
		],
	});

	const queryClient = useQueryClient();
	// this stupid socket will run even in other departments
	// we are not paid enough to fix this
	// we are not even paid at all!
	useWebSocket('attendance', () => {
		// this will invalidate old queries and get new queries
		queryClient.invalidateQueries({ queryKey: ['AttendanceToday'] });
	});

	const isLoading = userQueries.some((query) => query.isLoading);
	const isError = userQueries.some((query) => query.isError);
	if (isLoading) {
		return <Skeleton className=""></Skeleton>;
	}

	if (isError) {
		return (
			<>
				<CardStatus title="Online" value={0}></CardStatus>
				<CardStatus title="Absent" value={0}></CardStatus>
				<CardStatus title="On Leave" value={0}></CardStatus>
				<CardStatus title="Pending Request" value={0}></CardStatus>
			</>
		);
	}

	return (
		<>
			<CardStatus
				title="Online"
				value={userQueries[0].data?.length ?? 0}
			></CardStatus>
			<CardStatus
				title="Offline"
				value={
					(userQueries[1].data?.length ?? 0) -
					(userQueries[0].data?.length ?? 0)
				}
			></CardStatus>
			<CardStatus
				title="On Leave"
				value={
					// this gets all the paid and unpaid leaves
					userQueries[0].data?.filter(
						(a) => a.status === 'PAID_LEAVE' || a.status === 'UNPAID_LEAVE'
					).length ?? 0
				}
			></CardStatus>
			<CardStatus
				title="Pending Request"
				value={
					userQueries[0].data?.filter((a) => a.isRequestingOvertime === true)
						.length ?? 0
				}
			></CardStatus>
		</>
	);
}
