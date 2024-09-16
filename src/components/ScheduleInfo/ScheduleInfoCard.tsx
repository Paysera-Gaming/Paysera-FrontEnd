import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useUserStore } from '@/stores/userStore';
import { CalendarClockIcon } from 'lucide-react';
// create a map of the user's information
function ScheduleInfo() {
	const user = useUserStore.getState().user;

	function dateToHours(date: string) {
		const translatedDate = new Date(date);
		return format(translatedDate, 'HH:mm');
	}

	if (user?.schedule == undefined || user?.schedule.Schedule == undefined) {
		return (
			<p>No schedule, please tell your team leader to assign you a schedule.</p>
		);
	} else {
		const schedule = user?.schedule.Schedule;

		return (
			<ul>
				<li>
					<b>Time Starts at: </b>
					{dateToHours(schedule.startTime)}
				</li>
				<li>
					<b>Time Ends at: </b>
					{dateToHours(schedule.endTime)}
				</li>
				<li>
					<b>Lunchtime Starts at: </b>
					{dateToHours(schedule.lunchStartTime)}
				</li>
				<li>
					<b>Lunchtime Ends at: </b>
					{dateToHours(schedule.lunchEndTime)}
				</li>
			</ul>
		);
	}
}

export default function ScheduleInfoCard() {
	return (
		<Card className=" p-0">
			<CardHeader className=" pb-1 flex flex-row items-center justify-between">
				<CardTitle>Schedule</CardTitle>
				<CalendarClockIcon size={'1.8rem'}></CalendarClockIcon>
			</CardHeader>
			<CardContent>
				<ScheduleInfo></ScheduleInfo>
			</CardContent>
		</Card>
	);
}
