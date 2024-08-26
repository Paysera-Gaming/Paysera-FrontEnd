// icons
import TimeForm from './TimeForm';
import { useState } from 'react';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';

import { Badge } from '@/components/ui/badge';

type UserStatus = 'Clock-In' | 'Lunch-In' | 'Lunch-Out' | 'Clock-Out' | 'None';

function statusUser(status: UserStatus): string {
	switch (status) {
		case 'Clock-In':
		case 'Lunch-Out':
			return 'On going';

		case 'Clock-Out':
		case 'None':
			return 'Offline';

		case 'Lunch-In':
			return 'Lunch';
	}
}
// this will run true if the status is clock-in or lunch-out
// otherwise it will stay false
function timerStatus(status: UserStatus): boolean {
	return status == 'Clock-In' || status == 'Lunch-Out';
}
function badgeVariant(
	status: UserStatus
): 'default' | 'secondary' | 'destructive' | 'outline' {
	switch (status) {
		case 'Clock-In':
		case 'Lunch-Out':
			return 'default';

		case 'Lunch-In':
			return 'outline';

		case 'None':
		case 'Clock-Out':
			return 'destructive';
	}
}

export default function Timebar() {
	const [useStart, setStart] = useState<boolean>(false);
	const [useStatus, setStatus] = useState<UserStatus>('None');

	function updateTimer(time: UserStatus) {
		setStatus(time);
		setStart(timerStatus(time));
	}

	return (
		<header className="border-border border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
			{/* status */}
			<span>
				<p className="font-semibold inline">Status: &nbsp;</p>
				<Badge className="inline" variant={badgeVariant(useStatus)}>
					{statusUser(useStatus)}
				</Badge>
			</span>

			{/* schedule */}
			<span>
				<p className="font-semibold inline">Today's Schedule: &nbsp;</p>
				<p className="inline"> 8:00 - 16:00</p>
			</span>
			{/* timer display */}
			<TimerDisplay
				hasStarted={useStart}
				formAction={'Clock-Out'}
			></TimerDisplay>

			{/* form */}

			<TimeForm updateParentState={updateTimer}></TimeForm>
		</header>
	);
}
