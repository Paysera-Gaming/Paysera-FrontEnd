export interface Employee {
  id: number;
  email: string; // Add email field
  username: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  accessLevel: "EMPLOYEE" | "TEAM_LEADER" | "ADMIN";
  isActive: boolean;
  departmentId: number;
  departmentName?: string;
  role: string;
}
export interface EmployeeCounts {
  overall: {
    employee: number;
    teamLeader: number;
    admin: number;
  };
  online: {
    employee: number;
    teamLeader: number;
    admin: number;
  };
  offline: {
    employee: number;
    teamLeader: number;
    admin: number;
  };
}

export function getEmployeeCounts(employees: Employee[]): EmployeeCounts {
  const counts: EmployeeCounts = {
    overall: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
    },
    online: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
    },
    offline: {
      employee: 0,
      teamLeader: 0,
      admin: 0,
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
    }

    // Online/Offline counts
    if (employee.isActive) {
      if (employee.accessLevel === "EMPLOYEE") {
        counts.online.employee++;
      } else if (employee.accessLevel === "TEAM_LEADER") {
        counts.online.teamLeader++;
      } else if (employee.accessLevel === "ADMIN") {
        counts.online.admin++;
      }
    } else {
      if (employee.accessLevel === "EMPLOYEE") {
        counts.offline.employee++;
      } else if (employee.accessLevel === "TEAM_LEADER") {
        counts.offline.teamLeader++;
      } else if (employee.accessLevel === "ADMIN") {
        counts.offline.admin++;
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
