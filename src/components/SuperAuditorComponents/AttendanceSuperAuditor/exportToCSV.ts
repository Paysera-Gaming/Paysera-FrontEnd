import Papa from "papaparse";
import { Attendance } from "./types";
import { formatDate, formatTime, calculateWorkTimeTotal } from "./utils";
import { format } from "date-fns";

type FormattedData = {
  "First Name": string;
  "Last Name": string;
  Date: string;
  Status: string;
  "Schedule Type": string;
  "Time In": string;
  "Time Out": string;
  "Lunch Time Total": string | number;
  "Work Time Total": string | number;
  "Overtime Total": string | number;
  "Paid Leave": string | number;
  "Total Time": string | number;
};

export const exportToCSV = (
  data: Attendance[],
  dateRange: { from: Date; to: Date } | undefined
) => {
  const employeeWorkTime: { [key: string]: number } = {};
  const employeeOvertime: { [key: string]: number } = {};
  const employeePaidLeave: { [key: string]: number } = {};
  const employeeDaysWorked: { [key: string]: number } = {};
  let overallTotalHours = 0;
  let overallPaidLeave = 0;
  let overallOvertime = 0;
  let overallDaysWorked = 0;

  const csvData = data.map((attendance) => {
    const workTimeTotal =
      attendance.timeIn && attendance.timeOut
        ? calculateWorkTimeTotal(
            attendance.timeIn,
            attendance.timeOut,
            attendance.lunchTimeTotal
          )
        : 0;
    const paidLeaveTotal =
      attendance.status === "PAID_LEAVE" ? attendance.timeTotal : 0;
    const overtimeTotal = attendance.overTimeTotal ?? 0;

    const formattedData: FormattedData = {
      "First Name": attendance.employee.firstName,
      "Last Name": attendance.employee.lastName,
      Date: formatDate(attendance.date),
      Status: attendance.status,
      "Schedule Type": attendance.scheduleType,
      "Time In": formatTime(attendance.timeIn),
      "Time Out": formatTime(attendance.timeOut),
      "Lunch Time Total": attendance.lunchTimeTotal ?? "",
      "Work Time Total": attendance.timeHoursWorked === 0 ? "" : workTimeTotal,
      "Overtime Total": overtimeTotal,
      "Paid Leave": paidLeaveTotal,
      "Total Time": attendance.timeTotal ?? "",
    };

    // Replace default values and null/undefined with empty string
    (Object.keys(formattedData) as (keyof FormattedData)[]).forEach((key) => {
      if (
        formattedData[key] === null ||
        formattedData[key] === undefined ||
        formattedData[key] === "7:30 AM" ||
        formattedData[key] === "07:30 AM" ||
        formattedData[key] === -479597.66
      ) {
        formattedData[key] = "";
      }
    });

    // Calculate total hours, overtime, and paid leave for each employee
    const employeeKey = `${attendance.employee.firstName} ${attendance.employee.lastName}`;
    if (!employeeWorkTime[employeeKey]) {
      employeeWorkTime[employeeKey] = 0;
      employeePaidLeave[employeeKey] = 0;
      employeeOvertime[employeeKey] = 0;
      employeeDaysWorked[employeeKey] = 0;
    }
    employeeWorkTime[employeeKey] += parseFloat(workTimeTotal.toString());
    employeeOvertime[employeeKey] += parseFloat(overtimeTotal.toString());
    employeePaidLeave[employeeKey] += parseFloat(paidLeaveTotal.toString());
    employeeDaysWorked[employeeKey] += 1;
    overallTotalHours += parseFloat(workTimeTotal.toString());
    overallPaidLeave += parseFloat(paidLeaveTotal.toString());
    overallOvertime += parseFloat(overtimeTotal.toString());
    overallDaysWorked += 1;

    return formattedData;
  });

  // Add summary rows for each employee
  const summaryData = Object.keys(employeeWorkTime).map((employee) => ({
    "First Name": employee.split(" ")[0],
    "Last Name": employee.split(" ")[1],
    "Days Worked": employeeDaysWorked[employee], // Ensure this is a number
    "Work Time Total": employeeWorkTime[employee].toFixed(2),
    "Overtime Total": employeeOvertime[employee].toFixed(2),
    "Paid Leave": employeePaidLeave[employee].toFixed(2),
    "Total Time": (
      employeeWorkTime[employee] +
      employeeOvertime[employee] +
      employeePaidLeave[employee]
    ).toFixed(2), // Include Paid Leave
  }));

  // Add overall total hours row
  summaryData.push({
    "First Name": "Overall",
    "Last Name": "Total",
    "Days Worked": overallDaysWorked, // Ensure this is a number
    "Work Time Total": overallTotalHours.toFixed(2),
    "Overtime Total": overallOvertime.toFixed(2),
    "Paid Leave": overallPaidLeave.toFixed(2),
    "Total Time": (
      overallTotalHours +
      overallOvertime +
      overallPaidLeave
    ).toFixed(2), // Include Paid Leave
  });

  // Combine summary and data into one CSV with summary at the top
  const csv =
    "Statistics\n" +
    Papa.unparse(summaryData, {
      columns: [
        "First Name",
        "Last Name",
        "Days Worked",
        "Work Time Total",
        "Overtime Total",
        "Paid Leave",
        "Total Time",
      ],
    }) +
    "\n\nAttendance\n" +
    Papa.unparse(csvData);

  const formattedFromDate = dateRange?.from
    ? format(dateRange.from, "yyyy-MM-dd")
    : "N/A";
  const formattedToDate = dateRange?.to
    ? format(dateRange.to, "yyyy-MM-dd")
    : "N/A";
  const fileName = `attendance_${formattedFromDate}_to_${formattedToDate}.csv`;

  try {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting to CSV:", error);
  }
};
