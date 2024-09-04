import Papa from 'papaparse';

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

export const exportToCSV = (data: AttendanceData[], fileName: string, startDate: Date, endDate: Date) => {
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
        { A: `Attendance Report: ${startDate.toLocaleDateString('en-CA')} to ${endDate.toLocaleDateString('en-CA')}`, B: '', C: '', D: '', E: '', F: '', G: '', H: '', I: '', J: '' },
        {},
        { A: 'Summary', B: '', C: '', D: '', E: '' },
        { A: 'Overall', B: overallCount, C: '', D: '', E: '' },
        { A: 'On Job', B: onJobCount, C: '', D: 'Fixed', E: typeCounts.Fixed },
        { A: 'Lunch', B: lunchCount, C: '', D: 'Flexible', E: typeCounts.Flexible },
        { A: 'Leave', B: leaveCount, C: '', D: 'Super Flexible', E: typeCounts['Super Flexible'] },
        {},
        { A: 'Details', B: '', C: '', D: '', E: '' },
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

    // Convert the combined data to CSV
    const csv = Papa.unparse(combinedData);

    // Create a blob from the CSV data
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    // Create a link element to download the CSV file
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}_${startDate.toLocaleDateString('en-CA')}_to_${endDate.toLocaleDateString('en-CA')}_attendance.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};