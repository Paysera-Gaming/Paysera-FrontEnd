import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { TimePicker } from '@/components/ui/time-picker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useQueryClient } from '@tanstack/react-query';
import { TEmployee } from '@/components/DataTable/DataColumns';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	day: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.',
	}),
	employeeId: z.number(),

	timeIn: z.date(),
	timeOut: z.date(),

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

export default function PersonalScheduleForm({
	updateParentState,
	fetchRequest,
	isPost,
}: IPersonalScheduleFormProps) {
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			day: [],
		},
		// todo add default values
	});

	const items = [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
		'SATERDAY',
		'SUNDAY',
	] as const;

	const employees = queryClient.getQueryData<TEmployee[]>(['EmployeesInfo']);

	// do them submit shits here
	function onSubmit() {
		updateParentState(false);
		// mutation.mutate();
	}
	const watchedType = form.watch('scheduleType');
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => {
							return (
								<FormItem>
									<div className="flex items-center justify-start gap-2">
										<FormLabel>Personal Schedule Name</FormLabel>

										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="w-4 h-4"></Info>
												</TooltipTrigger>
												<TooltipContent>
													Adds a name for the personal schedule
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<FormControl>
										<Input placeholder="E.g. 'Manager' " {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{/* select input for users */}
					<FormField
						control={form.control}
						name="employeeId"
						render={({ field }) => {
							//     check if time worked is more than >= 8 hours
							return (
								<FormItem>
									<div className="flex items-center justify-start gap-2">
										<FormLabel>Employee Name</FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="w-4 h-4"></Info>
												</TooltipTrigger>
												<TooltipContent>
													This chooses the employee that will have the personal
													schedule
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<Select onValueChange={(value) => field.onChange(value)}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select An Employee" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{employees?.map((item) => (
												<SelectItem key={item.id} value={item.id.toString()}>
													{item.lastName} {item.firstName}
												</SelectItem>
											)) || 'No Employees Found'}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>

					{/* check box for days */}

					<FormField
						control={form.control}
						name="day"
						render={() => (
							<FormItem>
								<div className="mb-4">
									<FormLabel className="text-base">Days</FormLabel>
									<FormDescription>Select the day</FormDescription>
								</div>
								{items.map((item, index) => (
									<FormField
										key={index}
										control={form.control}
										name="day"
										render={({ field }) => {
											return (
												<FormItem
													key={index}
													className="flex flex-row items-start space-x-3 space-y-0"
												>
													<FormControl>
														<Checkbox
															checked={field.value?.includes(item)}
															onCheckedChange={(checked) => {
																return checked
																	? field.onChange([...field.value, item])
																	: field.onChange(
																			field.value?.filter(
																				(value) => value !== item
																			)
																			// eslint-disable-next-line no-mixed-spaces-and-tabs
																	  );
															}}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal capitalize">
														{item}
													</FormLabel>
												</FormItem>
											);
										}}
									/>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* schedule type */}
					<FormField
						control={form.control}
						name="scheduleType"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center justify-start gap-2">
									<FormLabel>Type</FormLabel>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Info className="w-4 h-4"></Info>
											</TooltipTrigger>
											<TooltipContent>
												This dictates the flexibility of the schedule
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a Schedule Type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="FIXED">FIXED</SelectItem>
										<SelectItem value="SUPER_FLEXI">SUPER_FLEXI</SelectItem>
										<SelectItem value="FLEXI">FLEXI</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* time in */}
					{/* time out */}
					{watchedType === 'FIXED' && (
						<>
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
										<FormLabel>Time-Out Start</FormLabel>
										<FormControl>
											<TimePicker
												date={field.value}
												setDate={field.onChange}
											></TimePicker>
										</FormControl>
										<FormDescription>*In military Time</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					)}

					{/* submit */}
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
