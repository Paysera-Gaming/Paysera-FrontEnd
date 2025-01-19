// card
import { getAttendanceToday, TAttendance } from '@/api/AttendanceAPI';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
// table
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';
import { Activity } from 'lucide-react';

function compareHours(date: Date) {
	const currentDate = new Date();
	const hours = date.getHours();
	const currentHours = currentDate.getHours();

	return `${currentHours - hours} hours ago`;
}

function compareMinutes(date: Date) {
	const currentDate = new Date();
	const minutes = date.getMinutes();
	const currentMinutes = currentDate.getMinutes();

	return `${currentMinutes - minutes} minutes ago`;
}

function isGreaterThanOneHour(date: Date) {
	const currentDate = new Date();
	const hours = date.getHours();
	const currentHours = currentDate.getHours();

	const isGreaterThanOneHour = currentHours - hours > 1;

	if (isGreaterThanOneHour) {
		return compareHours(date);
	} else {
		return compareMinutes(date);
	}
}

function RecentActivitiesTable({ tableData }: { tableData: TAttendance[] }) {
	const renderedList = tableData.map((data, index) => (
		<TableRow key={index}>
			<TableCell>{data.employee.lastName}</TableCell>
			<TableCell>{data.employee.firstName}</TableCell>
			<TableCell>{data.employee.middleName}</TableCell>
			<TableCell>{data.employee.role}</TableCell>
			<TableCell>{isGreaterThanOneHour(new Date(data.timeIn))}</TableCell>
		</TableRow>
	));

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Last Name</TableHead>
					<TableHead>First Name</TableHead>
					<TableHead>Middle Name</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{renderedList.length > 0 ? (
					renderedList
				) : (
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							No activities
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

export default function RecentActivitiesCard() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['AttendanceToady'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return getAttendanceToday(departmentId.toString());
			} else {
				throw new Error('No Department Id Found');
			}
		},
	});

	const dummyData: TAttendance[] = data ?? [];
	if (isLoading) {
		return <Skeleton className="col-span-3 row-span-3  "></Skeleton>;
	}

	if (isError) {
		return (
			<Card className="col-span-3 row-span-3  ">
				<CardHeader>
					<div className="flex item-center justify-between">
						<CardTitle className="text-base lg:text-lg xl:text-2xl ">
							Recent Activities
						</CardTitle>
						<Activity></Activity>
					</div>
					<CardDescription>
						Recent activities of the employees of this department
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* <ScrollArea className="h-[200px] ">
				<RecentActivitiesTable tableData={dummyData}></RecentActivitiesTable>
			</ScrollArea> */}
					WALA BOSS
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="col-span-3 row-span-3  ">
			<CardHeader>
				<div className="flex item-center justify-between">
					<CardTitle> Recent Activities</CardTitle>
					<Activity></Activity>
				</div>
				<CardDescription>
					Recent activities of the employees of this department
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[150px] ">
					<RecentActivitiesTable tableData={dummyData}></RecentActivitiesTable>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
