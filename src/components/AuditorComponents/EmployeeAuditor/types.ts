export interface Employee {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  accessLevel:
    | "EMPLOYEE"
    | "TEAM_LEADER"
    | "ADMIN"
    | "AUDITOR"
    | "SUPER_AUDITOR"; // Updated accessLevel
  isActive: boolean;
  departmentId: number;
  departmentName?: string;
  role: string;
  attendanceStatus: string;
  isAllowedRequestOvertime: boolean; // Add this line
}

export interface EmployeeCounts {
  overall: {
    employee: number;
    teamLeader: number;
    admin: number;
    auditor: number;
    superAuditor: number;
  };
  online: {
    employee: number;
    teamLeader: number;
    admin: number;
    auditor: number;
    superAuditor: number;
  };
  offline: {
    employee: number;
    teamLeader: number;
    admin: number;
    auditor: number;
    superAuditor: number;
  };
}
export function getEmployeeCounts(employees: Employee[]): EmployeeCounts {
  const counts: EmployeeCounts = {
    overall: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0,
      superAuditor: 0,
    },
    online: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0,
      superAuditor: 0,
    },
    offline: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0,
      superAuditor: 0,
    },
  };

  employees.forEach((employee) => {
    const role = employee.accessLevel; // Use the exact `accessLevel` value without converting to lowercase
    if (role === "EMPLOYEE") {
      counts.overall.employee++;
      employee.isActive ? counts.online.employee++ : counts.offline.employee++;
    } else if (role === "TEAM_LEADER") {
      counts.overall.teamLeader++;
      employee.isActive ? counts.online.teamLeader++ : counts.offline.teamLeader++;
    } else if (role === "ADMIN") {
      counts.overall.admin++;
      employee.isActive ? counts.online.admin++ : counts.offline.admin++;
    } else if (role === "AUDITOR") {
      counts.overall.auditor++;
      employee.isActive ? counts.online.auditor++ : counts.offline.auditor++;
    } else if (role === "SUPER_AUDITOR") {
      counts.overall.superAuditor++;
      employee.isActive ? counts.online.superAuditor++ : counts.offline.superAuditor++;
    }
  });

  return counts;
}

export interface Department {
  id: number;
  name: string;
  leaderId: number;
  auditorId: number;
  createdAt: string;
  updatedAt: string;
}