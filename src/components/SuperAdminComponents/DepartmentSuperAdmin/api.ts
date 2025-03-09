import { axiosInstance } from '@/api';

export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accessLevel: string;
  isActive: boolean;
  role: string;
  departmentId?: number | null;
}

export interface Leader extends Employee {}

export interface Department {
  id: number;
  name: string;
  leaderId: number;
  updatedAt: string;
  createdAt: string;
  Employees: Employee[];
  Leader: Leader | null;
}

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await axiosInstance.get("/api/department");
    const departments: Department[] = response.data;

    // Ensure auditors are included in the Employees array
    departments.forEach(department => {
      if (department.Employees) {
        department.Employees = department.Employees.map(employee => ({
          ...employee,
          role: employee.accessLevel === "AUDITOR" ? "Auditor" : employee.role
        }));
      }
    });

    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
};

export const fetchTeamLeaders = async (): Promise<Leader[]> => {
  try {
    const response = await axiosInstance.get("/api/employee");
    return response.data.filter((employee: Employee) => employee.accessLevel === "TEAM_LEADER" && employee.departmentId === null);
  } catch (error) {
    console.error("Error fetching team leaders:", error);
    return [];
  }
};

export const fetchAuditors = async (): Promise<Employee[]> => {
  try {
    const response = await axiosInstance.get("/api/employee");
    return response.data.filter((employee: Employee) => employee.accessLevel === "AUDITOR" && employee.departmentId === null);
  } catch (error) {
    console.error("Error fetching auditors:", error);
    return [];
  }
};

export const addDepartment = async (newDepartment: { name: string; leaderId: number }) => {
  try {
    const response = await axiosInstance.post("/api/department", newDepartment);
    return response.data;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const updateDepartment = async (updatedDepartment: { id: number; name: string }) => {
  try {
    const response = await axiosInstance.put(`/api/department/${updatedDepartment.id}`, { name: updatedDepartment.name });
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

export const updateDepartmentLeader = async (updatedLeader: { id: number; leaderId: number }) => {
  try {
    const response = await axiosInstance.put(`/api/department/${updatedLeader.id}/leader`, { leaderId: updatedLeader.leaderId });
    return response.data;
  } catch (error) {
    console.error("Error updating department leader:", error);
    throw error;
  }
};

export const deleteDepartment = async (id: number) => {
  try {
    await axiosInstance.delete(`/api/department/${id}`);
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};