import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';

import ToasterSwitch from '@/lib/timeToasterUtils';

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

// import { toast } from 'sonner';

interface ChildProps {
	updateParentState: (newValue: string) => void;
}

export default function TimeForm({ updateParentState }: ChildProps) {
	const [isOpen, setIsOpen] = useState(false);
	const timeValues = [
		'Time-In',
		'Start-Lunch',
		'End-Lunch',
		'Time-Out',
	] as const;

	const formSchema = z.object({
		TimeType: z.enum(timeValues),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	// values: z.infer<typeof formSchema>
	function onSubmit() {
		setIsOpen(true);
	}

	function runYourMother() {
		const formValues = form.getValues('TimeType');
		updateParentState(formValues);
		// toast(formValues);

		ToasterSwitch('clock-in', formValues);
	}

	//this react component will require a parent function
	// said parent function will run as prop for this child component
	// the child component will run the prop after submitting the form
	// on the submit form, i will send a time stamp to the database
	// all post and update request will be sent in this component only
	// i need a parent function to start the time

	// dear lue use zod to handle errors for the form catching

	return (
		<Form {...form}>
			<form
				className="flex items-start justify-center gap-x-3 "
				onSubmit={form.handleSubmit(onSubmit)}
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
										<SelectItem value="Time-In">
											<div className="flex items-center justify-center gap-x-3 ">
												<AlarmCheckIcon></AlarmCheckIcon> <p>Time In</p>
											</div>
										</SelectItem>
										<SelectItem value="Start-Lunch">
											<div className="flex items-center justify-center gap-x-3 ">
												<UtensilsIcon></UtensilsIcon> <p>Start Lunch</p>
											</div>
										</SelectItem>
										<SelectItem value="End-Lunch">
											<div className="flex items-center justify-center gap-x-3">
												<UtensilsCrossedIcon></UtensilsCrossedIcon>
												<p>End Lunch</p>
											</div>
										</SelectItem>
										<SelectItem value="Time-Out">
											<div className="flex items-center justify-center gap-x-3">
												<AlarmClockMinusIcon></AlarmClockMinusIcon>
												<p>Time Out</p>
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>

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
