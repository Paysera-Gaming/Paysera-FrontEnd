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
		joe: { name: 'Doe', age: 20 },
	},
];

export default function SchedulePage() {
	return (
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
			{/* adjust the bloody cancel and submit button sa add schedule */}
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
