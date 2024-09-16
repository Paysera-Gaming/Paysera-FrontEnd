import axios from 'axios';
import { Employee } from './types';

const apiBase = import.meta.env.VITE_BASE_API;

export const getEmployeeList = async (): Promise<Employee[]> => {
  const response = await axios.get(`${apiBase}/api/employee`);
  return response.data;
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
  const response = await axios.post(`${apiBase}/api/employee`, employee);
  return response.data;
};