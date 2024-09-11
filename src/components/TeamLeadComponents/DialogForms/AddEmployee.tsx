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
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addEmployeeInDepartment } from '@/api/EmployeeAPI';
import { toast } from 'sonner';

export const formSchemaAddEmployee = z.object({
	id: z.coerce.number().gte(18, 'Must be 18 and above'),
	role: z.string().min(5, { message: 'Minimum Charactus must be atleast 5' }),
});

export default function AddEmployee() {
	const [openAlert, setAlert] = useState<boolean>(false);
	// form schema
	const form = useForm<z.infer<typeof formSchemaAddEmployee>>({
		resolver: zodResolver(formSchemaAddEmployee),
		defaultValues: {},
	});

	const mutation = useMutation({
		mutationFn: () => addEmployeeInDepartment(form.getValues(), '95'),
		onError: () => {
			toast.error(form.getValues().id + ' ' + form.getValues().role);
			// toast.error('An error happened!');
		},
		onSuccess: () => {
			toast.success('Employee Added!');
		},
	});

	//  submit handler do your magic here
	function onSubmit() {
		// Do something with the form values.
		mutation.mutate();
		setAlert(false);
	}

	return (
		<AlertDialog open={openAlert} onOpenChange={setAlert}>
			<AlertDialogTrigger asChild>
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
							name="id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>EmployeeID</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="Enter Employee id"
											{...field}
										/>
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
										<Input type="text" placeholder="Enter Role" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button
						type="submit"
						variant={'default'}
						onClick={form.handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
