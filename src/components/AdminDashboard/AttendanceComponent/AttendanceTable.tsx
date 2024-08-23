import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@/components/ui/table';

import {
	calculateTotalHours,
	determineSituation,
	getSituationStyle,
	getSituationTooltip,
} from './helpers';

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

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
	filteredData,
}) => (
	<Table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' }}>
		<thead>
			<TableRow>
				<TableHead style={headerStyle}>Name</TableHead>
				<TableHead style={headerStyle}>Type</TableHead>
				<TableHead style={headerStyle}>Date</TableHead>
				<TableHead style={headerStyle}>Start Time</TableHead>
				<TableHead style={headerStyle}>End Time</TableHead>
				<TableHead style={headerStyle}>Total Work Hours</TableHead>
				<TableHead style={headerStyle}>Total Lunch Hours</TableHead>
				<TableHead style={headerStyle}>Total Hours</TableHead>
				<TableHead style={headerStyle}>Situation</TableHead>
			</TableRow>
		</thead>
		<TableBody>
			{filteredData.map((row, index) => {
				const totalWorkHours =
					calculateTotalHours(row.part1StartTime, row.part1EndTime) +
					calculateTotalHours(row.lunchEndTime, row.part2EndTime);
				const totalLunchHours = calculateTotalHours(
					row.lunchStartTime,
					row.lunchEndTime
				);
				const totalHours = totalWorkHours + totalLunchHours;

				const situation = determineSituation(
					row.part1EndTime,
					row.lunchStartTime,
					row.lunchEndTime,
					row.part2EndTime
				);

				return (
					<TableRow key={index} style={rowStyle}>
						<TableCell style={cellStyle}>{row.name}</TableCell>
						<TableCell style={cellStyle}>{row.type}</TableCell>
						<TableCell style={cellStyle}>{row.date}</TableCell>
						<TableCell style={cellStyle}>{row.part1StartTime}</TableCell>
						<TableCell style={cellStyle}>{row.part2EndTime}</TableCell>
						<TableCell style={cellStyle}>
							{totalWorkHours.toFixed(2)} hours
						</TableCell>
						<TableCell style={cellStyle}>
							{totalLunchHours.toFixed(2)} hours
						</TableCell>
						<TableCell style={cellStyle}>
							{totalHours.toFixed(2)} hours
						</TableCell>
						<TableCell style={cellStyle}>
							{/* You can add the situation here as text or use the getSituationTooltip function */}
							{situation}
						</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	</Table>
);

const headerStyle = {
	border: '1px solid #d1d5db',
	padding: '8px',
	textAlign: 'center' as const,
	backgroundColor: '#f9fafb',
	color: '#1f2937',
	verticalAlign: 'middle' as const,
};

const rowStyle = {
	border: '1px solid #d1d5db',
};

const cellStyle = {
	border: '1px solid #d1d5db',
	padding: '8px',
	textAlign: 'center' as const,
	verticalAlign: 'middle' as const,
	whiteSpace: 'nowrap' as const,
};

export default AttendanceTable;
