import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
	AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';

const formSchema = z.object({
	userID: z
		.string()
		.min(5, { message: 'Minimum Characters must be atleast 5' })
		.max(8, { message: 'Maximum Characters are 8' }),
	role: z.string().min(5, { message: 'Minimum Charactus must be atleast 5' }),
});

export default function AddEmployee() {
	const [openAlert, setAlert] = useState<boolean>(false);
	// form schema
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userID: '',
		},
	});

	//  submit handler do your magic here
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.

		console.log(values.userID);
		setAlert(false);
	}

	return (
		<AlertDialog open={openAlert} onOpenChange={setAlert}>
			<AlertDialogTrigger>
				<Button variant={'default'} className="mr-3">
					Add Employee
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adding Employee</AlertDialogTitle>
					<AlertDialogDescription>
						You are now adding an employee into your department
					</AlertDialogDescription>
				</AlertDialogHeader>
				{/* form here */}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="userID"
							render={({ field }) => (
								<FormItem>
									<FormLabel>EmployeeID</FormLabel>
									<FormControl>
										<Input placeholder="Enter Employee ID" {...field} />
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
									<FormLabel>Designated Role</FormLabel>
									<FormControl>
										<Input placeholder="Enter Role" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction type="submit">
						<Button variant={'default'} onClick={form.handleSubmit(onSubmit)}>
							Submit
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
