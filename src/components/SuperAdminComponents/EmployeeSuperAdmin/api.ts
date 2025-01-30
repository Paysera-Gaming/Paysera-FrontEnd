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

export const getEmployeeDetails = async (employeeId: number): Promise<Employee> => {
  const response = await axiosInstance.get(`/api/employee/${employeeId}`);
  const employee = response.data;

  // Fetch department details
  const departmentResponse = await axiosInstance.get(`/api/department/${employee.departmentId}`);
  employee.departmentName = departmentResponse.data.name;

  return employee;
};