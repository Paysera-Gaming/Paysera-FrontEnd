import { AxiosResponse } from 'axios';
import { axiosInstance } from '.';

export type TOvertimeRequest = {
	// overtime type
	employeeId: number;
	timeStamp: Date;
	limitOvertime: number;
};

export type TAcceptOvertime = {
	employeeId: number;
	timeStamp: Date;
	limitOvertime: number;
	isAllowedOvertime: boolean;
	isRejectedOvertime: boolean;
};

export async function requestOvertime(body: TOvertimeRequest) {
	// request overtime
	const response: AxiosResponse = await axiosInstance.post<TOvertimeRequest>(
		'/api/attendance/request-overtime',
		body
	);
	return response.status;
}

// this will reject or approve the overtime request
export async function handleOvertimeRequest(body: TAcceptOvertime) {
	const response: AxiosResponse = await axiosInstance.post<TAcceptOvertime>(
		'/api/attendance/accept-overtime',
		body
	);
	return response.status;
}
