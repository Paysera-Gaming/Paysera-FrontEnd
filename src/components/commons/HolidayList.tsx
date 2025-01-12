import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function HolidayList() {
	// fetch the holidays here
	return (
		<Card className="row-span-6">
			<CardHeader>
				<CardTitle>Upcoming Holidays</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="list-disc list-inside">
					<li>01/12 - National Gaming Day</li>
					<li>01/12 - National Gaming Day</li>
					<li>01/12 - National Gaming Day</li>
					<li>01/12 - National Gaming Day</li>
					<li>01/12 - National Gaming Day</li>
					<li>01/12 - National Gaming Day</li>
				</ul>
			</CardContent>
		</Card>
	);
}
