import { TEmployee } from '@/components/DataTable/DataColumns';
import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';
import { z } from 'zod';
import { formSchemaAddEmployee } from '@/components/TeamLeadComponents/DialogForms/AddEmployee';

export async function getAllEmployees(): Promise<TEmployee[]> {
	const response: AxiosResponse<TEmployee[]> = await axiosInstance.get(
		'/api/employee'
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
	console.log(response.data);
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
