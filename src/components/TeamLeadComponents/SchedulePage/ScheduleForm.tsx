import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
	// first
	name: z.string().min(2).max(50),
	role: z.string().min(2).max(50),
	// second
	timeIn: z.string(),
	timeOut: z.string(),
	lunchTimeIn: z.string(),
	lunchTimeOut: z.string(),
	// third
	timeHoursWorked: z.number(),
	allowedOverTime: z.boolean(),
});

export default function ScheduleForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// dito lagay ung mga shet
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-2 grid-cols-2"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="">
							<FormLabel>Schedule Name</FormLabel>
							<FormControl>
								<Input placeholder="E.g. 'Morning Schedule'" {...field} />
							</FormControl>
							<FormDescription>
								This is the name of the schedule
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Role</FormLabel>
							<FormControl>
								<Input placeholder="E.g. 'Manager' " {...field} />
							</FormControl>
							<FormDescription>
								This is to apply the schedule to the employee with the role
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* time */}
				<FormField
					control={form.control}
					name="timeIn"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time-In Start</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>
								What time should the Schedule Start
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="timeOut"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Time-out Start</FormLabel>
							<FormControl>
								<Input placeholder=" " {...field} />
							</FormControl>
							<FormDescription>
								What time should the Schedule End
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* lunch */}
				<FormField
					control={form.control}
					name="lunchTimeIn"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lunchreak Start</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>
								What time should the lunchbreak start
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lunchTimeOut"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lunchbreak End</FormLabel>
							<FormControl>
								<Input placeholder="" {...field} />
							</FormControl>
							<FormDescription>
								What time should the lunchbreak End
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="allowedOverTime"
					render={({ field }) => (
						<FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>

							<div className="space-y-1 leading-none">
								<FormLabel>Allowed To Overtime?</FormLabel>
								<FormDescription>
									This will allow the employee to exceed from their maximum work
									hours
								</FormDescription>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
