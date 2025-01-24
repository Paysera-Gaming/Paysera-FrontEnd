import { getAttendanceToday } from '@/api/AttendanceAPI';
import { getAllEmployeesInDepartment } from '@/api/EmployeeAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/userStore';
import { useQueries } from '@tanstack/react-query';
import { University } from 'lucide-react';

export default function DepartmentStatusCard() {
	const userQueries = useQueries({
		queries: [
			// this gets the attendance of the department
			{
				queryKey: ['AttendanceToady', 1],
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

	const isLoading = userQueries.some((query) => query.isLoading);
	const isError = userQueries.some((query) => query.isError);
	if (isLoading) {
		return <Skeleton className=""></Skeleton>;
	}

	if (isError) {
		return (
			<Card>
				<CardHeader className=" pt-1 xl:pt-5  pb-0 flex-row items-center justify-between w-full">
					<CardTitle className="text-base 2xl:text-lg ">
						Department Status
					</CardTitle>
					<University></University>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside flex justify-between items-center">
						<li className="marker:text-green-500 marker:text-2xl">
							<b>Online:</b> 0
						</li>
						<li className="marker:text-red-500 marker:text-2xl">
							<b>Offline:</b> 0
						</li>
					</ul>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className=" pb-0 pt-3 px-3 xl:px-5 xl:pt-5  flex-row items-center justify-between w-full">
				<CardTitle className="text-base lg:text-lg xl:text-2xl ">
					Department Status
				</CardTitle>
				<University></University>
			</CardHeader>
			<CardContent>
				<ul className="list-disc list-inside flex justify-between items-center">
					<li className="marker:text-green-500 marker:text-2xl">
						Online: {userQueries[1].data?.length ?? 0}
					</li>
					<li className="marker:text-red-500 marker:text-2xl">
						Offline:{' '}
						{(userQueries[1].data?.length ?? 0) -
							(userQueries[0].data?.length ?? 0)}
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
