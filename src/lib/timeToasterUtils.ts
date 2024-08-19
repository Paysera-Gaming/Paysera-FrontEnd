// list of warnings
// when user is already in time-in
// when user wants to time out but hasn't even time in
// when user wants to lunch out even tho he hasnt lunch in
// error from backend

import { toast } from 'sonner';

type ToasterStringLiteral =
	| 'clock-in'
	| 'clock-in-error'
	| 'clock-out'
	| 'clock-out-error'
	| 'lunch-in'
	| 'lunch-in-error'
	| 'lunch-out'
	| 'lunch-out-error'
	| 'lunch-in-already'
	| 'error'
	| 'invalid';

function stupidAssAlert(timeStamp: string | undefined) {
	//this shit will check if you added a timestamp string
	if (timeStamp == undefined) throw new Error('ADD A DESCRIPTION ASS HAT');
}

export default function ToasterSwitch(
	context: ToasterStringLiteral,
	timeStamp?: string
) {
	switch (context) {
		case 'clock-in':
			stupidAssAlert(timeStamp);

			toast.success('Clock In Success', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'clock-in-error':
			toast.warning('You have already clocked-in');
			break;
		case 'lunch-in':
			stupidAssAlert(timeStamp);
			toast.success('Clock In Success', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'lunch-in-error':
			toast.warning('You cannot start your lunch break without clocking in');
			break;
		case 'lunch-out':
			stupidAssAlert(timeStamp);
			toast.success('Clock In Success', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'lunch-out-error':
			toast.warning('You cannot end your lunch break without starting it');
			break;
		case 'clock-out':
			stupidAssAlert(timeStamp);
			toast.success('Clock Out Success', {
				description: `Time Ended at ${timeStamp}`,
			});
			break;
		case 'clock-out-error':
			toast.warning('You cannot clock out without clocking in');
			break;

		case 'lunch-in-already':
			toast.warning('You have started your lunch already');
			break;
		case 'error':
			toast.error('An error has occured');
			break;

		case 'invalid':
			toast.error('Invalid Input');
	}
}
