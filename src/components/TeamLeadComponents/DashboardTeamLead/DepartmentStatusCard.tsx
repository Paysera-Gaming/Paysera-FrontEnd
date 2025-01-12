import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { University } from 'lucide-react';

export default function DepartmentStatusCard() {
	return (
		<Card>
			<CardHeader className="pt-3 pb-0 flex-row items-center justify-between w-full">
				<CardTitle>Department Status</CardTitle>
				<University></University>
			</CardHeader>
			<CardContent>
				<ul className="list-disc list-inside">
					<li className="marker:text-green-500 marker:text-2xl">Online: 12</li>
					<li className="marker:text-red-500 marker:text-2xl">Offline: 6</li>
				</ul>
			</CardContent>
		</Card>
	);
}
