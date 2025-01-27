import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';
import { set, addHours } from 'date-fns';
export type TInputForm = {
	name: string;
	role: string;
	timeIn: Date;
	timeOut: Date;
	allowedOverTime: boolean;
	scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
	// lunchStartTime: string;
	// lunchEndTime: string;
};

export type TSchedule = {
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

export type TDepartmentSchedules = {
	id: number;
	name: string;
	role: string;
	scheduleId: number;
	departmentId: number;
	updatedAt: string;
	createdAt: string;
	Schedule: TSchedule;
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
	if (
		schedule.scheduleType == 'FLEXI' ||
		schedule.scheduleType == 'SUPER_FLEXI'
	) {
		// for flexi schedules we will automatically
		// add 6am to 10pm for their
		const today = new Date();

		const startDate = set(today, {
			hours: 6,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});

		const endDate = set(today, {
			hours: 22,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});

		const response: AxiosResponse<TInputForm> = await axiosInstance.post(
			`/api/department-schedule`,
			{
				name: schedule.name,
				role: schedule.role,
				departmentId: departmentId,
				scheduleType: schedule.scheduleType,
				startTime: startDate,
				endTime: endDate,
				limitWorkHoursDay: 8,
				allowedOvertime: schedule.allowedOverTime,
				lunchStartTime: new Date(),
				lunchEndTime: addHours(new Date(), 1),
			}
		);

		return response.status;
	} else {
		const response: AxiosResponse<TInputForm> = await axiosInstance.post(
			`/api/department-schedule`,
			{
				name: schedule.name,
				role: schedule.role,
				departmentId: departmentId,
				scheduleType: schedule.scheduleType,
				startTime: schedule.timeIn,
				endTime: schedule.timeOut,
				limitWorkHoursDay: 8,
				allowedOvertime: schedule.allowedOverTime,
				lunchStartTime: new Date(),
				lunchEndTime: addHours(new Date(), 1),
			}
		);

		return response.status;
	}
}

export async function updateSchedule(
	schedule: TInputForm,
	departmentScheduleId: number
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
			lunchStartTime: new Date(),
			lunchEndTime: addHours(new Date(), 1),
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
