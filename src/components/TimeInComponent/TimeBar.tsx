// icons
import TimeForm from './TimeForm';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';

export default function Timebar() {
	return (
		<header className="border-border border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
			{/* timer display */}
			<TimerDisplay></TimerDisplay>

			{/* form */}

			<TimeForm></TimeForm>
		</header>
	);
}
