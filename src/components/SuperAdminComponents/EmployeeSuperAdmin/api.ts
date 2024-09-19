import { axiosInstance } from '@/api';

import { Employee } from './types';

export const getEmployeeList = async (): Promise<Employee[]> => {
  const response = await axiosInstance.get(`/api/employee`);
  return response.data;
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axiosInstance.post(`/api/employee`, employee);
  return response.data;
};