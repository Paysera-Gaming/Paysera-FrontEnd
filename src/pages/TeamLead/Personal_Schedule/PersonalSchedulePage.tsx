import { getAllPersonalSchedules } from '@/api/PersonalScheduleAPI';
import { DataTable } from '@/components/DataTable/DataTableProvider';
import personalScheduleColumn from '@/components/DataTable/PersonalScheduleColumn';
import ErrorDisplay from '@/components/ErrorComponent/ErrorDisplay';
import AddPersonalScheduleBtn from '@/components/TeamLeadComponents/PersonalSchedule/AddPersonalScheduleBtn';

import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';

export default function PersonalSchedulePage() {
	// const getUser: TPersonalSchedule[] = [
	// 	{
	// 		id: 0,
	// 		name: 'Personal Schedule',
	// 		day: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
	// 		scheduleId: 0,
	// 		Schedule: {
	// 			id: 0,
	// 			scheduleType: 'FIXED',
	// 			startTime: '2025-01-26T05:55:21.310Z',
	// 			endTime: '2025-01-26T05:55:21.310Z',
	// 			// not sure kung mandatory
	// 			// startTimeLimit: '2025-01-26T05:55:21.310Z',
	// 			limitWorkHoursDay: 0,
	// 			allowedOvertime: true,
	// 			lunchStartTime: '2025-01-26T05:55:21.310Z',
	// 			lunchEndTime: '2025-01-26T05:55:21.310Z',
	// 			//not usre if i have to give that
	// 			// lunchTimeTotal: 0,
	// 			updatedAt: '2025-01-26T05:55:21.310Z',
	// 			createdAt: '2025-01-26T05:55:21.310Z',
	// 		},
	// 		employeeId: 0,
	// 		Employee: {
	// 			id: 1,
	// 			accessLevel: 'ADMIN',
	// 			departmentId: '1',
	// 			isActive: false,
	// 			username: 'pangilinan2002',
	// 			firstName: 'Ervin',
	// 			lastName: 'Pangilinan',
	// 			middleName: 'Capili',
	// 			role: 'Software Engineer',
	// 		},
	// 		createdAt: new Date(),
	// 		updatedAt: new Date(),
	// 	},
	// ];

	const { data, isError, isLoading } = useQuery({
		queryKey: ['PersonalSchedule'],
		queryFn: getAllPersonalSchedules,
	});

	console.log(data);

	if (isError) {
		return <ErrorDisplay />;
	}

	if (isLoading) {
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md ">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Personal Schedule
			</h2>
			<div className="grid grid-cols-5 w-full mt-2 gap-2">
				<Skeleton className="col-span-5 h-10" />
				<Skeleton className="col-span-5 h-72" />
				<div className="col-span-3"></div>
				<Skeleton className="col-span-1 h-10" />
				<Skeleton className="col-span-1 h-10" />
			</div>
		</div>;
	}

	return (
		<div className="min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Personal Schedule Page
			</h2>
			<DataTable
				addButton={<AddPersonalScheduleBtn></AddPersonalScheduleBtn>}
				columns={personalScheduleColumn()}
				data={data || []}
				searchQuery="Employee_lastName"
			></DataTable>
		</div>
	);
}
