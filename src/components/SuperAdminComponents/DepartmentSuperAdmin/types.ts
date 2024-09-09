export interface Employee {
    id: number;
    accessLevel: string;
    isActive: boolean;
    username: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    role: string;
}

export interface Schedule {
    id: number;
    day: string;
    name: string;
    description: string;
    scheduleType: string;
    fixedStartTime: string;
    fixedEndTime: string;
    flexStartTime: string;
    flexEndTime: string;
    limitWorkHoursDay: number;
    allowedOvertime: boolean;
    lunchStartTime: string;
    lunchEndTime: string;
    isSoloSchedule: boolean;
    isDepartmentSchedule: boolean;
    isTemplateBased: boolean;
    updatedAt: string;
    createdAt: string;
}

export interface DepartmentSchedule {
    id: number;
    scheduleId: number;
    Schedule: Schedule;
    departmentId: number;
    updatedAt: string;
    createdAt: string;
}

export interface TeamMember {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    role: string;
}

export interface Team {
    id: number;
    teamLeader: TeamMember | null;
    members: TeamMember[];
}

export interface Department {
    id: number;
    name: string;
    description: string;
    leaderId: number;
    Leader: Employee;
    DepartmentSchedule: DepartmentSchedule[];
    Employees: Employee[];
    teams?: Team[]; // Add this if teams are optional
    updatedAt: string;
    createdAt: string;
}