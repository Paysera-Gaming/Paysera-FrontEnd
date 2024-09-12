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

	console.log(response.data);

	return response.data;
}

// {
//   "id": 0,
//   "employeeId": 0,
//   "employee": {
//     "id": 1,
//     "accessLevel": "ADMIN",
//     "departmentId": 1,
//     "isActive": false,
//     "username": "pangilinan2002",
//     "firstName": "Ervin",
//     "lastName": "Pangilinan",
//     "middleName": "Capili",
//     "role": "Software Engineer"
//   },
//   "date": "2024-09-12T10:09:03.754Z",
//   "status": "BREAK",
//   "timeIn": "2024-09-12T10:09:03.754Z",
//   "timeOut": "2024-09-12T10:09:03.754Z",
//   "timeHoursWorked": 0,
//   "overTimeTotal": 0,
//   "timeTotal": 0,
//   "lunchTimeIn": "2024-09-12T10:09:03.754Z",
//   "lunchTimeOut": "2024-09-12T10:09:03.754Z",
//   "lunchTimeTotal": 0,
//   "createdAt": "2024-09-12T10:09:03.754Z",
//   "updatedAt": "2024-09-12T10:09:03.754Z"
// }
