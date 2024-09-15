import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export type TClockRequestBody = {
	employeeId: number;
	timeIn: string;
};

export async function clockIn(body: TClockRequestBody): Promise<number> {
	const response: AxiosResponse<number> = await axiosInstance.post(
		'/api/attendance/time-in',
		body
	);

	return response.status;
}

export async function clockOut(body: TClockRequestBody): Promise<number> {
	const response: AxiosResponse<number> = await axiosInstance.post(
		'/api/attendance/time-out',
		body
	);
	return response.status;
}

export async function lunchIn(body: TClockRequestBody): Promise<number> {
	const response: AxiosResponse<number> = await axiosInstance.post(
		'/api/attendance/lunch-in',
		body
	);
	return response.status;
}

export async function lunchOut(body: TClockRequestBody): Promise<number> {
	const response: AxiosResponse<number> = await axiosInstance.post(
		'/api/attendance/lunch-out',
		body
	);
	return response.status;
}
