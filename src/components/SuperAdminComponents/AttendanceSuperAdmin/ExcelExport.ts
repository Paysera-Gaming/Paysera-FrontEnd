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

export const exportToExcel = (data: AttendanceData[], fileName: string, startDate: Date, endDate: Date) => {
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

    // Create the combined data array with the specified structure
    const combinedData = [
        { A: 'Overall', B: overallCount, C: '', D: '', E: '' },
        { A: 'On Job', B: onJobCount, C: '', D: 'Fixed', E: typeCounts.Fixed },
        { A: 'Lunch', B: lunchCount, C: '', D: 'Flexible', E: typeCounts.Flexible },
        { A: 'Leave', B: leaveCount, C: '', D: 'Super Flexible', E: typeCounts['Super Flexible'] },
        {},
        { A: 'ID', B: 'Full Name', C: 'Type', D: 'Date', E: 'Start Time', F: 'End Time', G: 'Work Hours', H: 'Lunch Hours', I: 'Total Hours', J: 'Situation' },
        ...data.map(att => ({
            A: att.id,
            B: att.fullName,
            C: att.type,
            D: att.date,
            E: att.startTime,
            F: att.endTime,
            G: att.workHours,
            H: att.lunchHours,
            I: att.totalHours,
            J: att.situation,
        }))
    ];

    // Create the worksheet from the combined data
    const worksheet1 = XLSX.utils.json_to_sheet(combinedData, { skipHeader: true });

    // Create the detailed data array with the specified structure
    const detailedData = [
        { A: 'Fixed On Job', B: data.filter((att) => att.type === 'Fixed' && att.situation === 'On Job').length },
        { A: 'Fixed Lunch', B: data.filter((att) => att.type === 'Fixed' && att.situation === 'Lunch').length },
        { A: 'Fixed Leave', B: data.filter((att) => att.type === 'Fixed' && att.situation === 'Leave').length },
        {},
        { A: 'Flexible On Job', B: data.filter((att) => att.type === 'Flexible' && att.situation === 'On Job').length },
        { A: 'Flexible Lunch', B: data.filter((att) => att.type === 'Flexible' && att.situation === 'Lunch').length },
        { A: 'Flexible Leave', B: data.filter((att) => att.type === 'Flexible' && att.situation === 'Leave').length },
        {},
        { A: 'Super Flexible On Job', B: data.filter((att) => att.type === 'Super Flexible' && att.situation === 'On Job').length },
        { A: 'Super Flexible Lunch', B: data.filter((att) => att.type === 'Super Flexible' && att.situation === 'Lunch').length },
        { A: 'Super Flexible Leave', B: data.filter((att) => att.type === 'Super Flexible' && att.situation === 'Leave').length },
    ];

    // Create the worksheet from the detailed data
    const worksheet2 = XLSX.utils.json_to_sheet(detailedData, { skipHeader: true });

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the combined sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Summary and Attendance');

    // Append the detailed sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'More Detailed');

    // Format the file name with the start date and end date using toLocaleDateString with 'en-CA' locale
    const formattedFileName = `${fileName}_${startDate.toLocaleDateString('en-CA')}_to_${endDate.toLocaleDateString('en-CA')}_attendance.xlsx`;

    // Write the workbook to a file
    XLSX.writeFile(workbook, formattedFileName);
};