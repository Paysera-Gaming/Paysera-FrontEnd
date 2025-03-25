import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import { formatDistanceStrict } from 'date-fns';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from 'react-router-dom';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUserStore } from '@/stores/userStore.ts';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { postAttendance } from '@/api/AttendanceAPI';

// this should get the start and end of the date of this leave

const formSchema = z.object({
	startDate: z.string({
		required_error: 'Start date is required',
	}),
	endDate: z.string({
		required_error: 'End date is required',
	}),
});

function ittirateDates(
	numberOfDays: number,
	startingDate: Date,
	hours: number
) {
	const dates = [];
	// This will loop through the number of days and  create a new date and copy the hours
	// and pushes the date
	for (let index = 0; index < numberOfDays + 1; index++) {
		const interatingDate = new Date(startingDate);
		interatingDate.setDate(startingDate.getDate() + index);
		interatingDate.setHours(hours);

		dates.push(interatingDate);
	}

	return dates;
}

export function RequestLeaveButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const user = useUserStore.getState().getUser();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
		},
	});
	const departmentSchedule = user?.departmentSchedule;

	const mutation = useMutation({
		mutationFn: (payLoad: { startDate: string; endDate: string }) => {
			if (
				user == undefined ||
				departmentSchedule?.Schedule.scheduleType == undefined
			) {
				console.log('Employee ID is undefined at check');
				navigate('/login');
				throw new Error('Employee ID is undefined');
			}

			// Perform the mutation logic here
			return postAttendance({
				employeeId: user.id,
				date: payLoad.startDate,
				status: 'PAID_LEAVE',
				scheduleType: departmentSchedule?.Schedule.scheduleType,
				timeIn: payLoad.startDate,
				timeOut: payLoad.endDate,
				isAllowedOvertime: false,
				overtimeTotal: 0,
				RequestOverTimeStatus: 'NO_REQUEST',
				RequestLeaveStatus: 'PENDING',
			});
		},
	});

	function handleSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);

		const dateSpan = formatDistanceStrict(
			new Date(data.startDate),
			new Date(data.endDate),
			{
				addSuffix: false,
				unit: 'day',
			}
		);
		// regex magic bitch
		const sanitizedDateSpan = dateSpan.replace(/\D+/g, '');

		const startDates = ittirateDates(
			Number(sanitizedDateSpan),
			new Date(data.startDate),
			0
		);

		const endDates = ittirateDates(
			Number(sanitizedDateSpan),
			new Date(data.startDate),
			9
		);

		setIsLoading(true);

		startDates.map((date, index) => {
			mutation.mutate(
				{
					startDate: date.toISOString(),
					endDate: endDates[index].toISOString(),
				},
				{
					onSuccess: () => {
						toast.success('Request for Leave has successfully submitted');
						setIsOpen(false);
					},
					onSettled: () => {
						setIsLoading(false);
					},
				}
			);
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-orange-500 hover:bg-orange-500 text-base">
					Request Leave
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] left-[50%] top-[20%] ">
				<DialogHeader>
					<DialogTitle>Requesting Leave form</DialogTitle>
					<DialogDescription>
						You are about to create a Leave Form. Make sure to fill out all the
						necessary information accurately.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)}>
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Leave Starts At:</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] justify-start text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													<CalendarIcon />
													{field.value ? (
														format(new Date(field.value), 'PPP')
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={
														field.value ? new Date(field.value) : undefined
													}
													onSelect={(date) =>
														field.onChange(date ? date.toISOString() : '')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Leave Ends At:</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] justify-start text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													<CalendarIcon />
													{field.value ? (
														format(field.value, 'PPP')
													) : (
														<span>Pick a date</span>
													)}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={
														field.value ? new Date(field.value) : undefined
													}
													onSelect={(date) =>
														field.onChange(date ? date.toISOString() : '')
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type="submit" className="mt-2" disabled={isLoading}>
							<Loader2
								className={cn(
									isLoading == false && 'hidden',
									'animate-spin mr-1'
								)}
							/>
							Submit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
