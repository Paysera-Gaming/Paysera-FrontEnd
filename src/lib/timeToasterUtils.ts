// list of warnings
// when user is already in time-in
// when user wants to time out but hasn't even time in
// when user wants to lunch out even tho he hasnt lunch in
// error from backend

import { toast } from 'sonner';

type ToasterStringLiteral =
	| 'Clock-In'
	| 'Clock-In-Error'
	| 'Clock-Out'
	| 'Clock-Out-Error'
	| 'Lunch-In'
	| 'Lunch-In-Error'
	| 'Lunch-Out'
	| 'Lunch-Out-Error'
	| 'Lunch-In-Already'
	| 'Error'
	| 'Invalid'
	| 'Required';

function stupidAssAlert(timeStamp: string | undefined) {
	//this shit will check if you added a timestamp string
	if (timeStamp == undefined) throw new Error('ADD A DESCRIPTION ASS HAT');
}

export default function ToasterSwitch(
	context: ToasterStringLiteral,
	timeStamp?: string
) {
	switch (context) {
		case 'Clock-In':
			stupidAssAlert(timeStamp);

			toast.success('Clock In Success', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'Clock-In-Error':
			toast.warning('You have already clocked-in');
			break;
		case 'Lunch-In':
			stupidAssAlert(timeStamp);
			toast.success('Your Lunch has started', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'Lunch-In-Error':
			toast.warning('You cannot start your lunch break without clocking in');
			break;
		case 'Lunch-Out':
			stupidAssAlert(timeStamp);
			toast.success('Lunch Ended', {
				description: `Time started at ${timeStamp}`,
			});
			break;
		case 'Lunch-Out-Error':
			toast.warning('You cannot end your lunch break without starting it');
			break;
		case 'Clock-Out':
			stupidAssAlert(timeStamp);
			toast.success('Clock Out Success', {
				description: `Time Ended at ${timeStamp}`,
			});
			break;
		case 'Clock-Out-Error':
			toast.warning('You cannot clock out without clocking in');
			break;

		case 'Lunch-In-Already':
			toast.warning('You have started your lunch already');
			break;
		case 'Error':
			toast.error('An error has occured');
			break;

		case 'Invalid':
			toast.error('Invalid Input');
			break;
		case 'Required':
			toast.error('Input is required');
	}
}
