import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
// THIS SHIT IS DEPRECATED DO NOT USE
import ToasterSwitch from '@/lib/timeToasterUtils';
import TimeFormErrorHandler from '@/lib/TimeFormErrorHandler';

import {
	AlarmCheckIcon,
	AlarmClockMinusIcon,
	UtensilsIcon,
	UtensilsCrossedIcon,
} from 'lucide-react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { z } from 'zod';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clockIn, clockOut, lunchIn, lunchOut } from '@/api/ClockInAPI';
import { useUserStore } from '@/stores/userStore';

// create a function that will create a snapshot of the start time and end time

export interface ChildProps {}

export default function TimeForm() {
	const [isOpen, setIsOpen] = useState(false);
	const timeValues = [
		'Clock-In',
		'Lunch-In',
		'Lunch-Out',
		'Clock-Out',
	] as const;

	const formSchema = z.object({
		TimeType: z.enum(timeValues),
	});

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			TimeType: 'Clock-In',
		},
	});
	const currentTime = new Date().toISOString();
	const employeeId = useUserStore.getState().user?.id;
	const mutateTime = useMutation({
		mutationFn: async () => {
			// if no id
			if (employeeId === undefined) {
				throw new Error('Employee ID is undefined');
			}

			const timeType = form.getValues('TimeType');
			// created an object that will hold the action functions
			const timeActions = {
				'Clock-In': clockIn,
				'Clock-Out': clockOut,
				'Lunch-In': lunchIn,
				'Lunch-Out': lunchOut,
			};

			const action = timeActions[timeType];
			if (!action) {
				throw new Error('Invalid TimeType');
			}

			return action({
				employeeId: employeeId,
				timeStamp: currentTime,
			});
		},
		onSuccess: () => {
			// this will run the toast
			// and the updateParentState function
			// that will update the display timer
			queryClient.invalidateQueries({ queryKey: ['UsersAttendance'] });

			ToasterSwitch(form.getValues('TimeType'), currentTime);
		},
	});

	function onSubmit() {
		setIsOpen(true);
	}

	// i have no idea what to name this guy so i just named it runYourMother
	// nonetheless this function will run sa post update
	function runYourMother() {
		mutateTime.mutate();
	}

	return (
		<Form {...form}>
			<form
				className="flex items-start justify-center gap-x-3 "
				onSubmit={form.handleSubmit(onSubmit, TimeFormErrorHandler)}
			>
				<FormField
					control={form.control}
					name="TimeType"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select Your Action" />
										</SelectTrigger>
									</FormControl>
									{/* Select items */}
									<SelectContent>
										<SelectItem value="Clock-In">
											<div className="flex items-center justify-center gap-x-3 ">
												<AlarmCheckIcon></AlarmCheckIcon> <p>Clock In</p>
											</div>
										</SelectItem>
										<SelectItem value="Lunch-In">
											<div className="flex items-center justify-center gap-x-3 ">
												<UtensilsIcon></UtensilsIcon> <p>Start Lunch</p>
											</div>
										</SelectItem>
										<SelectItem value="Lunch-Out">
											<div className="flex items-center justify-center gap-x-3">
												<UtensilsCrossedIcon></UtensilsCrossedIcon>
												<p>End Lunch</p>
											</div>
										</SelectItem>
										<SelectItem value="Clock-Out">
											<div className="flex items-center justify-center gap-x-3">
												<AlarmClockMinusIcon></AlarmClockMinusIcon>
												<p>Clock Out</p>
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							{/* <FormMessage /> */}
						</FormItem>
					)}
				/>
				<Button type="submit">Start</Button>

				<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={runYourMother}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</form>
		</Form>
	);
}
