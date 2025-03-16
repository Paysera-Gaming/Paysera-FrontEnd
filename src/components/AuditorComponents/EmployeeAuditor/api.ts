import { axiosInstance } from '@/api';
import { Employee, Department } from './types';

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

  if (employee.departmentId) {
    try {
      // Fetch department details
      const departmentResponse = await axiosInstance.get(`/api/department/${employee.departmentId}`);
      employee.departmentName = departmentResponse.data.name;
    } catch {
      // Handle invalid department ID
      employee.departmentName = null;
    }
  } else {
    employee.departmentName = null;
  }

  return employee;
};

// Add this function
export const getDepartmentDetails = async (departmentId: number): Promise<Department> => {
  const response = await axiosInstance.get(`/api/department/${departmentId}`);
  return response.data;
};