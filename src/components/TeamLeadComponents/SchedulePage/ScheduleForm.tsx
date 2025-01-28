import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TimePicker } from '@/components/ui/time-picker';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
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
import { useContext } from 'react';
import { ScheduleContext } from '@/components/DataTable/ScheduleColumn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/userStore';
import { TInputForm } from '@/api/ScheduleAPI';

const formSchema = z.object({
	name: z.string().min(2).max(50),
	role: z.string().min(2).max(50),

	timeIn: z.date(),
	timeOut: z.date(),

	allowedOverTime: z.boolean(),
	scheduleType: z.enum(['FIXED', 'SUPER_FLEXI', 'FLEXI']),
});

interface IScheduleFormProps {
	updateParentState: (value: boolean) => void;
	fetchRequest: (schedule: TInputForm, id: number) => Promise<number>;
	isPost: boolean;
}

export default function ScheduleForm({
	updateParentState,
	fetchRequest,
	isPost,
}: IScheduleFormProps) {
	const ScheduleSub = useContext(ScheduleContext);
	console.log(ScheduleSub);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ScheduleSub?.name ?? '',
			role: ScheduleSub?.role ?? '',
			timeIn: new Date(
				ScheduleSub?.Schedule.startTime ?? new Date().setHours(0, 0, 0, 0)
			),
			timeOut: new Date(
				ScheduleSub?.Schedule.endTime ?? new Date().setHours(0, 0, 0, 0)
			),

			allowedOverTime: ScheduleSub?.Schedule.allowedOvertime ?? false,
			scheduleType: ScheduleSub?.Schedule.scheduleType,
		},
	});

	const watchedType = form.watch('scheduleType');

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			// put request
			if (!isPost) {
				const scheduleId = ScheduleSub?.id;
				if (scheduleId === undefined) {
					return Promise.reject(new Error('Schedule ID is undefined'));
				}
				return fetchRequest(form.getValues(), scheduleId);
			} else {
				// postt request
				const departmentId = useUserStore.getState().user?.departmentId;
				if (departmentId === undefined) {
					return Promise.reject(new Error('Department ID is undefined'));
				}
				return fetchRequest(form.getValues(), departmentId);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Schedule'] });
			toast.success('Schedule has been updated!');
		},
		onError: (error) => {
			console.log(error);
			console.log(ScheduleSub);
		},
	});

	// do them submit shits here
	function onSubmit() {
		updateParentState(false);
		mutation.mutate();
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-2 grid-cols-2"
				>
					<div className="col-span-2 flex items-center justify-between gap-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="">
									<div className="flex items-center justify-start gap-2">
										<FormLabel>Schedule Name </FormLabel>
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
					</div>

					{/* time */}
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
