import { TPersonalSchedule } from '@/api/PersonalScheduleAPI';
import { DataTable } from '@/components/DataTable/DataTableProvider';
import personalScheduleColumn from '@/components/DataTable/PersonalScheduleColumn';
import AddPersonalScheduleBtn from '@/components/TeamLeadComponents/PersonalSchedule/AddPersonalScheduleBtn';
import { Button } from '@/components/ui/button';

export default function PersonalSchedulePage() {
	const getUser: TPersonalSchedule[] = [
		{
			id: 0,
			name: 'Personal Schedule',
			day: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
			scheduleId: 0,
			Schedule: {
				id: 0,
				scheduleType: 'FIXED',
				startTime: '2025-01-26T05:55:21.310Z',
				endTime: '2025-01-26T05:55:21.310Z',
				// not sure kung mandatory
				// startTimeLimit: '2025-01-26T05:55:21.310Z',
				limitWorkHoursDay: 0,
				allowedOvertime: true,
				lunchStartTime: '2025-01-26T05:55:21.310Z',
				lunchEndTime: '2025-01-26T05:55:21.310Z',
				//not usre if i have to give that
				// lunchTimeTotal: 0,
				updatedAt: '2025-01-26T05:55:21.310Z',
				createdAt: '2025-01-26T05:55:21.310Z',
			},
			employeeId: 0,
			Employee: {
				id: 1,
				accessLevel: 'ADMIN',
				departmentId: '1',
				isActive: false,
				username: 'pangilinan2002',
				firstName: 'Ervin',
				lastName: 'Pangilinan',
				middleName: 'Capili',
				role: 'Software Engineer',
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	return (
		<div>
			Personal Schedule Page
			<DataTable
				addButton={<AddPersonalScheduleBtn></AddPersonalScheduleBtn>}
				columns={personalScheduleColumn()}
				data={getUser}
				searchQuery="Employee_lastName"
			></DataTable>
		</div>
	);
}
