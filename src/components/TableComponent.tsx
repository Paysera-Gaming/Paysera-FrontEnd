// src/components/TableComponent.tsx

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function TableComponent() {
    // Function to calculate end time given a start time
    const calculateEndTime = (startTime: string) => {
        const [hours, minutes, period] = startTime.split(/[: ]/);
        let endHours = parseInt(hours) + 8;
        let endPeriod = period;

        if (endHours >= 12) {
            if (endHours > 12) endHours -= 12;
            endPeriod = period === "AM" ? "PM" : "AM";
        }

        return `${endHours.toString().padStart(2, '0')}:${minutes} ${endPeriod}`;
    };

    // Function to calculate total hours
    const calculateTotalHours = (startTime: string, endTime: string) => {
        const [startHour, startMinute, startPeriod] = startTime.split(/[: ]/);
        const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);

        let startHours = parseInt(startHour);
        let endHours = parseInt(endHour);

        if (startPeriod === 'PM' && startHours !== 12) startHours += 12;
        if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
        if (startPeriod === 'AM' && startHours === 12) startHours = 0;
        if (endPeriod === 'AM' && endHours === 12) endHours = 0;

        const startTimeInMinutes = startHours * 60 + parseInt(startMinute);
        const endTimeInMinutes = endHours * 60 + parseInt(endMinute);

        const totalMinutes = endTimeInMinutes - startTimeInMinutes;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return `${hours}h ${minutes}m`;
    };

    // Determine status based on the end time and current time
    const determineStatus = (endTime: string) => {
        const currentTime = new Date();
        const [endHour, endMinute, endPeriod] = endTime.split(/[: ]/);
        let endHours = parseInt(endHour);

        if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
        if (endPeriod === 'AM' && endHours === 12) endHours = 0;

        const endTimeInMinutes = endHours * 60 + parseInt(endMinute);
        const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

        return currentTimeInMinutes > endTimeInMinutes ? "Done" : "Ongoing";
    };

    const data = [
        { name: "John Doe", type: "Fixed", date: "2023-08-01", startTime: "09:00 AM", endTime: "05:00 PM", status: "On Job" },
        { name: "Jane Smith", type: "Flexible", date: "2023-08-01", startTime: "10:00 AM", endTime: "06:30 PM", status: "Lunch" },
        { name: "Alice Johnson", type: "Open", date: "2023-08-01", startTime: "08:30 AM", endTime: "04:30 PM", status: "On Job" },
    ];

    return (
        <Table className="table">
            <TableCaption>Attendance Records</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px]">Name</TableHead>
                    <TableHead>Type of Attendance</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Situation</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((record, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{record.name}</TableCell>
                        <TableCell>{record.type}</TableCell>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.startTime}</TableCell>
                        <TableCell>{record.endTime}</TableCell>
                        <TableCell>{calculateTotalHours(record.startTime, record.endTime)}</TableCell>
                        <TableCell>{record.status}</TableCell>
                        <TableCell className="text-right">
                            <span className={`status ${determineStatus(record.endTime).toLowerCase()}`}>
                                {determineStatus(record.endTime)}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
