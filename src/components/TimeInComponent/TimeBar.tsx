// icons
import { TimerIcon } from 'lucide-react';
import TimeForm from './TimeForm';
export default function Timebar() {
	return (
		<header className="border-border border-solid border w-full rounded-md p-5 flex items-center justify-between">
			<span className="flex gap-x-1 justify-center items-center">
				<TimerIcon size={`2rem`}></TimerIcon>
				<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
					05:08:40
				</h3>
			</span>

			<p>Tuesday: 8am to 5pm</p>
			<p>Schedule Type: Standard</p>
			{/* add form here */}
			<TimeForm></TimeForm>
		</header>
	);
}
