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

		if (error.response === undefined) {
			toast.error('Network Error');
			return Promise.reject(error);
		}

		if (error.response?.status === 401) {
			toast.error('Unauthorized Redirecting to login page');
			redirect('/login');
		}

		if (error.response?.status >= 500) {
			toast.error('Server Error');
		}

		if (error.response?.status == 400) {
			toast.error(error.response.data.message);
		}

		return Promise.reject(error);
	}
);
