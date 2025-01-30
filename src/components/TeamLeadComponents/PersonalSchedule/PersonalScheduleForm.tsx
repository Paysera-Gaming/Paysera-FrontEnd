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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TEmployee } from '@/components/DataTable/DataColumns';
import { toast } from 'sonner';
import { useContext } from 'react';
import { PersonalScheduleContext } from '@/stores/context';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	day: z
		.array(
			z.enum([
				'MONDAY',
				'TUESDAY',
				'WEDNESDAY',
				'THURSDAY',
				'FRIDAY',
				'SATURDAY',
				'SUNDAY',
			])
		)
		.refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.',
		}),
	employeeId: z.number(),

	timeIn: z.date(),
	timeOut: z.date(),

	scheduleType: z.enum(['FIXED', 'SUPER_FLEXI', 'FLEXI']),
});

interface IPersonalScheduleFormProps {
	updateParentState: (value: boolean) => void;
	fetchRequest: (
		schedule: z.infer<typeof formSchema>,
		id?: number
	) => Promise<number>;
	isPost: boolean;
}

function isValidDate(date: string | undefined) {
	if (date == undefined) return undefined;
	else return new Date(date);
}

export default function PersonalScheduleForm({
	updateParentState,
	fetchRequest,
	isPost,
}: IPersonalScheduleFormProps) {
	const queryClient = useQueryClient();
	const PersonalScheduleSub = useContext(PersonalScheduleContext);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: PersonalScheduleSub?.name ?? '',
			employeeId: PersonalScheduleSub?.employeeId ?? undefined,
			scheduleType: PersonalScheduleSub?.Schedule.scheduleType ?? undefined,
			timeIn:
				isValidDate(PersonalScheduleSub?.Schedule.startTime as string) ??
				new Date(new Date().setHours(0, 0, 0, 0)),
			timeOut:
				isValidDate(PersonalScheduleSub?.Schedule.endTime as string) ??
				new Date(new Date().setHours(0, 0, 0, 0)),
			day: PersonalScheduleSub?.day || [],
		},
	});

	const items = [
		'MONDAY',
		'TUESDAY',
		'WEDNESDAY',
		'THURSDAY',
		'FRIDAY',
		'SATURDAY',
		'SUNDAY',
	] as const;

	const employees = queryClient.getQueryData<TEmployee[]>(['EmployeesInfo']);

	const mutation = useMutation({
		mutationFn: () => {
			if (isPost == false) {
				return fetchRequest(form.getValues(), PersonalScheduleSub?.id);
			}
			return fetchRequest(form.getValues());
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['PersonalSchedule'] });
			updateParentState(false);
			toast.success('Schedule has been updated!');
		},
		onError: (error) => {
			console.log(error);
		},
	});
	// do them submit shits here
	function onSubmit() {
		updateParentState(false);
		console.log(form.getValues());
		mutation.mutate();
	}

	const watchedType = form.watch('scheduleType');
	return (
		<>
			<Form {...form}>
				<form
					className="p-2 px-3 grid gap-2 grid-cols-2"
					onSubmit={form.handleSubmit(
						onSubmit,
						(errors) => console.log('Form errors:', errors) // Debugging
					)}
				>
					<div className="col-span-2 flex items-center justify-between gap-2">
						{/* name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => {
								return (
									<FormItem className="w-full">
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

						{isPost && (
							<FormField
								control={form.control}
								name="employeeId"
								render={({ field }) => {
									//     check if time worked is more than >= 8 hours
									return (
										<FormItem className="w-full">
											<div className="flex items-center justify-start gap-2">
												<FormLabel>Employee Name</FormLabel>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Info className="w-4 h-4"></Info>
														</TooltipTrigger>
														<TooltipContent>
															This chooses the employee that will have the
															personal schedule
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>

											<Select
												disabled={!isPost}
												onValueChange={(value) =>
													field.onChange(parseInt(value))
												}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select An Employee" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{employees?.map((item) => (
														<SelectItem
															key={item.id}
															value={item.id.toString()}
														>
															{item.lastName} {item.firstName}
														</SelectItem>
													)) || <p>No Employees found.</p>}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									);
								}}
							/>
						)}
					</div>

					{/* check box for days */}
					<FormField
						control={form.control}
						name="day"
						render={() => (
							<FormItem className="col-span-2">
								<div className="flex items-center justify-start gap-2">
									<FormLabel>Allowed Days</FormLabel>

									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Info className="w-4 h-4"></Info>
											</TooltipTrigger>
											<TooltipContent>
												This will dictate when this schedule be used when taking
												an attendance
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<div className="flex flex-wrap items-stretch justify-stretch gap-2">
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
														<FormLabel className="text-sm font-normal ">
															<p className="capitalize">
																{' '}
																{item.toLocaleLowerCase()}
															</p>
														</FormLabel>
													</FormItem>
												);
											}}
										/>
									))}
								</div>

								<FormMessage />
							</FormItem>
						)}
					/>
					{/* schedule type */}

					<FormField
						control={form.control}
						name="scheduleType"
						render={({ field }) => (
							<FormItem className="col-span-2">
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
					<div className="col-span-2 flex items-center justify-end gap-2 mt-2">
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
