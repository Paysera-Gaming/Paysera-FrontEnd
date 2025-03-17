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

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUserStore } from '@/stores/userStore.ts';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { Info, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import { Textarea } from '../ui/textarea';
import { requestLeave } from '@/api/LeaveAPI';

// this should insert what type of leave this is
// this should get the start and end of the date of this leave
// this should get the reasons of leaving

const formSchema = z.object({
	startDate: z.string({
		required_error: 'Start date is required',
	}),
	endDate: z.string({
		required_error: 'End date is required',
	}),
	reason: z.string().optional(),
	type: z.string({
		required_error: 'Leave type is required',
	}),
});

export function RequestLeaveButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const user = useUserStore((state) => state.user);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			startDate: undefined,
			endDate: undefined,
		},
	});

	const mutation = useMutation({
		mutationFn: (data: z.infer<typeof formSchema>) => {
			if (user == undefined) {
				console.log('Employee ID is undefined at check');
				throw new Error('Employee ID is undefined');
			}

			// Perform the mutation logic here
			return requestLeave({
				startDate: data.startDate,
				endDate: data.endDate,
				reason: data.reason || '',
				type: data.type,
				employeeID: user.id,
			});
		},
		onSuccess: () => {
			toast.success('Request for Leave has successfully submitted');
			setIsOpen(false);
		},
		onSettled: () => {
			setIsLoading(false);
		},
	});

	function handleSubmit(data: z.infer<typeof formSchema>) {
		console.log(data);

		setIsLoading(true);
		mutation.mutate(data);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-orange-500 hover:bg-orange-500 text-base">
					Request Leave
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
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
							name="type"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center justify-start gap-2">
										<FormLabel>Leave Type</FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="w-4 h-4"></Info>
												</TooltipTrigger>
												<TooltipContent>
													This dictates the type of leave you'll be sending
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
											<SelectItem value="Medical_Leave">
												Medical Leave
											</SelectItem>
											<SelectItem value="Maternal_Leave">
												Maternal Leave
											</SelectItem>
											<SelectItem value="Sick_Leave">Sick Leave</SelectItem>
											<SelectItem value="Paternity_Leave">
												Paternity Leave
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
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

						<FormField
							control={form.control}
							name="reason"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reason</FormLabel>
									<FormDescription>
										Optional: Add reason for the leave
									</FormDescription>
									<FormControl>
										<Textarea
											placeholder="Reason"
											className="resize-none"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isLoading}>
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
