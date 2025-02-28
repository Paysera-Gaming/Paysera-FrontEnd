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
    auditor: number; // Add this line
    superAuditor: number; // Add this line
  };
  online: {
    employee: number;
    teamLeader: number;
    admin: number;
    auditor: number; // Add this line
    superAuditor: number; // Add this line
  };
  offline: {
    employee: number;
    teamLeader: number;
    admin: number;
    auditor: number; // Add this line
    superAuditor: number; // Add this line
  };
}

export function getEmployeeCounts(employees: Employee[]): EmployeeCounts {
  const counts: EmployeeCounts = {
    overall: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0, // Add this line
      superAuditor: 0, // Add this line
    },
    online: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0, // Add this line
      superAuditor: 0, // Add this line
    },
    offline: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
      auditor: 0, // Add this line
      superAuditor: 0, // Add this line
    },
  };

  employees.forEach((employee) => {
    // Overall counts
    if (employee.accessLevel === "EMPLOYEE") {
      counts.overall.employee++;
    } else if (employee.accessLevel === "TEAM_LEADER") {
      counts.overall.teamLeader++;
    } else if (employee.accessLevel === "ADMIN") {
      counts.overall.admin++;
    } else if (employee.accessLevel === "AUDITOR") {
      // Add this line
      counts.overall.auditor++;
    } else if (employee.accessLevel === "SUPER_AUDITOR") {
      // Add this line
      counts.overall.superAuditor++;
    }

    // Online/Offline counts
    if (employee.attendanceStatus === "ONGOING") {
      if (employee.accessLevel === "EMPLOYEE") {
        counts.online.employee++;
      } else if (employee.accessLevel === "TEAM_LEADER") {
        counts.online.teamLeader++;
      } else if (employee.accessLevel === "ADMIN") {
        counts.online.admin++;
      } else if (employee.accessLevel === "AUDITOR") {
        // Add this line
        counts.online.auditor++;
      } else if (employee.accessLevel === "SUPER_AUDITOR") {
        // Add this line
        counts.online.superAuditor++;
      }
    } else {
      if (employee.accessLevel === "EMPLOYEE") {
        counts.offline.employee++;
      } else if (employee.accessLevel === "TEAM_LEADER") {
        counts.offline.teamLeader++;
      } else if (employee.accessLevel === "ADMIN") {
        counts.offline.admin++;
      } else if (employee.accessLevel === "AUDITOR") {
        // Add this line
        counts.offline.auditor++;
      } else if (employee.accessLevel === "SUPER_AUDITOR") {
        // Add this line
        counts.offline.superAuditor++;
      }
    }
  });

  return counts;
}

// Example usage:
const employees: Employee[] = [
  // Your employee data here
];

const counts = getEmployeeCounts(employees);
console.log(counts);
