import { AxiosResponse } from 'axios';
import { axiosInstance } from '.';
import { toast } from 'sonner';

export type TUserInfo = {
	id: number;
	accessLevel: string;
	departmentId: number;
	isActive: boolean;
	username: string;
	firstName: string;
	lastName: string;
	middleName: string;
	role: string;
	departmentName: string;
};

export async function login(
	email: string,
	password: string
): Promise<TUserInfo> {
	const response: AxiosResponse<{ message: string }> = await axiosInstance.post(
		'/api/login',
		{
			username: email,
			password: password,
		}
	);

	if (response.status === 200) {
		// if the response is 200 then we can get the user info
		return await getUserInfo().then((data) => {
			return data;
		});
	} else {
		toast.error(response.data.message);
		throw new Error(response.data.message);
	}
}

async function getUserInfo(): Promise<TUserInfo> {
	const response: AxiosResponse<TUserInfo> = await axiosInstance.get(
		'/api/info'
	);

	return response.data;
}

export async function logout(): Promise<void> {
	await axiosInstance.post('/api/logout');
}