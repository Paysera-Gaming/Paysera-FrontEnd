import { TEmployee } from '@/components/DataTable/DataColumns';
import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export async function getAllEmployees(): Promise<TEmployee[]> {
	const response: AxiosResponse<TEmployee[]> = await axiosInstance.get(
		'employee'
	);
	console.log(response.data);
	return response.data;
}
