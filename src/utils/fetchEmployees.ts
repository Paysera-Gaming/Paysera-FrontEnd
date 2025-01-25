// src/utils/fetchEmployees.ts
import axios from 'axios';
import { Employee } from '@/components/SuperAdminComponents/EmployeeSuperAdmin/types'; // Adjust the import path as needed

export const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(import.meta.env.VITE_BASE_API + 'api/employee');
  return response.data;
};