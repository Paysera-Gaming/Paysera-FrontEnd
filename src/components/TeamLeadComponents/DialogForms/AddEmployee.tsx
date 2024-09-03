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
	FormDescription,
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
const formSchema = z.object({
	userID: z
		.string()
		.min(5, { message: 'Minimum Characters must be atleast 5' })
		.max(8),
});

export default function AddEmployee() {
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
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant={'default'} className="mr-3">
					Add Employee
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adding User</AlertDialogTitle>
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
									<FormDescription>
										Please enter the employee id
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
					>
						<Button variant={'default'}>Submit</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
