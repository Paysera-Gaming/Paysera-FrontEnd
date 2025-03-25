import { axiosInstance } from "@/api"
import type { Attendance } from "./types"
import { AxiosError } from "axios"

export const getAttendanceList = async (): Promise<Attendance[]> => {
  const response = await axiosInstance.get(`/api/attendance`)
  return response.data
}

// Updated to handle both approval and rejection properly
export const updateLeaveRequestStatus = async (
  attendanceId: number,
  status: "APPROVED_BY_ADMIN" | "REJECTED_BY_ADMIN",
): Promise<Attendance> => {
  try {
    // Make sure we're sending the exact format the backend expects
    const payload = {
      RequestLeaveStatus: status,
    }

    console.log(`Sending request to update attendance ${attendanceId} with status: ${status}`, payload)

    // Use PUT method which is more commonly allowed in CORS
    const response = await axiosInstance.put(`/api/attendance/${attendanceId}`, payload)

    return response.data
  } catch (error) {
    // Log detailed error information to help diagnose the issue
    console.error(`Error updating attendance ${attendanceId} with status ${status}:`, error)

    // Type guard to check if it's an AxiosError
    if (error instanceof AxiosError) {
      console.error("Error response data:", error.response?.data)
      console.error("Error response status:", error.response?.status)

      // Try an alternative approach if the first one fails
      if (status === "REJECTED_BY_ADMIN" && error.response?.status === 400) {
        console.log("Attempting alternative approach for rejection...")

        // Try with a different payload structure or different field name
        // This is a fallback in case the API expects a different format
        const alternativePayload = {
          // Try different variations that might work with the backend
          requestLeaveStatus: status, // lowercase first letter
          request_leave_status: status, // snake_case
          leaveStatus: status, // different field name
          status: status, // simplified field name
        }

        console.log("Trying alternative payload:", alternativePayload)
        const alternativeResponse = await axiosInstance.put(`/api/attendance/${attendanceId}`, alternativePayload)
        return alternativeResponse.data
      }
    }

    // If all attempts fail, rethrow the error
    throw error
  }
}

