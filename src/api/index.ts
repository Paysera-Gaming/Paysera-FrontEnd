import axios from 'axios';
import { toast } from 'sonner';

const url = 'https://192.168.110.68:8080/api';

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
		console.log('this should work');

		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error

		toast.error('ERROR HAS OCCURED CHECK THE LOGS FOR MORE INFO');

		return Promise.reject(error);
	}
);
