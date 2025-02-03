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

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	getAllSchedulesInDepartment,
	TDepartmentSchedules,
} from '@/api/ScheduleAPI';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addEmployeeInDepartment } from '@/api/EmployeeAPI';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/userStore';

const formSchemaAddEmployee = z.object({
	username: z.string(),
	role: z.string(),
});

function UseEmployeeListItem() {}

function UseRoleListItem() {
	const queryClient = useQueryClient();
	const cachedData = queryClient.getQueryData<TDepartmentSchedules[]>([
		'Schedule',
	]);

	const { data, isLoading } = useQuery({
		queryKey: ['Schedule'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;
			if (departmentId !== undefined) {
				return getAllSchedulesInDepartment(departmentId);
			} else {
				throw new Error('No Department Id Found');
			}
		},
		initialData: cachedData,
	});

	if (isLoading) {
		return <p>loading</p>;
	}

	return (
		data?.map((item, index) => (
			<SelectItem key={index} value={item.role}>
				{item.role}
			</SelectItem>
		)) || <p>No Roles Found</p>
	);
}

export default function AddEmployee() {
	const [openAlert, setAlert] = useState<boolean>(false);
	// form schema
	const form = useForm<z.infer<typeof formSchemaAddEmployee>>({
		resolver: zodResolver(formSchemaAddEmployee),
		defaultValues: {
			username: undefined,
			role: '',
		},
	});
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return addEmployeeInDepartment(
					form.getValues(),
					departmentId.toString()
				);
			} else {
				toast.error('No Department Id Found');
				throw new Error('No Department Id Found');
			}
		},
		onError: (error) => {
			console.error(error);
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['EmployeesInfo'] });

			toast.success('Employee Added!');
		},
		mutationKey: ['EmployeeInfo'],
	});

	//  submit handler do your magic here
	function onSubmit() {
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
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Insert Employee Username</FormLabel>
									<FormControl>
										<Input placeholder="Enter Employee username" {...field} />
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

									<Select
										onValueChange={(value) => field.onChange(parseInt(value))}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a department role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<UseRoleListItem></UseRoleListItem>
										</SelectContent>
									</Select>
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
