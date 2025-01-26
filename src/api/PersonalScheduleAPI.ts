import { TEmployee } from '@/components/DataTable/DataColumns';
import { TSchedule } from './ScheduleAPI';

type Day =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

// this will check if there are duplicates in the days

type NoDuplicates<T extends readonly unknown[]> = T extends [
	infer F,
	...infer R
]
	? F extends R[number]
		? never // Duplicate found
		: [F, ...NoDuplicates<R>] // Recur for the rest of the array
	: T;

type TWeekDaysArray = NoDuplicates<Day[]>;

export type TPersonalSchedule = {
	id: number;
	name: string;
	day: TWeekDaysArray;
	Schedule: TSchedule;
	employeeId: number;
	Employee: TEmployee;
	createdAt: Date;
	updatedAt: Date;
};
// "id": 0,
//     "name": "Personal Schedule",
//     "day": [
//       "MONDAY"
//     ],
//     "scheduleId": 0,
//     "Schedule": {
//       "id": 0,
//       "scheduleType": "FIXED",
//       "startTime": "2025-01-26T05:55:21.310Z",
//       "endTime": "2025-01-26T05:55:21.310Z",
//       "startTimeLimit": "2025-01-26T05:55:21.310Z",
//       "limitWorkHoursDay": 0,
//       "allowedOvertime": true,
//       "lunchStartTime": "2025-01-26T05:55:21.310Z",
//       "lunchEndTime": "2025-01-26T05:55:21.310Z",
//       "lunchTimeTotal": 0,
//       "updatedAt": "2025-01-26T05:55:21.310Z",
//       "createdAt": "2025-01-26T05:55:21.310Z"
//     },
//     "employeeId": 0,
//     "Employee": {
//       "id": 1,
//       "accessLevel": "ADMIN",
//       "departmentId": 1,
//       "isActive": false,
//       "username": "pangilinan2002",
//       "firstName": "Ervin",
//       "lastName": "Pangilinan",
//       "middleName": "Capili",
//       "role": "Software Engineer"
//     },
//     "createdAt": "2025-01-26T05:55:21.310Z",
//     "updatedAt": "2025-01-26T05:55:21.310Z"
