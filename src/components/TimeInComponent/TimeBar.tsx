// icons
import { TimerIcon } from 'lucide-react';
import TimeForm from './TimeForm';
import { useState } from 'react';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';

import { Badge } from '@/components/ui/badge';

// TODO:
//  timer - doing
// time form adjustments and validit

export default function Timebar() {
	const [useTimer, setTimer] = useState<string>('NONE');
	const [useStart, setStart] = useState<boolean>(false);

	function updateTimer(time: string) {
		setTimer(time);
		setStart((start) => (start = !start));
	}

	//to do add useState to start time and pass a function that will run this shizz
	return (
		<header className="border-border border-solid border w-full rounded-md p-2 flex items-center justify-between">
			{/* status */}
			<span>
				<p className="font-semibold inline">Status: &nbsp;</p>
				<Badge className="inline">{useTimer}</Badge>
			</span>

			{/* schedule */}
			<span>
				<p className="font-semibold inline">Today's Schedule: &nbsp;</p>
				<p className="inline"> 8:00 - 16:00</p>
			</span>
			{/* timer display */}
			<span className="flex gap-x-1 justify-center items-center">
				<TimerIcon size={`1.5rem`} className="mb-1"></TimerIcon>
				<TimerDisplay hasStarted={useStart}></TimerDisplay>
			</span>
			{/* form */}
			<TimeForm updateParentState={updateTimer}></TimeForm>
		</header>
	);
}
