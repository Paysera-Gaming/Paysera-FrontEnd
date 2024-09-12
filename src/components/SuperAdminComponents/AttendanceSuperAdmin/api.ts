import axios from 'axios';
import { Attendance } from './types';

const apiBase = import.meta.env.VITE_BASE_API;

export const getAttendanceList = async (): Promise<Attendance[]> => {
  const response = await axios.get(`${apiBase}/api/attendance`);
  return response.data;
};