import { axiosInstance } from '.';
import { AxiosResponse } from 'axios';

export interface IHoliday {
	id: number;
	name: string;
	month: string;
	day: number;
	createdAt: string;
	updatedAt: string;
}

export interface IAnnouncements {
	id: number;
	title: string;
	body: string;
	createdAt: string;
	updatedAt: string;
}

export async function getAnnouncements(): Promise<IAnnouncements[]> {
	const response: AxiosResponse<IAnnouncements[]> = await axiosInstance.get(
		'/api/announcements'
	);

	return response.data;
}

export async function getHolidays(): Promise<IHoliday[]> {
	const response: AxiosResponse<IHoliday[]> = await axiosInstance.get(
		'/api/holiday'
	);

	return response.data;
}
