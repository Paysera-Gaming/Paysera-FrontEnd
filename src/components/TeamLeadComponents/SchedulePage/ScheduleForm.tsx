import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TimePicker } from '@/components/ui/time-picker';
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
import { Button } from '@/components/ui/button';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Checkbox } from '@/components/ui/checkbox';
import { Info } from 'lucide-react';

const formSchema = z.object({
	// first
	name: z.string().min(2).max(50),
	role: z.string().min(2).max(50),
	// second
	timeIn: z.date(),
	timeOut: z.date(),
	lunchTimeIn: z.date(),
	lunchTimeOut: z.date(),
	// third
	allowedOverTime: z.boolean(),
});

interface IScheduleFormProps {
	updateParentState: (value: boolean) => void;
}

export default function ScheduleForm({
	updateParentState,
}: IScheduleFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			// dito lagay ung mga shet
			allowedOverTime: false,
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
		updateParentState(false);
	}

	return (
		<>
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
								<div className="flex items-center justify-start gap-2">
									<FormLabel>Schedule Name</FormLabel>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Info className="w-4 h-4"></Info>
											</TooltipTrigger>
											<TooltipContent>
												This is the name of the schedule
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<FormControl>
									<Input placeholder="E.g. 'Morning Schedule'" {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-start gap-2">
									<FormLabel>Role</FormLabel>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Info className="w-4 h-4"></Info>
											</TooltipTrigger>
											<TooltipContent>
												Applies the schedule to the employee with this role
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<FormControl>
									<Input placeholder="E.g. 'Manager' " {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* time */}
					<FormField
						control={form.control}
						name="timeIn"
						render={({ field }) => (
							<FormItem className="border border-border border-solid rounded-md p-3">
								<FormLabel>Time-In Start</FormLabel>
								<FormControl>
									<TimePicker
										date={field.value}
										setDate={field.onChange}
									></TimePicker>
								</FormControl>
								<FormDescription>*In military time</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="timeOut"
						render={({ field }) => (
							<FormItem className="border border-border border-solid rounded-md p-3">
								<FormLabel>Time-In Start</FormLabel>
								<FormControl>
									<TimePicker
										date={field.value}
										setDate={field.onChange}
									></TimePicker>
								</FormControl>
								<FormDescription>
									<FormDescription>*In military time</FormDescription>
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
							<FormItem className="border border-border border-solid rounded-md p-3">
								<FormLabel>Lunchbreak Start</FormLabel>
								<FormControl>
									<TimePicker
										date={field.value}
										setDate={field.onChange}
									></TimePicker>
								</FormControl>
								<FormDescription>
									<FormDescription>*In military Time</FormDescription>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lunchTimeOut"
						render={({ field }) => (
							<FormItem className="border border-border border-solid rounded-md p-3">
								<FormLabel>Lunchbreak End</FormLabel>
								<FormControl>
									<TimePicker
										date={field.value}
										setDate={field.onChange}
									></TimePicker>
								</FormControl>
								<FormDescription>
									<FormDescription>*In military Time</FormDescription>
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
										Allows the employee to exceed from their maximum work hours
									</FormDescription>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="col-span-2 flex items-center justify-end gap-2">
						<Button
							onClick={() => {
								updateParentState(false);
							}}
							variant={'outline'}
							type="button"
						>
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
