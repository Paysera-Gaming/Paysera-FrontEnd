// AttendanceComponent/AttendanceTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Tooltip } from "@chakra-ui/react";
import { calculateTotalHours, determineSituation, getSituationStyle, getSituationTooltip } from "./helpers";

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

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ filteredData }) => (
  <Table className="min-w-full border">
    <thead>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Start Time</TableHead>
        <TableHead>End Time</TableHead>
        <TableHead>Total Work Hours</TableHead>
        <TableHead>Total Lunch Hours</TableHead>
        <TableHead>Total Hours</TableHead>
        <TableHead>Situation</TableHead>
      </TableRow>
    </thead>
    <TableBody>
      {filteredData.map((row, index) => {
        const totalWorkHours =
          calculateTotalHours(row.part1StartTime, row.part1EndTime) +
          calculateTotalHours(row.lunchEndTime, row.part2EndTime);
        const totalLunchHours = calculateTotalHours(row.lunchStartTime, row.lunchEndTime);
        const totalHours = totalWorkHours + totalLunchHours;

        const situation = determineSituation(
          row.part1EndTime,
          row.lunchStartTime,
          row.lunchEndTime,
          row.part2EndTime
        );

        return (
          <TableRow key={index}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.part1StartTime}</TableCell>
            <TableCell>{row.part2EndTime}</TableCell>
            <TableCell>{totalWorkHours.toFixed(2)} hours</TableCell>
            <TableCell>{totalLunchHours.toFixed(2)} hours</TableCell>
            <TableCell>{totalHours.toFixed(2)} hours</TableCell>
            <TableCell>
              <Tooltip label={getSituationTooltip(situation)}>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getSituationStyle(
                    situation
                  )}`}
                >
                  {situation}
                </span>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
