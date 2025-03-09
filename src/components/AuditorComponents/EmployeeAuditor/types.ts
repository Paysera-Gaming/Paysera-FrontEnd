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
    const role = employee.accessLevel.toLowerCase() as keyof EmployeeCounts['overall'];
    counts.overall[role]++;
    if (employee.isActive) {
      counts.online[role]++;
    } else {
      counts.offline[role]++;
    }
  });

  return counts;
}

// Add this interface
export interface Department {
  id: number;
  name: string;
  description?: string;
}