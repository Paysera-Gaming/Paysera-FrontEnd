import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export type TInputForm = {
	name: string;
	role: string;
	timeIn: Date;
	timeOut: Date;
	lunchTimeIn: Date;
	lunchTimeOut: Date;
	allowedOverTime: boolean;
	scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
};

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

export async function createSchedule(
	departmentId: number,
	schedule: TInputForm
): Promise<number> {
	const totalHours = calculateTotalHours(
		schedule.timeIn.toDateString(),
		schedule.timeOut.toDateString()
	);
	const response: AxiosResponse<TInputForm> = await axiosInstance.post(
		`/api/department-schedule`,
		{
			role: schedule.role,
			departmentId: departmentId,
			scheduleType: schedule.scheduleType,
			startTime: schedule.timeIn,
			endTime: schedule.timeOut,
			limitWorkHoursDay: totalHours,
			allowedOvertime: schedule.allowedOverTime,
			lunchStartTime: schedule.lunchTimeIn,
			lunchEndTime: schedule.lunchTimeOut,
		}
	);

	return response.status;
}

export async function updateSchedule(
	departmentScheduleId: number,
	schedule: TInputForm
): Promise<number> {
	const totalHours = calculateTotalHours(
		schedule.timeIn.toDateString(),
		schedule.timeOut.toDateString()
	);
	const response: AxiosResponse<TInputForm> = await axiosInstance.put(
		`/api/department-schedule/${departmentScheduleId}`,
		{
			name: schedule.name,
			role: schedule.role,
			scheduleType: schedule.scheduleType,
			startTime: schedule.timeIn,
			endTime: schedule.timeOut,
			limitWorkHoursDay: totalHours,
			allowedOvertime: schedule.allowedOverTime,
			lunchStartTime: schedule.lunchTimeIn,
			lunchEndTime: schedule.lunchTimeOut,
		}
	);
	return response.status;
}

export async function deleteSchedule(
	departmentScheduleId: number
): Promise<void> {
	await axiosInstance.delete(
		`/api/department-schedule/${departmentScheduleId}`
	);
}
