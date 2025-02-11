export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  status: string;
  scheduleType: string;
  timeIn: string;
  timeOut: string;
  timeHoursWorked: number | null;
  overTimeTotal: number | null;
  timeTotal: number;
  lunchTimeIn: string;
  lunchTimeOut: string;
  lunchTimeTotal: number;
  createdAt: string;
  updatedAt: string;
  calculatedOverTime: boolean; // Added calculatedOverTime property
  paidLeave: number; // Add this line
  employee: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: string;
    accessLevel: string;
    isActive: boolean;
    department: string; // Changed department property to string
  };
  employeeName: string; // Added employeeName property
}

export interface PaidLeavePayload {
  employeeId: number;
  date: string;
  status: string;
  scheduleType: string;
  timeIn: string;
  timeOut: string;
  lunchTimeIn: string;
  lunchTimeOut: string;
  timeHoursWorked: number;
  lunchTimeTotal: number;
  timeTotal: number;
}