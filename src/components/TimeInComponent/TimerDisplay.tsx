import { useState, useRef, useEffect } from 'react';
import { AlarmClockPlus, TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore';
import { getTodaysAttendance } from '@/api/ClockInAPI';
import { Badge } from '../ui/badge';

type UserStatus = 'OVERTIME' | 'DONE' | 'ONGOING';

function convertDateToSeconds(date: Date, dateTheSecond: Date): number {
	const differenceInMilliseconds = dateTheSecond.getTime() - date.getTime();
	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
	return differenceInSeconds;
}

function IconVariant(status: UserStatus) {
	switch (status) {
		case 'ONGOING':
			return (
				<TimerIcon
					size={`1.5rem`}
					className="mb-1 text-primary-foreground stroke-[2px]"
				></TimerIcon>
			);

		case 'OVERTIME':
			return (
				<AlarmClockPlus
					size={`1.5rem`}
					className="mb-1 text-primary-foreground stroke-[2px]"
				></AlarmClockPlus>
			);
		default:
			return (
				<TimerIcon
					size={`1.5rem`}
					className="mb-1 text-primary-foreground stroke-[2px]"
				></TimerIcon>
			);
	}
}

function statusVariant(status: UserStatus) {
	switch (status) {
		case 'ONGOING':
			return 'Online';

		case 'OVERTIME':
			return 'overtime';

		case 'DONE':
			return 'Offline';
		default:
			return 'Offline';
	}
}

export default function TimerDisplay() {
	const [useTime, setTime] = useState(0);

	const timerIntervalId = useRef<ReturnType<typeof setInterval> | undefined>(
		undefined
	);

	const user = useUserStore.getState().user;

	const { data, isSuccess } = useQuery({
		queryKey: ['UsersAttendance'],
		queryFn: () => {
			if (user?.id === undefined) {
				throw new Error('User ID is not defined');
			}

			return getTodaysAttendance(user.id);
		},
	});

	useEffect(() => {
		// OMEGA JEMPOY ALERT
		let convertedToSecond = 0;
		if (isSuccess && data) {
			if (data.status === 'ONGOIG') {
				useUserStore.getState().setUserClockStatus('Clock-In');
			}
			// HOLY SHIT I NEED TO FIX THIS
			// if timeOut is present
			if (data.timeOut) {
				convertedToSecond = convertDateToSeconds(
					new Date(data.timeIn),
					new Date(data.timeOut)
				);
				setTime(convertedToSecond);
				return;
			}
			setTime(convertedToSecond);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		console.log(data?.status);

		if (
			isSuccess &&
			(data.status === 'ONGOING' || data.status === 'OVERTIME')
		) {
			// starts the time
			timerIntervalId.current = setInterval(() => {
				setTime((time) => time + 1);
			}, 1000);
		} else {
			clearInterval(timerIntervalId.current);
		}

		return () => clearInterval(timerIntervalId.current);
	}, [isSuccess, data]);

	if (isSuccess) {
		const hours = Math.floor(useTime / 3600);
		const hoursDisplay = hours >= 10 ? hours : `0${hours}`;

		const minutes = Math.floor((useTime % 3600) / 60);
		const minutesDisplay = minutes >= 10 ? minutes : `0${minutes}`;

		const seconds = useTime % 60;
		const secondsDisplay = seconds >= 10 ? seconds : `0${seconds}`;

		return (
			<>
				{/* status */}
				<span>
					<p className="font-semibold inline text-lg">Status: &nbsp;</p>
					<Badge
						className={cn('inline', {
							'bg-primary outline-ring': data.status === 'ONGOING',
							'bg-destructive outline-destructive': data.status != 'ONGOING',
							'bg-violet-500 outline-violet-500': data.status == 'OVERTIME',
						})}
					>
						{statusVariant(data.status as UserStatus)}
					</Badge>
				</span>
				<span
					className={cn(
						'transition ease-in-out flex items-center justify-center py-1 px-2 bg-primary rounded-full text-secondary-foreground outline-2 outline-destructive outline outline-offset-2',
						{
							'bg-primary outline-ring': data.status === 'ONGOING',
							'bg-destructive outline-destructive': data.status != 'ONGOING',
							'bg-violet-500 outline-violet-500': data.status == 'OVERTIME',
						}
					)}
				>
					{IconVariant(data.status as UserStatus)}
					<span className="w-24 text-accent text-center rounded-full ">
						<h3 className="text-lg font-semibold ">
							{hoursDisplay}:{minutesDisplay}:{secondsDisplay}
						</h3>
					</span>
				</span>
			</>
		);
	}

	return (
		<>
			{/* status */}
			<span>
				<p className="font-semibold inline text-lg">Status: &nbsp;</p>
				<Badge className="inline" variant={'secondary'}>
					NONE
				</Badge>
			</span>
			<span className="transition bg-destructive outline-destructive ease-in-out flex items-center justify-center py-1 px-2 rounded-full text-secondary-foreground outline-2  outline outline-offset-2">
				<TimerIcon
					size={`1.5rem`}
					className="mb-1 text-primary-foreground stroke-[2px]"
				></TimerIcon>
				<span className="w-24 text-accent text-center rounded-full ">
					<h3 className="text-lg font-semibold ">00:00:00</h3>
				</span>
			</span>
		</>
	);
}
