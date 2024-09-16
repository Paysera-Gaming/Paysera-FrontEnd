import { useState, useEffect, useRef } from 'react';
import { TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';
import { getTodaysAttendance } from '@/api/ClockInAPI';
export interface TimerProps {
	hasStarted: boolean;
	formAction: 'Clock-In' | 'Lunch-In' | 'Lunch-Out' | 'Clock-Out' | 'None';
}

function convertDateToSeconds(date: Date): number {
	const currentDate = new Date();
	const differenceInMilliseconds = currentDate.getTime() - date.getTime();
	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
	return differenceInSeconds;
}

export default function TimerDisplay({ ...timerProps }: TimerProps) {
	// logic to state managed time if there is any
	const [useTime, setTime] = useState(0);
	const [getContain, setContain] = useState(false);
	const timerIntervalId = useRef<ReturnType<typeof setInterval> | undefined>(
		undefined
	);

	const user = useUserStore.getState().user;

	const mutation = useMutation({
		mutationFn: () => {
			if (user?.id === undefined) {
				throw new Error('User ID is not defined');
			}

			return getTodaysAttendance(user.id);
		},
		onSuccess: (data) => {
			const convertToSecond = convertDateToSeconds(new Date(data.timeIn));
			setTime(convertToSecond);
			setContain(true);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	// watches shit
	useEffect(() => {
		mutation.mutate();

		if (timerProps.hasStarted || user) {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timerProps.hasStarted]);

	const hours = Math.floor(useTime / 3600);
	const hoursDisplay = hours >= 10 ? hours : `0${hours}`;

	const minutes = Math.floor((useTime % 3600) / 60);
	const minutesDisplay = minutes >= 10 ? minutes : `0${minutes}`;

	const seconds = useTime % 60;
	const secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`;
	return (
		<span
			className={cn(
				'transition ease-in-out flex items-center justify-center py-1 px-2 bg-primary rounded-full text-secondary-foreground outline-2 outline-destructive outline outline-offset-2',
				{
					'bg-primary outline-ring': timerProps.hasStarted || getContain,
					'bg-destructive outline-destructive':
						!timerProps.hasStarted || !getContain,
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
