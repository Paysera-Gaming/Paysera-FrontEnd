import { AxiosResponse } from 'axios';
import { axiosInstance } from '.';

export type TLeaveRequest = {
	startDate: string;
	endDate: string;
	reason: string;
	type: string;
	employeeID: number;
};

export type THandleLeaveRequest = {
	startDate: string;
	endDate: string;
	reason: string;
	type: string;
};

export async function requestLeave(body: TLeaveRequest) {
	const response: AxiosResponse = await axiosInstance.post<TLeaveRequest>(
		'/api/attendance/request-leave',
		body
	);
	return response.status;
}

export async function handleLeaveRequest(body: THandleLeaveRequest) {
	const response: AxiosResponse = await axiosInstance.post<THandleLeaveRequest>(
		'/api/attendance/accept-leave',
		body
	);
	return response.status;
}
