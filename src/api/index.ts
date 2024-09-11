import axios from 'axios';
import { toast } from 'sonner';

const url = import.meta.env.VITE_APP_API_URL;

export const axiosInstance = axios.create({
	baseURL: url,
	headers: {
		// token here
		// Authorization: `Bearer `,
	},
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	function (config) {
		// Do something before request is sent

		return config;
	},
	function (error) {
		// Do something with request error
		toast.error('ERROR HAS OCCURED CHECK THE LOGS FOR MORE INFO');
		return Promise.reject(error);
	}
);
