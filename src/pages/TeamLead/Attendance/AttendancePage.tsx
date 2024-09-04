import { AttendanceTable } from '@/components/DataTable/AttedanceTable';
import {
	attendanceColumns,
	TAttendanceColumn,
} from '@/components/DataTable/AttendanceColumns';

const dummyData: TAttendanceColumn[] = [
	{
		userID: 'user-001',
		fName: 'John',
		lName: 'Doe',
		mName: 'A',
		role: 'Developer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:00:00'),
		lunchTimeOut: new Date('2024-09-04T12:30:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7.5,
		overTimeTotal: 1,
		timeTotal: 8.5,
		createdAt: new Date('2024-09-04T09:00:00'),
		updatedAt: new Date('2024-09-04T17:00:00'),
	},
	{
		userID: 'user-001',
		fName: 'John',
		lName: 'Doe',
		mName: 'A',
		role: 'Developer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:00:00'),
		lunchTimeOut: new Date('2024-09-04T12:30:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7.5,
		overTimeTotal: 1,
		timeTotal: 8.5,
		createdAt: new Date('2024-09-04T09:00:00'),
		updatedAt: new Date('2024-09-04T17:00:00'),
	},
	{
		userID: 'user-001',
		fName: 'John',
		lName: 'Doe',
		mName: 'A',
		role: 'Developer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:00:00'),
		lunchTimeOut: new Date('2024-09-04T12:30:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7.5,
		overTimeTotal: 1,
		timeTotal: 8.5,
		createdAt: new Date('2024-09-04T09:00:00'),
		updatedAt: new Date('2024-09-04T17:00:00'),
	},

	{
		userID: 'user-001',
		fName: 'John',
		lName: 'Doe',
		mName: 'A',
		role: 'Developer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:00:00'),
		lunchTimeOut: new Date('2024-09-04T12:30:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7.5,
		overTimeTotal: 1,
		timeTotal: 8.5,
		createdAt: new Date('2024-09-04T09:00:00'),
		updatedAt: new Date('2024-09-04T17:00:00'),
	},

	{
		userID: 'user-001',
		fName: 'John',
		lName: 'Doe',
		mName: 'A',
		role: 'Developer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:00:00'),
		lunchTimeOut: new Date('2024-09-04T12:30:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7.5,
		overTimeTotal: 1,
		timeTotal: 8.5,
		createdAt: new Date('2024-09-04T09:00:00'),
		updatedAt: new Date('2024-09-04T17:00:00'),
	},

	{
		userID: 'user-003',
		fName: 'Emily',
		lName: 'Johnson',
		mName: 'C',
		role: 'Manager',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T13:00:00'),
		lunchTimeOut: new Date('2024-09-04T13:45:00'),
		lunchTimeTotal: 45,
		timeHoursWorked: 6.25,
		overTimeTotal: 2,
		timeTotal: 8.25,
		createdAt: new Date('2024-09-04T10:00:00'),
		updatedAt: new Date('2024-09-04T18:00:00'),
	},
	{
		userID: 'user-002',
		fName: 'Jane',
		lName: 'Smith',
		mName: 'B',
		role: 'Designer',
		timeIn: new Date('2024-09-04T13:00:00'),
		timeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeIn: new Date('2024-09-04T12:30:00'),
		lunchTimeOut: new Date('2024-09-04T13:00:00'),
		lunchTimeTotal: 30,
		timeHoursWorked: 7,
		overTimeTotal: 0.5,
		timeTotal: 7.5,
		createdAt: new Date('2024-09-04T08:30:00'),
		updatedAt: new Date('2024-09-04T16:30:00'),
	},
];

export default function AttendancePage() {
	return (
		<div className="w-full flex-1 inline-block border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Attendance
			</h2>

			{/* table */}
			<AttendanceTable
				data={dummyData}
				columns={attendanceColumns}
			></AttendanceTable>
		</div>
	);
}
