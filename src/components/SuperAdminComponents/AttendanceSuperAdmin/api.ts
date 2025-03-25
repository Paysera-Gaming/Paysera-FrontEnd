import { axiosInstance } from "@/api"

import type { Attendance } from "./types"

export const getAttendanceList = async (): Promise<Attendance[]> => {
  const response = await axiosInstance.get(`/api/attendance`)
  return response.data
}

// Updated to use PUT instead of PATCH to avoid CORS issues
export const updateLeaveRequestStatus = async (
  attendanceId: number,
  status: "APPROVED_BY_ADMIN" | "REJECTED_BY_ADMIN",
): Promise<Attendance> => {
  // Use PUT method which is more commonly allowed in CORS
  const response = await axiosInstance.put(`/api/attendance/${attendanceId}`, {
    RequestLeaveStatus: status,
  })
  return response.data
}

