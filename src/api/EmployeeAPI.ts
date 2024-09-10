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
	return response.data;
}

type TAddEmployee = z.infer<typeof formSchemaAddEmployee>;

export async function addEmployeeInDepartment(
	employee: TAddEmployee,
	departmentId: string
): Promise<TAddEmployee> {
	alert('Employee Added!');
	const response: AxiosResponse<TEmployee> = await axiosInstance.put(
		`/api/department/${departmentId}/employee`,
		{ employeeId: employee.id, role: employee.role }
	);

	return response.data;
}
