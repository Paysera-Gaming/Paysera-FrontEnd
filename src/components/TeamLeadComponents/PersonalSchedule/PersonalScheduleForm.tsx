import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	day: z.array(z.string()).nonempty('At least one option must be selected'),
	employeeId: z.number(),

	timeIn: z.date(),
	timeOut: z.date(),

	allowedOverTime: z.boolean(),
	scheduleType: z.enum(['FIXED', 'SUPER_FLEXI', 'FLEXI']),
});

// const poop = {
// 	name: 'Personal Schedule',
// 	day: ['MONDAY'],
// 	employeeId: 0,
// 	startTime: '2024-09-06T09:00:00Z',
// 	endTime: '2024-09-06T18:00:00Z',
// 	limitWorkHoursDay: 8,
// 	allowedOvertime: false,
// };

interface IPersonalScheduleFormProps {
	updateParentState: (value: boolean) => void;
	fetchRequest: (schedule: z.infer<typeof formSchema>) => Promise<number>;
	isPost: boolean;
}
