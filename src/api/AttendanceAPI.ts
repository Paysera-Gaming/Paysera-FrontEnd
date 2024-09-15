import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export type TAttendance = {
	id: number;
	employeeId: number;
	employee: {
		id: number;
		accessLevel: string;
		departmentId: number;
		isActive: boolean;
		username: string;
		firstName: string;
		lastName: string;
		middleName: string;
		role: string;
	};
	date: string;
	status: string;
	timeIn: string;
	timeOut: string;
	timeHoursWorked: number;
	overTimeTotal: number;
	timeTotal: number;
	lunchTimeIn: string;
	lunchTimeOut: string;
	lunchTimeTotal: number;
	createdAt: string;
	updatedAt: string;
};

export async function getAttendance(
	departmentId: string
): Promise<TAttendance[]> {
	const response: AxiosResponse<TAttendance[]> = await axiosInstance.get(
		`/api/department/${departmentId}/attendance`
	);

	return response.data;
}

export async function getAttendanceToday(
	departmentId: string
): Promise<TAttendance[]> {
	const response: AxiosResponse<TAttendance[]> = await axiosInstance.get(
		`/api/department/${departmentId}/attendance/today`
	);

	return response.data;
}
