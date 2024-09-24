import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { redirect } from 'react-router-dom';
const url = import.meta.env.VITE_BASE_API;

export const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
});

type errorMessage = { message: string };

// Add a response interceptor
axiosInstance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error: AxiosError<errorMessage>) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		if (!error.response) {
			toast.error('Network Error');
			return Promise.reject(error);
		}

		const { status, data } = error.response;

		switch (status) {
			case 401:
				toast.error('Unauthorized Redirecting to login page');
				redirect('/login');
				break;
			case 400:
				toast.error(data.message || 'Bad Request');
				break;
			case 404:
				toast.error(data.message || 'Not Found');
				break;
			case 500:
				toast.error('Server Error');
				break;
			default:
				toast.error(data.message || 'An error occurred');
		}

		return Promise.reject(error);
	}
);
