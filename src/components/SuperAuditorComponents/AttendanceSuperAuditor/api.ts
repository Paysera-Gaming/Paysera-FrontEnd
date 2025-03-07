import { axiosInstance } from '@/api';

import { Attendance } from './types';

export const getAttendanceList = async (): Promise<Attendance[]> => {
  const response = await axiosInstance.get(`/api/attendance`);
  return response.data;
};