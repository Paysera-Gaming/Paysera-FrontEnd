// icons
// import TimeForm from './TimeForm';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';
import { Button } from '@/components/ui/button.tsx';
import useConfirmationStore from '@/stores/GlobalAlertStore.ts';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/stores/userStore.ts';
import { clockIn, clockOut } from '@/api/ClockInAPI.ts';
import ToasterSwitch from '@/lib/timeToasterUtils.ts';
import { TAttendance } from '@/api/AttendanceAPI';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RequestOverTimeButton } from './RequestOverTimeButton';


function convertDateToSeconds(date: Date, dateTheSecond: Date): number {
  const differenceInMilliseconds = dateTheSecond.getTime() - date.getTime();
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  return differenceInSeconds;
}

export default function Timebar() {
	const { openConfirmation, closeConfirmation } = useConfirmationStore();
	const queryClient = useQueryClient();

	const currentTime = new Date().toISOString();
	const employeeId = useUserStore.getState().user?.id;

	const [getIsLoading, setIsLoading] = useState<boolean>(false);
	const [getCanProceed, setCanProceed] = useState<boolean>(false);
	// when user times in
	const mutateTime = useMutation({
		mutationFn: async (fetchType: 'ClockIn' | 'ClockOut') => {
			setIsLoading(true);

			//checks if the user has an ID
			if (employeeId === undefined) {
				throw new Error('Employee ID is undefined');
			}

			switch (fetchType) {
				case 'ClockIn':
					console.log('user is now clocking in');
					return clockIn({ employeeId: employeeId, timeStamp: currentTime });

				case 'ClockOut':
					console.log('user is now clocking out');
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
		// check first user is on overtime

		// check whether the user has already clocked in or not
		if (useUserStore.getState().userClockStatus == 'Clock-Out') {
			//if not clocked in proceed to the clock in dialogue
			await closeConfirmation();
			await confirmTimeIn();
		} else {
			//     check if time worked is more than >= 8 hours
			const attendance = await queryClient.getQueryData<TAttendance>([
				'UsersAttendance',
			]);

			if (attendance) {
				// greater than or equal to 9 hours
				if (
					convertDateToSeconds(new Date(attendance.timeIn), new Date()) > 32_400
				) {
					await closeConfirmation();
					await confirmTimeOut();
				} else {
					// eto muna
					await closeConfirmation();
					await warningInsufficientHoursDialogue();
				}
			}
		}
	}

	function confirmTimeIn() {
		openConfirmation({
			title: 'Start TimeIn?',
			description: 'Are you sure you want to start your timein?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: async () => {
				await mutateTime.mutate('ClockIn');
				if (getCanProceed == true) {
					useUserStore.getState().setUserClockStatus('Clock-In');
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
			onAction: async () => {
				await mutateTime.mutate('ClockOut');
				if (getCanProceed == true) {
					toast.success('User has timeout from the session');
					useUserStore.getState().setUserClockStatus('Clock-Out');
				}
				setCanProceed(false);
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
			onAction: async () => {
				await mutateTime.mutate('ClockOut');
				if (getCanProceed == true) {
					useUserStore.getState().setUserClockStatus('Clock-Out');
				}
				setCanProceed(false);
			},
			onCancel: () => {
				console.log('Cancel TimeOut');
			},
		});
	}

	return (
		<header className=" border-border border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
			{/* timer display */}
			<TimerDisplay></TimerDisplay>

			{/* form */}
			{/*<TimeForm></TimeForm>*/}
			<div className="flex gap-2">
				<RequestOverTimeButton></RequestOverTimeButton>

				<Button disabled={getIsLoading} onClick={initModalValidations}>
					<Loader2
						className={cn(
							getIsLoading == false && 'hidden',
							'animate-spin mr-1'
						)}
					/>

					{useUserStore.getState().getUserClockStatus() === 'Clock-In'
						? 'Clock-Out'
						: 'Clock-In'}
				</Button>
			</div>
		</header>
	);

}
