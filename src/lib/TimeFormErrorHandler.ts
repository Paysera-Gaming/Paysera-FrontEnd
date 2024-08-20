import { FieldErrors } from 'react-hook-form';

import { z } from 'zod';

const timeValues = ['Time-In', 'Start-Lunch', 'End-Lunch', 'Time-Out'] as const;
import ToasterSwitch from './timeToasterUtils';
const formSchema = z.object({
	TimeType: z.enum(timeValues),
});

export default function TimeFormErrorHandler(
	errors: FieldErrors<z.infer<typeof formSchema>>
) {
	ToasterSwitch('required');
	console.log(errors);
}
