import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';
import { Button } from '@/components/ui/button.tsx';
import useConfirmationStore from '@/stores/GlobalAlertStore.ts';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore.ts';
import { clockIn, clockOut } from '@/api/ClockInAPI.ts';
import ToasterSwitch from '@/lib/timeToasterUtils.ts';
import { TAttendance } from '@/api/AttendanceAPI';
import { Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RequestOverTimeButton } from './RequestOverTimeButton';
import useAlertTimeup from '@/hooks/useAlertTimeup';
import { isSameDay } from 'date-fns';
import { RequestLeaveButton } from './RequestLeaveButton';

function convertDateToSeconds(date: Date, dateTheSecond: Date): number {
	const differenceInMilliseconds = dateTheSecond.getTime() - date.getTime();
	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
	return differenceInSeconds;
}

export default function Timebar() {
	const { openConfirmation, closeConfirmation } = useConfirmationStore();
	const queryClient = useQueryClient();
	const { evaluateAlarmType } = useAlertTimeup();

	const currentTime = new Date().toISOString();
	const { user, getUserClockStatus, setUserClockStatus } = useUserStore();
	const employeeId = user?.id;
	const employeeAccessLevel = user?.accessLevel;

	const [getIsLoading, setIsLoading] = useState<boolean>(false);
	const [getCanProceed, setCanProceed] = useState<boolean>(false);

	const mutateTime = useMutation({
		mutationFn: async (fetchType: 'ClockIn' | 'ClockOut') => {
			setIsLoading(true);

			const timeIn = queryClient.getQueryData<TAttendance>(['UsersAttendance']);

			if (employeeId === undefined) {
				throw new Error('Employee ID is undefined');
			}

			switch (fetchType) {
				case 'ClockIn':
					console.log('user is now clocking in');
					return clockIn({ employeeId: employeeId, timeStamp: currentTime });

				case 'ClockOut':
					if (timeIn) {
						if (!isSameDay(new Date(timeIn.createdAt), new Date())) {
							toast.error('Invalid Clock Out');
							queryClient.invalidateQueries({ queryKey: ['UsersAttendance'] });
							setUserClockStatus('Clock-Out');
							setCanProceed(false);
							throw new Error('Invalid Clock Out');
						}
					}
					return clockOut({ employeeId: employeeId, timeStamp: currentTime });
			}
		},
		onSuccess: async () => {
			setIsLoading(false);
			setCanProceed(true);
			queryClient.invalidateQueries({ queryKey: ['UsersAttendance'] });
		},
		onError: (e: ErrorEvent) => {
			setIsLoading(false);
			console.error('An Error has occurred ' + e);
			setCanProceed(false);
		},
	});

	async function initModalValidations() {
		if (getUserClockStatus() == 'Clock-Out') {
			await closeConfirmation();
			await confirmTimeIn();
		} else {
			const attendance = await queryClient.getQueryData<TAttendance>([
				'UsersAttendance',
			]);

			if (attendance) {
				if (
					convertDateToSeconds(new Date(attendance.timeIn), new Date()) > 32_400
				) {
					await closeConfirmation();
					await confirmTimeOut();
				} else {
					await closeConfirmation();
					await warningInsufficientHoursDialogue();
				}
			}
		}
	}

	function confirmTimeIn() {
		openConfirmation({
			title: 'Start TimeIn?',
			description: 'Are you sure you want to start your time-in?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: async () => {
				await mutateTime.mutate('ClockIn');
				if (getCanProceed) {
					setUserClockStatus('Clock-In');
				}
				setCanProceed(false);
			},
			onCancel: () => {
				console.log('Cancel TimeIn');
			},
		});
	}

	function confirmTimeOut() {
		openConfirmation({
			title: 'Are you sure you want to clock out?',
			description: 'Are you sure you want to clock out?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: () => {
				mutateTime.mutate('ClockOut', {
					onSuccess: () => {
						if (getCanProceed) {
							toast.success('User has timeout from the session');
							setUserClockStatus('Clock-Out');
							setCanProceed(false);
						}
					},
				});
			},
			onCancel: () => {
				console.log('Cancel TimeOut');
			},
		});
	}

	function warningInsufficientHoursDialogue() {
		openConfirmation({
			title: 'WARNING INSUFFICIENT HOURS WORKED!',
			description: 'Are you sure you want to clock out?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: () => {
				mutateTime.mutate('ClockOut', {
					onSuccess: () => {
						if (getCanProceed) {
							toast.success('User has timeout from the session');
							setUserClockStatus('Clock-Out');
						}
						setCanProceed(false);
					},
				});
			},
			onCancel: () => {
				console.log('Cancel TimeOut');
			},
		});
	}

	useEffect(() => {
		console.log('useUserStore:', getUserClockStatus());
	}, [getUserClockStatus]);

	useEffect(() => {
		evaluateAlarmType();
		const interval = setInterval(() => {
			evaluateAlarmType();
		}, 1800000);
		return () => clearInterval(interval);
	}, [evaluateAlarmType]);

	return (
		<header className="shadow-sm border-border bg-card border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
			<TimerDisplay />
			<div className="flex gap-2">
				{employeeAccessLevel !== 'ADMIN' && (
					<>
						<RequestLeaveButton />
						<RequestOverTimeButton />
					</>
				)}
				<Button
					className="text-base"
					disabled={getIsLoading}
					onClick={initModalValidations}
				>
					{getUserClockStatus() === 'Clock-In' ? 'Clock-Out' : 'Clock-In'}
					<Loader2
						className={cn(
							getIsLoading === false && 'hidden',
							'animate-spin ml-1'
						)}
					/>
					<Clock className={cn(getIsLoading === true && 'hidden', 'ml-1')} />
				</Button>
			</div>
		</header>
	);
}
