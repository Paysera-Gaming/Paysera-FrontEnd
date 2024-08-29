import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

interface AttendanceTableProps {
  filteredData: Array<{
    name: string;
    type: string;
    date: string;
    part1StartTime: string;
    part1EndTime: string;
    lunchStartTime: string;
    lunchEndTime: string;
    part2EndTime: string;
  }>;
}

const calculateTotalHours = (startTime: string, endTime: string) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);
  const start = new Date();
  const end = new Date();

  start.setHours(startHours, startMinutes);
  end.setHours(endHours, endMinutes);

  const diff = end.getTime() - start.getTime();
  return diff / (1000 * 60 * 60);
};

const determineSituation = (part1EndTime: string, lunchStartTime: string, lunchEndTime: string, part2EndTime: string) => {
  if (part1EndTime === lunchStartTime) return "Lunch";
  if (lunchEndTime === part2EndTime) return "Leave";
  return "On Job";
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ filteredData }) => (
  <Table className="min-w-full border-collapse border border-gray-200">
    <thead>
      <TableRow>
        <TableHead className="text-center align-middle border border-gray-300">Name</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Type</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Date</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Start Time</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">End Time</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Total Work Hours</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Total Lunch Hours</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Total Hours</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Situation</TableHead>
      </TableRow>
    </thead>
    <TableBody>
      {filteredData.map((row, index) => {
        const totalWorkHours = calculateTotalHours(row.part1StartTime, row.part1EndTime) + calculateTotalHours(row.lunchEndTime, row.part2EndTime);
        const totalLunchHours = calculateTotalHours(row.lunchStartTime, row.lunchEndTime);
        const totalHours = totalWorkHours + totalLunchHours;

        const situation = determineSituation(row.part1EndTime, row.lunchStartTime, row.lunchEndTime, row.part2EndTime);

        let situationColor;
        switch (situation) {
          case "On Job":
            situationColor = "bg-green-500";
            break;
          case "Lunch":
            situationColor = "bg-blue-500";
            break;
          case "Leave":
            situationColor = "bg-red-500";
            break;
          default:
            situationColor = "bg-gray-500";
            break;
        }

        return (
          <TableRow key={index} className="border border-gray-300">
            <TableCell className="text-center align-middle border border-gray-300 flex items-center">
              <span className={`w-3 h-3 rounded-full mr-2 ${situationColor}`} style={{ display: "inline-block" }}></span>
              {row.name}
            </TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{row.type}</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{row.date}</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{row.part1StartTime}</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{row.part2EndTime}</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{totalWorkHours.toFixed(2)} hours</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{totalLunchHours.toFixed(2)} hours</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{totalHours.toFixed(2)} hours</TableCell>
            <TableCell className="text-center align-middle border border-gray-300">{situation}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
