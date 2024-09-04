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

    // Create the worksheet from the summary data
    const summaryWorksheet = XLSX.utils.json_to_sheet(summaryData, { skipHeader: false });

    // Create the worksheet from the attendance data

    // Combine the summary and attendance data into one worksheet
    const combinedData = XLSX.utils.sheet_add_json(summaryWorksheet, [], { origin: -1 });
    XLSX.utils.sheet_add_json(combinedData, data, { origin: -1 });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the combined sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, combinedData, 'Attendance Data');

    // Format the file name with the start date
    const formattedFileName = `${fileName}_${startDate.toISOString().split('T')[0]}.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, formattedFileName);
};