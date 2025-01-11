import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DepartmentStatusCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Department Status</CardTitle>
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
