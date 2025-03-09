import { axiosInstance } from '@/api';
import { Attendance } from './types';

export const getAttendanceList = async (departmentId: number): Promise<Attendance[]> => {
  const response = await axiosInstance.get(`/api/department/${departmentId}/attendance`);
  return response.data;
};