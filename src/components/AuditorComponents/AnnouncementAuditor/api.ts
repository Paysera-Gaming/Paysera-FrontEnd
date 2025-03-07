import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_API;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchAnnouncements = async () => {
  try {
    const response = await axiosInstance.get('/api/announcements');
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      return [response.data];
    }
    return [];
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};