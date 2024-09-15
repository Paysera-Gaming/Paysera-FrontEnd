import { getAttendanceToday } from '@/api/AttendanceAPI';
import { getAllEmployeesInDepartment } from '@/api/EmployeeAPI';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/userStore';
import { useQueries } from '@tanstack/react-query';
import { UserX, Users, UserCheck } from 'lucide-react';

type CardData = {
	title: string;
	population: number;
	icon: React.ReactNode;
	description: string;
};

export default function EmployeesStatusCards() {
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

	const cardData: CardData[] = [
		{
			title: 'Total Employees',
			population: userQueries[1].data?.length ?? 0,
			icon: <Users></Users>,
			description: 'Total Employees on this department',
		},
		{
			title: 'Online Employees',
			population: userQueries[0].data?.length ?? 0,
			icon: <UserCheck></UserCheck>,
			description: 'Total employees that are online',
		},
		{
			title: 'Offline Employees',
			population:
				(userQueries[1].data?.length ?? 0) - (userQueries[0].data?.length ?? 0),
			icon: <UserX></UserX>,
			description: 'Employees that are offline',
		},
	];

	const isLoading = userQueries.some((query) => query.isLoading);

	if (isLoading) {
		return (
			<>
				<Skeleton className="flex-1 p-4 min-h-[100px]"></Skeleton>
				<Skeleton className="flex-1 p-4 min-h-[100px]"></Skeleton>
				<Skeleton className="flex-1 p-4 min-h-[100px]"></Skeleton>
			</>
		);
	}
	const CardItems = cardData.map((card, index) => {
		return (
			<Card className="flex-1 p-4 min-h-[100px]" key={index}>
				<CardContent className="flex item-cineter justify-between p-0 pb-2">
					<p className="text-lg">{card.title}:</p>
					{card.icon}
				</CardContent>
				<CardHeader className="p-0">
					<CardTitle>{card.population}</CardTitle>
					<CardDescription className="text-base">
						{card.description}
					</CardDescription>
				</CardHeader>
			</Card>
		);
	});

	return <>{CardItems}</>;
}
