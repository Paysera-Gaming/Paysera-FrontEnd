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

function convertDateToSeconds(date: Date, dateTheSecond: Date): number {
	const differenceInMilliseconds = dateTheSecond.getTime() - date.getTime();
	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
	return differenceInSeconds;
}

export default function Timebar() {
	const { openConfirmation, closeConfirmation } = useConfirmationStore();

	const [getOverTime, setOverTime] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const currentTime = new Date().toISOString();
	const employeeId = useUserStore.getState().user?.id;

	// when user times in
	const mutateTime = useMutation({
		mutationFn: async (
			fetchType: 'ClockIn' | 'ClockOut' | 'OverTimeStart' | 'OverTimeEnd'
		) => {
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

				case 'OverTimeStart':
					console.log('user is now starting over time');
					console.log('WALA PANG OVERTIME START');
					break;

				case 'OverTimeEnd':
					console.log('user is now ending over time');
					console.log('WALA PANG OVERTIME END');
					break;
			}
		},
		onSuccess: async () => {
			queryClient
				.invalidateQueries({ queryKey: ['UsersAttendance'] })
				.then(() => {
					ToasterSwitch('Clock-In', currentTime);
				});
		},
		onError: (e: ErrorEvent) => {
			console.error('An Error has occurred ' + e);
		},
	});
	async function initModalValidations() {
		// check first user is on overtime
		if (getOverTime) {
			await closeConfirmation();
			await endOvertimeDialogue();

			return;
		}
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
				// greater than
				if (
					convertDateToSeconds(new Date(attendance.timeIn), new Date()) >=
					28_800
				) {
					//ask for overtime
					await closeConfirmation();
					await startOvertimeDialogue();
				} else {
					console.log('FOOBAR');
				}
			} else {
				await closeConfirmation();
				await warningInsufficientHoursDialogue();
			}
		}
	}

	function endOvertimeDialogue() {
		openConfirmation({
			title: 'Finish Over Time?',
			description: 'Are you sure you want to timeout and end your overtime?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: () => {
				toast.success('User has timed out of session');
				setOverTime(false);
				useUserStore.getState().setUserClockStatus('Clock-Out');
				// setIsClockedIn(false);
				// mutateTime.mutate('OverTimeEnd');
				// useUserStore.getState().setUserClockStatus('Clock-In');
			},
			onCancel: () => {
				console.log('Cancel OVERTIME END');
			},
		});
	}

	async function startOvertimeDialogue() {
		openConfirmation({
			title: 'Would You Like to start your OverTime?',
			description:
				'Pressing the continue button will proceed for your overtime?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: () => {
				toast.success('User has started overtime');
				setOverTime(true);
				// mutateTime.mutate('OverTimeStart');
			},
			onCancel: async () => {
				// if user did not want to overtime
				console.log('CANCELED START OVERTIME');
				await closeConfirmation();
				await confirmTimeOut();
			},
		});
	}

	function confirmTimeIn() {
		openConfirmation({
			title: 'Start TimeIn?',
			description: 'Are you sure you want to start your timein?',
			cancelLabel: 'Cancel',
			actionLabel: 'Continue',
			onAction: () => {
				useUserStore.getState().setUserClockStatus('Clock-In');
				mutateTime.mutate('ClockIn');
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
				console.log('Start TimeOut');
				toast.success('User has timeout from the session');
				mutateTime.mutate('ClockOut');
				useUserStore.getState().setUserClockStatus('Clock-Out');
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
				mutateTime.mutate('ClockOut');
				useUserStore.getState().setUserClockStatus('Clock-Out');
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

			<Button onClick={initModalValidations}>
				{useUserStore.getState().getUserClockStatus() === 'Clock-In'
					? 'Clock-Out'
					: 'Clock-In'}
			</Button>
		</header>
	);
}
