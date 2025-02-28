import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { redirect } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
const url = import.meta.env.VITE_BASE_API;

function clearEverything() {
	window.location.href = '/';
	useUserStore.getState().clearUser();
	localStorage.clear();
	document.cookie.split(';').forEach((c) => {
		c = c.trim();
		document.cookie =
			c.substring(0, c.indexOf('=')) +
			'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
	});
}

export const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
});

type errorMessage = { message: string };

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
			console.log(error);
			switch (error.status) {
				case 401:
					toast.error('Unauthorized Redirecting to login page in 3 seconds');
					setTimeout(clearEverything, 3000);
					break;
				case 400:
					toast.error('Bad Request');
					break;
				case 404:
					toast.error('Not Found');
					break;
				case 500:
					toast.error('Server Error');
					break;
				default:
					toast.error('An error occurred');
			}

			return Promise.reject(error);
		}

		const { status, data } = error.response;

		switch (status) {
			case 401:
				toast.error('Unauthorized Redirecting to login page in 3 Seconds');

				setTimeout(clearEverything, 3000);

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
