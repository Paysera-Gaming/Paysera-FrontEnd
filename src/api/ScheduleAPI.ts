import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

import { z } from 'zod';

export const formSchema = z.object({
	// first
	name: z.string().min(2).max(50),
	role: z.string().min(2).max(50),

	// second
	timeIn: z.date(),
	timeOut: z.date(),
	lunchTimeIn: z.date(),
	lunchTimeOut: z.date(),
	// third
	allowedOverTime: z.boolean(),
});

// [
//   {
//     "id": 1,
//     "name": "FIXED ENGINEER Schedule",
//     "role": "ENGINEER",
//     "scheduleId": 1,
//     "departmentId": 1,
//     "updatedAt": "2024-09-11T02:48:57.916Z",
//     "createdAt": "2024-09-11T02:48:57.916Z",
//     "Schedule": {
//       "id": 1,
//       "scheduleType": "FIXED",
//       "startTime": "2024-08-01T09:00:00.000Z",
//       "endTime": "2024-08-01T17:00:00.000Z",
//       "limitWorkHoursDay": null,
//       "allowedOvertime": false,
//       "lunchStartTime": "2024-08-01T12:00:00.000Z",
//       "lunchEndTime": "2024-08-01T13:00:00.000Z",
//       "updatedAt": "2024-09-11T02:48:57.912Z",
//       "createdAt": "2024-09-11T02:48:57.912Z"
//     }
//   }
// ]

export type TDepartmentSchedules = {
	id: number;
	name: string;
	role: string;
	scheduleId: number;
	departmentId: number;
	updatedAt: string;
	createdAt: string;
	Schedule: {
		id: number;
		scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
		startTime: string;
		endTime: string;
		limitWorkHoursDay: number;
		allowedOvertime: boolean;
		lunchStartTime: string;
		lunchEndTime: string;
		updatedAt: string;
		createdAt: string;
	};
};

export async function getAllSchedulesInDepartment(
	departmentId: number
): Promise<TDepartmentSchedules[]> {
	const response: AxiosResponse<TDepartmentSchedules[]> =
		await axiosInstance.get(`/api/department/${departmentId}/schedules`);
	console.log(response.data);
	return response.data;
}

function calculateTotalHours(startTime: string, endTime: string): number {
	const start = new Date(startTime);
	const end = new Date(endTime);

	// Calculate the difference in milliseconds
	const diffInMs = end.getTime() - start.getTime();

	// Convert milliseconds to hours
	const diffInHours = diffInMs / (1000 * 60 * 60);

	return diffInHours;
}

// kulang to ng schedule type
export async function createSchedule(
	departmentId: number,
	schedule: z.infer<typeof formSchema>
): Promise<z.infer<typeof formSchema>> {
	const totalHours = calculateTotalHours(
		schedule.timeIn.toDateString(),
		schedule.timeOut.toDateString()
	);
	const response: AxiosResponse<z.infer<typeof formSchema>> =
		await axiosInstance.post(`/api/department-schedule`, {
			role: schedule.role,
			departmentId: departmentId,
			scheduleType: 'FIXED',
			startTime: schedule.timeIn,
			endTime: schedule.timeOut,
			limitWorkHoursDay: totalHours,
			allowedOvertime: schedule.allowedOverTime,
			lunchStartTime: schedule.lunchTimeIn,
			lunchEndTime: schedule.lunchTimeOut,
		});
	return response.data;
}

// likewise with this one
export async function updateSchedule(
	departmentScheduleId: number,
	schedule: z.infer<typeof formSchema>
): Promise<z.infer<typeof formSchema>> {
	const totalHours = calculateTotalHours(
		schedule.timeIn.toDateString(),
		schedule.timeOut.toDateString()
	);
	const response: AxiosResponse<z.infer<typeof formSchema>> =
		await axiosInstance.post(
			`/api/department-schedule/${departmentScheduleId}`,
			{
				role: schedule.role,
				scheduleType: 'FIXED',
				startTime: schedule.timeIn,
				endTime: schedule.timeOut,
				limitWorkHoursDay: totalHours,
				allowedOvertime: schedule.allowedOverTime,
				lunchStartTime: schedule.lunchTimeIn,
				lunchEndTime: schedule.lunchTimeOut,
			}
		);
	return response.data;
}

export async function deleteSchedule(
	departmentScheduleId: number
): Promise<void> {
	await axiosInstance.delete(
		`/api/department-schedule/${departmentScheduleId}`
	);
}
