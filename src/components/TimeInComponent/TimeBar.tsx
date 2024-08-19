// icons
import { TimerIcon } from 'lucide-react';
import TimeForm from './TimeForm';
import { useState } from 'react';

export default function Timebar() {
	const [useTimer, setTimer] = useState<string>('TIMER');

	function updateTimer(time: string) {
		setTimer(time);
	}

	//to do add useState to start time and pass a function that will run this shizz
	return (
		<header className="border-border border-solid border w-full rounded-md p-5 flex items-center justify-between">
			<span className="flex gap-x-1 justify-center items-center">
				<TimerIcon size={`2rem`}></TimerIcon>
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					05:08:40 {useTimer}
				</h3>
			</span>

			<p>Tuesday: 8am to 5pm</p>
			<p>Schedule Type: Standard</p>
			{/* add form here */}
			<TimeForm updateParentState={updateTimer}></TimeForm>
		</header>
	);
}
