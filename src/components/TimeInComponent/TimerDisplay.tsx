import { useState, useEffect, useRef } from 'react';
import { TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
export interface TimerProps {
	hasStarted: boolean;
	formAction: 'Clock-In' | 'Lunch-In' | 'Lunch-Out' | 'Clock-Out' | 'None';
}

export default function TimerDisplay({ ...timerProps }: TimerProps) {
	// logic to state managed time if there is any
	const [useTime, setTime] = useState(0);
	const timerIntervalId = useRef<ReturnType<typeof setInterval> | undefined>(
		undefined
	);

	useEffect(() => {
		if (timerProps.hasStarted) {
			timerIntervalId.current = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		} else {
			clearInterval(timerIntervalId.current);
		}
		return () => {
			// clears the interval on cleanup
			if (timerIntervalId.current) {
				clearInterval(timerIntervalId.current);
			}
		};
	}, [timerProps.hasStarted]);

	const hours = Math.floor(useTime / 36000);
	const hoursDisplay = hours > 10 ? hours : `0${hours}`;
	const minutesToDisplay = Math.floor(useTime / 60);
	const minutesDisplay =
		minutesToDisplay < 10 ? `0${minutesToDisplay}` : minutesToDisplay;
	const secondsToDisplay = useTime % 60;
	const secondsDisplay =
		secondsToDisplay < 10 ? `0${secondsToDisplay}` : secondsToDisplay;
	// "flex items-center justify-center py-1 px-2 bg-primary rounded-full text-secondary-foreground outline-2 outline-primary outline outline-offset-2"

	return (
		<span
			className={cn(
				'transition ease-in-out flex items-center justify-center py-1 px-2 bg-primary rounded-full text-secondary-foreground outline-2 outline-destructive outline outline-offset-2',
				{
					'bg-primary outline-ring': timerProps.hasStarted,
					'bg-destructive outline-destructive': !timerProps.hasStarted,
				}
			)}
		>
			<TimerIcon
				size={`1.5rem`}
				className="mb-1 text-primary-foreground stroke-[2px]"
			></TimerIcon>
			<span className="w-24 text-accent text-center rounded-full ">
				<h3 className="text-lg font-semibold ">
					{hoursDisplay}:{minutesDisplay}:{secondsDisplay}
				</h3>
			</span>
		</span>
	);
}
