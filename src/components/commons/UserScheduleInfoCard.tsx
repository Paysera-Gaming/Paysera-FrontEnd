import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';

export default function UserScheduleInfoCard() {
	// const userInfo = useUserStore.getState()?.user;
	// const scheduleBlock =
	// 	userInfo!.schedule?.Schedule.startTime +
	// 		' - ' +
	// 		userInfo!.schedule?.Schedule.endTime || '8:00am - 5:00pm';

	// if (!userInfo) {
	// 	return <p>An Error has Occured</p>;
	// }

	return (
		<Card className="col-span-1 row-span-2">
			<CardHeader>
				<CardTitle>Schedule Info</CardTitle>
			</CardHeader>
			<CardContent>
				{/* <ul>
					<li>Schedule Type: {userInfo?.schedule?.name || 'My Schedule'}</li>
					<li>
						Schedule Info:{userInfo?.schedule?.Schedule.scheduleType || 'FIXEE'}
					</li>
					<li>Schedule Block: {scheduleBlock || '8:00am - 5:00pm'}</li>
					<li>
						Personal Schedule Block:
						{scheduleBlock || 'Saturday, 8:00am - 5:00pm'}
					</li>
					<li>
						Last Schedule Update:{' '}
						{userInfo?.schedule?.Schedule.updatedAt || '10:00pm'}
					</li>
				</ul> */}

				<ul>
					<li>Schedule Type: My Schedule</li>
					<li>Schedule Info:FIXEE</li>
					<li>Schedule Block: 8:00am - 5:00pm</li>
					<li>Personal Schedule Block: Saturday, 8:00am - 5:00pm</li>
					<li>Last Schedule Update: 10:00pm</li>
				</ul>
			</CardContent>
		</Card>
	);
}
