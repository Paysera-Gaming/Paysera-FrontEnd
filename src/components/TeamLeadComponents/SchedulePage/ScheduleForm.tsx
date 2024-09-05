import { z } from 'zod';

const formSchema = z.object({
	userID: z.string().min(2).max(50),
	fName: z.string().min(2).max(50),
	lName: z.string().min(2).max(50),
	mName: z.string().min(2).max(50),
	role: z.string().min(2).max(50),
	timeIn: z.date(),
	timeOut: z.date(),
	lunchTimeIn: z.date(),
	lunchTimeOut: z.date(),
	timeHoursWorked: z.date(),
	overTimeTotal: z.number(),
	timeTotal: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export default function ScheduleForm() {}
