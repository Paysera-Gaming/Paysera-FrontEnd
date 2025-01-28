import { TEmployee } from '@/components/DataTable/DataColumns';
import { TSchedule } from './ScheduleAPI';

import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

type TDay =
	| 'MONDAY'
	| 'TUESDAY'
	| 'WEDNESDAY'
	| 'THURSDAY'
	| 'FRIDAY'
	| 'SATURDAY'
	| 'SUNDAY';

export type TPersonalSchedule = {
	id: number;
	name: string;
	day: TDay[];
	scheduleId: number;
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

type TPersonalSchedForms = {
	name: string;
	day: TDay[];
	employeeId: number;
	timeIn: Date;
	timeOut: Date;
	scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
};

// get
export async function getAllPersonalSchedules() {
	const response: AxiosResponse<TPersonalSchedule[]> = await axiosInstance.get(
		'/api/personal-schedule'
	);
	console.log('BAR');

	console.log(response);
	return response.data;
}

// post
export async function postPersonalSchedule(form: TPersonalSchedForms) {
	const response: AxiosResponse<TPersonalSchedForms> = await axiosInstance.post(
		'/api/personal-schedule',
		{
			name: form.name,
			day: form.day,
			employeeId: form.employeeId,
			timeIn: form.timeIn,
			timeOut: form.timeOut,
			scheduleType: form.scheduleType,
		}
	);

	return response.status;
}

// delete
// edit
