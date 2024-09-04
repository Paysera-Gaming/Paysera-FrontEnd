import * as XLSX from 'xlsx';

interface AttendanceData {
    id: number;
    fullName: string;
    type: string;
    date: string;
    startTime: string;
    endTime: string;
    workHours: number;
    lunchHours: number;
    totalHours: number;
    situation: string;
}

export const exportToExcel = (data: AttendanceData[], fileName: string, startDate: Date) => {
    // Calculate summary counts
    const overallCount = data.length;
    const onJobCount = data.filter((att) => att.situation === 'On Job').length;
    const lunchCount = data.filter((att) => att.situation === 'Lunch').length;
    const leaveCount = data.filter((att) => att.situation === 'Leave').length;

    const typeCounts = {
        Fixed: data.filter((att) => att.type === 'Fixed').length,
        Flexible: data.filter((att) => att.type === 'Flexible').length,
        'Super Flexible': data.filter((att) => att.type === 'Super Flexible').length,
    };

    // Create the summary data
    const summaryData = [
        { Category: 'Overall', Count: overallCount },
        { Category: 'On Job', Count: onJobCount },
        { Category: 'Lunch', Count: lunchCount },
        { Category: 'Leave', Count: leaveCount },
        { Category: 'Fixed', Count: typeCounts.Fixed },
        { Category: 'Flexible', Count: typeCounts.Flexible },
        { Category: 'Super Flexible', Count: typeCounts['Super Flexible'] },
    ];

    // Create a combined data array with summary and attendance data
    const combinedData = [
        ...summaryData,
        {},
        { Category: 'ID', Count: 'Full Name', Type: 'Type', Date: 'Date', StartTime: 'Start Time', EndTime: 'End Time', WorkHours: 'Work Hours', LunchHours: 'Lunch Hours', TotalHours: 'Total Hours', Situation: 'Situation' },
        ...data.map(att => ({
            Category: att.id,
            Count: att.fullName,
            Type: att.type,
            Date: att.date,
            StartTime: att.startTime,
            EndTime: att.endTime,
            WorkHours: att.workHours,
            LunchHours: att.lunchHours,
            TotalHours: att.totalHours,
            Situation: att.situation,
        }))
    ];

    // Create the worksheet from the combined data
    const worksheet = XLSX.utils.json_to_sheet(combinedData, { skipHeader: true });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the combined sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary and Attendance');

    // Format the file name with the start date using toLocaleDateString with 'en-CA' locale
    const formattedFileName = `${fileName}_${startDate.toLocaleDateString('en-CA')}.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, formattedFileName);
};