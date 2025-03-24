import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export type TAttendance = {
	// employee
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
		isAllowedRequestOvertime: boolean;
	};

	status: string;

	// time
	limitOvertime: number;
	date: string;
	timeIn: string;
	timeOut: string;
	timeHoursWorked: number;
	overTimeTotal: number;
	timeTotal: number;

	// lunch this is like deprecated i think
	lunchTimeIn: string;
	lunchTimeOut: string;
	lunchTimeTotal: number;

	// when this was created and updated
	createdAt: string;
	updatedAt: string;

	//  overtime approval
	RequestOvertimeStatus:
		| 'APPROVED_BY_ADMIN'
		| 'APPROVED_BY_TEAM_LEADER'
		| 'REJECTED_BY_ADMIN'
		| 'REJECTED_BY_TEAM_LEADER'
		| 'PENDING'
		| 'NO_REQUEST';

	//leave status
	RequestLeaveStatus:
		| 'APPROVED_BY_ADMIN'
		| 'APPROVED_BY_TEAM_LEADER'
		| 'REJECTED_BY_ADMIN'
		| 'REJECTED_BY_TEAM_LEADER'
		| 'PENDING'
		| 'NO_REQUEST';
};

export type TPutRequestBody = {
	RequestLeaveStatus:
		| 'APPROVED_BY_ADMIN'
		| 'APPROVED_BY_TEAM_LEADER'
		| 'REJECTED_BY_ADMIN'
		| 'REJECTED_BY_TEAM_LEADER'
		| 'PENDING'
		| 'NO_REQUEST';
};

export type TAttendancePostRequestBody = {
	employeeId: number;
	date: string;
	status: 'DONE' | 'PAID_LEAVE' | 'ONGOING';
	scheduleType: 'FIXED' | 'SUPER_FLEXI' | 'FLEXI';
	timeIn: string;
	timeOut: string;
	isAllowedOvertime: boolean;
	overtimeTotal: number;
	RequestOverTimeStatus:
		| 'APPROVED_BY_ADMIN'
		| 'APPROVED_BY_TEAM_LEADER'
		| 'REJECTED_BY_ADMIN'
		| 'REJECTED_BY_TEAM_LEADER'
		| 'PENDING'
		| 'NO_REQUEST';
	RequestLeaveStatus:
		| 'APPROVED_BY_ADMIN'
		| 'APPROVED_BY_TEAM_LEADER'
		| 'REJECTED_BY_ADMIN'
		| 'REJECTED_BY_TEAM_LEADER'
		| 'PENDING'
		| 'NO_REQUEST';
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

export async function putAttendance(body: TPutRequestBody) {
	const { status } = await axiosInstance.put<TAttendance>(
		`/api/attendance`,
		body
	);

	return status;
}

export async function postAttendance(body: TAttendancePostRequestBody) {
	const { status } = await axiosInstance.post<TAttendance>(
		`/api/attendance`,
		body
	);

	return status;
}
