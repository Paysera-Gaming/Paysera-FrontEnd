import axios from 'axios';
import { toast } from 'sonner';
import { redirect } from 'react-router-dom';
const url = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
	baseURL: url,
	withCredentials: true,
});

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error

		if (error.response.status === 401) {
			toast.error('Unauthorized Redirecting to login page');
			redirect('/login');
		}

		return Promise.reject(error);
	}
);
