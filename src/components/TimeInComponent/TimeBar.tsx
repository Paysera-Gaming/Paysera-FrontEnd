// icons
import { TimerIcon } from 'lucide-react';
import TimeForm from './TimeForm';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';

// TODO:
//  timer
// ui clean up
// time form adjustments and validit

export default function Timebar() {
	const [useTimer, setTimer] = useState<string>('NONE');

	function updateTimer(time: string) {
		setTimer(time);
	}

	//to do add useState to start time and pass a function that will run this shizz
	return (
		<header className="border-border border-solid border w-full rounded-md p-2 flex items-center justify-between">
			<span className="flex gap-x-1 justify-center items-center">
				<TimerIcon size={`1.5rem`} className="mb-1"></TimerIcon>
				<h3 className=" scroll-m-20 text-xl font-semibold tracking-tight">
					00:00
				</h3>
			</span>

			<span>
				<p className="font-semibold inline">Status: &nbsp;</p>
				<Badge className="inline">{useTimer}</Badge>
			</span>

			<span>
				<p className="font-semibold inline">Today's Schedule: &nbsp;</p>
				<p className="inline"> 6:00 - 16:00</p>
			</span>
			{/* add form here */}
			<TimeForm updateParentState={updateTimer}></TimeForm>
		</header>
	);
}
