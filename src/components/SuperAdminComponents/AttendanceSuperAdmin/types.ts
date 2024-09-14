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
  employee: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: string;
    accessLevel: string;
    isActive: boolean;
  };
  employeeName: string; // Added employeeName property
}