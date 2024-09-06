import { DataTable } from '@/components/DataTable/DataTableProvider';
import {
	scheduleColumns,
	TSchedule,
} from '@/components/DataTable/ScheduleColumn';
import AddScheduleBtn from '@/components/TeamLeadComponents/SchedulePage/AddScheduleBtn';

const dummyScheduleData: TSchedule[] = [
	{
		id: 1,
		name: 'JOe',
		role: 'Manager',
		scheduleId: 101,
		departmentId: 10,
		updatedAt: new Date('2024-08-25T12:00:00'),
		createdAt: new Date('2024-08-01T08:30:00'),
		scheduleType: 'FIXED',
		startTime: new Date('2024-08-26T09:00:00'),
		endTime: new Date('2024-08-26T17:00:00'),
		limitWorkHoursDay: 8,
		allowedOvertime: false,
		lunchStartTime: new Date('2024-08-26T12:00:00'),
		lunchEndTime: new Date('2024-08-26T12:30:00'),
	},
	{
		id: 2,
		name: 'JOe',
		role: 'Developer',
		scheduleId: 102,
		departmentId: 12,
		updatedAt: new Date('2024-08-20T09:00:00'),
		createdAt: new Date('2024-07-15T09:00:00'),
		scheduleType: 'SUPER_FLEXI',
		startTime: new Date('2024-08-26T10:00:00'),
		endTime: new Date('2024-08-26T18:00:00'),
		limitWorkHoursDay: 7,
		allowedOvertime: true,
		lunchStartTime: new Date('2024-08-26T13:00:00'),
		lunchEndTime: new Date('2024-08-26T13:30:00'),
	},
	{
		id: 3,
		name: 'JOe',
		role: 'Designer',
		scheduleId: 103,
		departmentId: 15,
		updatedAt: new Date('2024-08-22T10:30:00'),
		createdAt: new Date('2024-08-01T09:30:00'),
		scheduleType: 'FLEXI',
		startTime: new Date('2024-08-26T08:30:00'),
		endTime: new Date('2024-08-26T16:30:00'),
		limitWorkHoursDay: 6,
		allowedOvertime: false,
		lunchStartTime: new Date('2024-08-26T12:30:00'),
		lunchEndTime: new Date('2024-08-26T13:00:00'),
	},
];

export default function SchedulePage() {
	return (
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
			{/* search bar sa table with a add employee of the side then after adding empoyee may form na lalagay anong role nya  */}
			{/* and table of employeees */}
			{/*  TO DO ADD THE FILTER AND VISIBILITY OPTIOn*/}
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Manage Schedule
			</h2>
			<DataTable
				addButton={<AddScheduleBtn />}
				columns={scheduleColumns}
				data={dummyScheduleData}
				searchQuery="id"
			></DataTable>
		</div>
	);
}
