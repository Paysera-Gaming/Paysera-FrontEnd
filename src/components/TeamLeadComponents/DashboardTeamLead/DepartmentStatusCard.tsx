import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { University } from 'lucide-react';

export default function DepartmentStatusCard() {
	return (
		<Card>
			<CardHeader className="py-3 flex-row items-center justify-between w-full">
				<CardTitle>Department Status</CardTitle>
				<University></University>
			</CardHeader>
			<CardContent>
				<ul>
					<li>Online: 12</li>
					<li>Offline: 6</li>
				</ul>
			</CardContent>
		</Card>
	);
}
