// src/types.ts
export interface Employee {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string; // Make middleName optional
  accessLevel: 'EMPLOYEE' | 'TEAM_LEADER' | 'ADMIN'; // Define accessLevel as a union type
  isActive: boolean;
}