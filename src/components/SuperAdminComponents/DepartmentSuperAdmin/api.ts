import axios from 'axios';

export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: string;
  isActive: boolean;
  role: string;
}

export interface Leader extends Employee {}

export interface Department {
  id: number;
  name: string;
  leaderId: number;
  updatedAt: string;
  createdAt: string;
  Employees?: Employee[];
  Leader: Leader | null;
}

export const fetchDepartments = async (): Promise<Department[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/department`);
  return response.data;
};

export const fetchTeamLeaders = async (): Promise<Leader[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API}/api/employee/team-leader`);
  return response.data;
};

export const addDepartment = async (newDepartment: { name: string; leaderId: number }) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_API}/api/department`, newDepartment);
  return response.data;
};

export const updateDepartment = async (updatedDepartment: { id: number; name: string }) => {
  const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedDepartment.id}`, { name: updatedDepartment.name });
  return response.data;
};

export const updateDepartmentLeader = async (updatedLeader: { id: number; leaderId: number }) => {
  const response = await axios.put(`${import.meta.env.VITE_BASE_API}/api/department/${updatedLeader.id}/leader`, { leaderId: updatedLeader.leaderId });
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_BASE_API}/api/department/${id}`);
};