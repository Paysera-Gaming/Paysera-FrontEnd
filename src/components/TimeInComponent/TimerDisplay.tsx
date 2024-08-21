import { useState, useEffect, useRef } from 'react';
import { TimerIcon } from 'lucide-react';
export interface TimerProps {
	hasStarted: boolean;
	formAction: 'Clock-In' | 'Lunch-In' | 'Lunch-Out' | 'Clock-Out';
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

	return (
		<span className="flex gap-x-1 justify-center items-center">
			<TimerIcon size={`1.5rem`} className="mb-1"></TimerIcon>
			<h3 className=" scroll-m-20 text-xl font-semibold tracking-tight">
				{hoursDisplay}:{minutesDisplay}:{secondsDisplay}
			</h3>
		</span>
	);
}
