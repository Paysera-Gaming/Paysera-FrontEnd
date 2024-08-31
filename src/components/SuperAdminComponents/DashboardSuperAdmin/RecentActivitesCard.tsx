// card
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
// table
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Activity } from 'lucide-react';

import { useState } from 'react';

interface DataProps {
	name: string;
	role: string;
	activity: string;
	time: string;
}

function RecentActivitiesTable({ tableData }: { tableData: DataProps[] }) {
	const renderedList = tableData.map((data) => (
		<TableRow>
			<TableCell>{data.name}</TableCell>
			<TableCell>{data.role}</TableCell>
			<TableCell>{data.activity}</TableCell>
			<TableCell>{data.time}</TableCell>
		</TableRow>
	));

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Activity</TableHead>
					<TableHead>Time</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>{renderedList}</TableBody>
		</Table>
	);
}

export default function RecentActivitiesCard() {
	const [dummyData, setDummyData] = useState<DataProps[]>([
		{ name: 'lue', role: 'gamer', activity: 'gaming', time: '5 hours ago' },
		{ name: 'lue', role: 'gamer', activity: 'gaming', time: '5 hours ago' },
		{ name: 'lue', role: 'gamer', activity: 'gaming', time: '5 hours ago' },
	]);

	return (
		<Card className="flex-1 col-span-2 ">
			<CardHeader>
				<div className="flex item-center justify-between">
					<CardTitle> Recent Activities</CardTitle>
					<Activity></Activity>
				</div>
				<CardDescription>
					Recent activities of the employees of this department
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-[200px] ">
					<RecentActivitiesTable tableData={dummyData}></RecentActivitiesTable>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
