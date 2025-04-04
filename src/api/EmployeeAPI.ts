import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';
import { z } from 'zod';

export interface TEmployee {
	id: number;
	departmentId: string | null;
	accessLevel: string;
	isActive: boolean;
	username: string;
	firstName: string;
	lastName: string;
	middleName: string;
	role: string;
	isAllowedRequestOvertime: boolean;
}

const formSchemaAddEmployee = z.object({
	username: z
		.string()
		.min(5, { message: 'Minimum Charactus must be atleast 5' }),
	role: z.string().min(5, { message: 'Minimum Charactus must be atleast 5' }),
});

export async function getAllEmployees(): Promise<TEmployee[]> {
	const response: AxiosResponse<TEmployee[]> = await axiosInstance.get(
		'/api/employee'
	);
	console.log('response', response.data);
	return response.data;
}

export async function getAllEmployeesWithNoDepartment(): Promise<TEmployee[]> {
	const response: AxiosResponse<TEmployee[]> = await axiosInstance.get(
		'/api/employee/?department=null'
	);
	console.log('response', response.data);
	return response.data;
}

export async function getAllEmployeesInDepartment(
	department: string
): Promise<TEmployee[]> {
	const response: AxiosResponse<TEmployee[]> = await axiosInstance.get(
		`/api/department/${department}/employee`
	);

	return response.data;
}

type TAddEmployee = z.infer<typeof formSchemaAddEmployee>;

export async function addEmployeeInDepartment(
	employee: TAddEmployee,
	departmentId: string
): Promise<TAddEmployee> {
	const response: AxiosResponse<TEmployee> = await axiosInstance.put(
		`/api/department/${departmentId}/employee`,
		{ username: employee.username, role: employee.role }
	);

	return response.data;
}

export async function updateEmployee(
	employeeInfo: TEmployee
): Promise<TAddEmployee> {
	const response: AxiosResponse<TEmployee> = await axiosInstance.put(
		`/api/employee/${employeeInfo.id}`,
		{
			id: employeeInfo.id,
			accessLevel: employeeInfo.accessLevel,
			isActive: employeeInfo.isActive,
			username: employeeInfo.username,
			firstName: employeeInfo.firstName,
			lastName: employeeInfo.lastName,
			middleName: employeeInfo.middleName,
			role: employeeInfo.role,
		}
	);

	return response.data;
}

export async function deleteEmployee(
	employeeId: number,
	departmentId: number
): Promise<number> {
	const response: AxiosResponse<void> = await axiosInstance.delete(
		`/api/department/${departmentId}/employee`,
		{
			data: {
				employeeId,
			},
		}
	);
	return response.status;
}
