import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function HolidayList() {
	// fetch the holidays here
	return (
		<Card>
			<CardHeader>
				<CardTitle>Upcoming Holidays</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
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
