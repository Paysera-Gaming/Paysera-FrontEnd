import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';

export default function UserScheduleInfoCard() {
	const userInfo = useUserStore.getState().user;
	const scheduleBlock =
		userInfo!.schedule?.Schedule.startTime +
		' - ' +
		userInfo!.schedule?.Schedule.endTime;

	// if (!userInfo) {
	// 	return <p>An Error has Occured</p>;
	// }

	return (
		<Card>
			<CardHeader>
				<CardTitle>Schedule Info</CardTitle>
			</CardHeader>
			<CardContent>
				<ul>
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
				</ul>
			</CardContent>
		</Card>
	);
}
