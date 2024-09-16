// Ensure this file exports Employee type
export interface Employee {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    accessLevel: 'EMPLOYEE' | 'TEAM_LEADER' | 'ADMIN';
    isActive: boolean;
}