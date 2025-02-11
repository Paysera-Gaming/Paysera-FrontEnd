import axios from 'axios';
import { Announcement } from './types';

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

export const addAnnouncement = (newAnnouncement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => 
  axiosInstance.post('/api/announcements', newAnnouncement);

export const editAnnouncement = (updatedAnnouncement: Announcement) => 
  axiosInstance.put(`/api/announcements/${updatedAnnouncement.id}`, updatedAnnouncement);

export const deleteAnnouncement = (id: number) => 
  axiosInstance.delete(`/api/announcements/${id}`);