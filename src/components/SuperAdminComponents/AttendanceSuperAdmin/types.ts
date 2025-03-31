export interface Attendance {
  id: number
  employeeId: number
  date: string
  status: string
  scheduleType: string
  timeIn: string
  timeOut: string
  timeHoursWorked: number | null
  overTimeTotal: number | null
  timeTotal: number
  lunchTimeIn: string
  lunchTimeOut: string
  lunchTimeTotal: number
  createdAt: string
  updatedAt: string
  calculatedOverTime: boolean
  paidLeave: number
  RequestLeaveStatus:
    | "APPROVED_BY_ADMIN"
    | "APPROVED_BY_TEAM_LEADER"
    | "REJECTED_BY_ADMIN"
    | "REJECTED_BY_TEAM_LEADER"
    | "PENDING"
    | "NO_REQUEST"
  employee: {
    id: number
    username: string
    firstName: string
    lastName: string
    middleName: string
    role: string
    accessLevel: string
    isActive: boolean
    department: string
  }
  employeeName: string
}

export interface PaidLeavePayload {
  employeeId: number
  date: string
  status: string
  scheduleType: string
  timeIn: string
  timeOut: string
  lunchTimeIn: string
  lunchTimeOut: string
  timeHoursWorked: number
  lunchTimeTotal: number
  timeTotal: number
}

