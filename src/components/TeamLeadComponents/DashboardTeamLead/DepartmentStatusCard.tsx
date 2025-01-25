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
		<Card className="p-2 pt-0 2xl:p-5">
			<CardHeader className="p-0 flex-row flex items-end justify-between w-full">
				<CardTitle className="text-base 2xl:text-lg">
					Department Status
				</CardTitle>
				<University className="2xl:w-[1.25rem] 2xl:h-[1.25rem]  h-[1.5rem] w-[1.5rem]"></University>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="list-disc list-inside flex justify-between items-center">
					<li className=" text-sm marker:text-green-500 marker:text-base 2xl:marker:text-2xl ">
						Online: {userQueries[1].data?.length ?? 0}
					</li>
					<li className="text-sm 2xl:text-base marker:text-red-500 marker:text-base 2xl:marker:text-2xl">
						Offline:{' '}
						{(userQueries[1].data?.length ?? 0) -
							(userQueries[0].data?.length ?? 0)}
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
