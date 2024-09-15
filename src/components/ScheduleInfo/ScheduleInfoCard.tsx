import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useUserStore } from '@/stores/userStore';
import { CalendarClockIcon } from 'lucide-react';
// create a map of the user's information
function ScheduleInfo() {
	const user = useUserStore.getState().user;
	const scheduleInfo = user?.schedule;

	function dateToHours(date: string) {
		const translatedDate = new Date(date);
		return format(translatedDate, 'HH:mm');
	}

	if (typeof scheduleInfo === 'object' && scheduleInfo !== null) {
		const schedule = scheduleInfo.Schedule;

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
	} else {
		return (
			<p>No schedule, please tell your team leader to assign you a schedule.</p>
		);
	}
}

export default function ScheduleInfoCard() {
	return (
		<Card className="flex-1 p-0">
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
