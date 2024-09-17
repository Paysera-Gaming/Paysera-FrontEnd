import Papa from 'papaparse';
import { Attendance } from './types';
import { formatDate, formatTime, calculateWorkTimeTotal } from './utils';
import { format } from 'date-fns';

export const exportToCSV = (data: Attendance[], dateRange: { from: Date; to: Date } | undefined) => {
  const csvData = data.map((attendance) => {
    const workTimeTotal = attendance.timeIn && attendance.timeOut ? calculateWorkTimeTotal(attendance.timeIn, attendance.timeOut, attendance.lunchTimeTotal) : '';

    const formattedData: { [key: string]: any } = {
      'First Name': attendance.employee.firstName,
      'Last Name': attendance.employee.lastName,
      'Date': formatDate(attendance.date),
      'Status': attendance.status,
      'Schedule Type': attendance.scheduleType,
      'Time In': formatTime(attendance.timeIn),
      'Lunch Time In': formatTime(attendance.lunchTimeIn),
      'Lunch Time Out': formatTime(attendance.lunchTimeOut),
      'Time Out': formatTime(attendance.timeOut),
      'Lunch Time Total': attendance.lunchTimeTotal,
      'Work Time Total': attendance.timeHoursWorked === 0 ? '' : workTimeTotal,
      'Overtime Total': attendance.overTimeTotal,
      'Total Time': attendance.timeTotal,
    };

    // Replace default values and null/undefined with empty string
    Object.keys(formattedData).forEach(key => {
      if (formattedData[key] === null || formattedData[key] === undefined || formattedData[key] === '7:30 AM' || formattedData[key] === '07:30 AM' || formattedData[key] === -479597.66) {
        formattedData[key] = '';
      }
    });

    return formattedData;
  });

  const csv = Papa.unparse(csvData);
  const formattedFromDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "N/A";
  const formattedToDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "N/A";
  const fileName = `attendance_${formattedFromDate}_to_${formattedToDate}.csv`;

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};