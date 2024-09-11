import { AxiosResponse } from 'axios';
import { axiosInstance } from '.';
import { toast } from 'sonner';

export async function login(email: string, password: string): Promise<string> {
	// 1st
	const response: AxiosResponse<{ message: string }> = await axiosInstance.post(
		'/api/login',
		{
			username: email,
			password: password,
		}
	);

	return response.data.message;
}

export async function getUserInfo(): Promise<TUserInfo> {
	const response: AxiosResponse<TUserInfo> = await axiosInstance.get(
		'/api/info'
	);

	return response.data;
}

export async function logout(): Promise<void> {
	await axiosInstance.post('/api/logout');
}

type TUserInfo = {
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
