// icons
// import TimeForm from './TimeForm';

import TimerDisplay from '@/components/TimeInComponent/TimerDisplay';
import { Button } from '@/components/ui/button.tsx';
import useConfirmationStore from '@/stores/GlobalAlertStore.ts';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Timebar() {
	const { openConfirmation, closeConfirmation } = useConfirmationStore();

	// this needs to be an await i'd rather not use a set timeout
	// but this could be a timeout as well

	const [getOverTime, setOverTime] = useState<boolean>(false);
	const [getIsClockedIn, setIsClockedIn] = useState<boolean>(false);
	const [getTotalHoursSufficient] = useState<number>(8);

	// NOTE: DI KO PA NADADAGDAG UNG CHECK SA SCHEDULE TYPE BROS

	async function initModalValidations() {
		// check first user is on overtime
		if (getOverTime) {
			await closeConfirmation();
			await endOvertimeDialogue();

			return;
		}
		// check whether the user has already clocked in or not
		if (!getIsClockedIn) {
			//if not clocked in proceed to the clock in dialogue
			await closeConfirmation();
			await confirmTimeIn();
		} else {
			//     check if time worked is more than >= 8 hours
			if (getTotalHoursSufficient >= 8) {
				//ask for overtime
				await closeConfirmation();
				await startOvertimeDialogue();
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
				console.log('END OVERTIME');
				toast.success('User has timed out of session');
				setOverTime(false);
				setIsClockedIn(false);
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
				console.log('START OVERTIME');
				toast.success('User has started overtime');
				setOverTime(true);
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
				console.log('Start TimeIn');
				toast.success('User has started time in');

				setIsClockedIn(true);
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

				setIsClockedIn(false);
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
				console.log('Start TimeOut');
				setIsClockedIn(false);
			},
			onCancel: () => {
				console.log('Cancel TimeOut');
			},
		});
	}

	return (
		<header className="border-border border-solid border w-full rounded-md p-2 px-5 flex items-center justify-between">
			{/* timer display */}
			<TimerDisplay></TimerDisplay>

			{/* form */}
			{/*<TimeForm></TimeForm>*/}

			<Button onClick={initModalValidations}>Clock In</Button>
		</header>
	);
}
