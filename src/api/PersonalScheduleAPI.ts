import { TEmployee } from './EmployeeAPI';
import { TSchedule } from './ScheduleAPI';

import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';
import { set } from 'date-fns';

export type TDay =
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
	console.log('BAR');
	const response: AxiosResponse<TPersonalSchedule[]> = await axiosInstance.get(
		'/api/personal-schedule'
	);
	console.log(response);
	return response.data;
}

// post
export async function postPersonalSchedule(
	form: TPersonalSchedForms
): Promise<number> {
	if (form.scheduleType == 'FLEXI' || form.scheduleType == 'SUPER_FLEXI') {
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
		const response: AxiosResponse<TPersonalSchedForms> =
			await axiosInstance.post('/api/personal-schedule', {
				name: form.name,
				day: form.day,
				employeeId: form.employeeId,
				startTime: startDate,
				endTime: endDate,
				scheduleType: form.scheduleType,
			});

		return response.status;
	} else {
		const response: AxiosResponse<TPersonalSchedForms> =
			await axiosInstance.post('/api/personal-schedule', {
				name: form.name,
				day: form.day,
				employeeId: form.employeeId,
				startTime: form.timeIn,
				endTime: form.timeOut,
				scheduleType: form.scheduleType,
			});

		return response.status;
	}
}

// edit
// NOTE NOT FINISHED YET
export async function putPersonalSchedule(
	form: TPersonalSchedForms,
	id?: number
): Promise<number> {
	console.log('BURGER');

	if (form.scheduleType == 'FLEXI' || form.scheduleType == 'SUPER_FLEXI') {
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
		const response: AxiosResponse<TPersonalSchedForms> =
			await axiosInstance.put(`/api/personal-schedule/${id}`, {
				name: form.name,
				day: form.day,
				employeeId: form.employeeId,
				startTime: startDate,
				endTime: endDate,
				scheduleType: form.scheduleType,
			});

		return response.status;
	} else {
		const response: AxiosResponse<TPersonalSchedForms> =
			await axiosInstance.put(`/api/personal-schedule/${id}`, {
				name: form.name,
				day: form.day,
				employeeId: form.employeeId,
				startTime: form.timeIn,
				endTime: form.timeOut,
				scheduleType: form.scheduleType,
			});

		return response.status;
	}
}

// delete
export async function deletePersonalSchedule(
	personalScheduleId: number
): Promise<void> {
	await axiosInstance.delete(`/api/personal-schedule/${personalScheduleId}`);
}
