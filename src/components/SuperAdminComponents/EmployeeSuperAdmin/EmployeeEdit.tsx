// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

// import { Toaster } from "@/components/ui/sonner";
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

// shad ui
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/components/ui/dialog';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lucide icons
import { User, Lock } from 'lucide-react';

// TanStack Query
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';

// schema for the form
const formSchema = z
	.object({
		username: z
			.string()
			.min(8, { message: 'Username must be at least 8 characters.' })
			.optional(),
		firstName: z
			.string()
			.min(2, { message: 'First name must be at least 2 characters.' })
			.optional(),
		lastName: z
			.string()
			.min(2, { message: 'Last name must be at least 2 characters.' })
			.optional(),
		middleName: z.string().optional(),
		password: z
			.string()
			.optional()
			.refine((val) => (val ?? '') === '' || (val ?? '').length >= 8, {
				message: 'Password must be at least 8 characters.',
			}),
		confirmPassword: z
			.string()
			.optional()
			.refine((val) => (val ?? '') === '' || (val ?? '').length >= 8, {
				message: 'Confirm password must be at least 8 characters.',
			}),
		accessLevel: z
			.enum(['TEAM_LEADER', 'EMPLOYEE', 'ADMIN'], {
				required_error: 'Access level is required.',
			})
			.optional(), // Added access level field
	})
	.refine(
		(data) =>
			data.password === data.confirmPassword ||
			data.password === '' ||
			data.confirmPassword === '',
		{
			message: "Passwords don't match",
			path: ['confirmPassword'],
		}
	);

export default function EmployeeEdit({
	onSubmit,
	isOpen,
	onClose,
	employee,
}: {
	onSubmit: (values: any) => void;
	isOpen: boolean;
	onClose: () => void;
	employee: any;
}) {
	console.log('Employee ID:', employee.id);

	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: employee.username,
			firstName: employee.firstName,
			lastName: employee.lastName,
			middleName: employee.middleName || 'N/A', // Handle optional middle name
			password: '',
			confirmPassword: '',
			accessLevel: employee.accessLevel || 'EMPLOYEE', // Default access level
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		const updatedFields: any = {};
		if (values.username) updatedFields.username = values.username;
		if (values.firstName) updatedFields.firstName = values.firstName;
		if (values.lastName) updatedFields.lastName = values.lastName;
		updatedFields.middleName = values.middleName || 'N/A'; // Handle optional middle name
		if (values.password) updatedFields.passwordCredentials = values.password;
		if (values.accessLevel) updatedFields.accessLevel = values.accessLevel; // Handle access level
	
		try {
			const response = await axiosInstance.put(
				`/api/employee/${employee.id}`,
				{
					...updatedFields,
					isActive: employee.isActive, // Preserve the current isActive status
				}
			);
	
			if (response.status === 200) {
				toast.success(`Successfully edited ${employee.firstName} ${employee.lastName}`);
				onSubmit(response.data); // Call the onSubmit callback
				queryClient.invalidateQueries({ queryKey: ['employees'] }); // Invalidate the employee query
				handleClose(); // Close the dialog
			}
		} catch (error) {
			// Handle specific error cases
			if ((error as any).response && (error as any).response.status === 400) {
				toast.error('Invalid employee ID.');
			} else {
				toast.error('Failed to update the employee. Please try again.');
			}
			console.error('Error editing the employee:', error);
	
			// Keep the dialog open and reset form state if there's an error
			form.reset(form.getValues()); // Reset the form to the current values
		}
	}
	
	function handleClose() {
		form.reset();
		onClose();
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-w-2xl mx-auto">
				{' '}
				{/* Adjusted width */}
				<DialogHeader>
					<DialogTitle>Edit Employee</DialogTitle>
					<DialogDescription>
						Update the employee details below.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-8"
					>
						<Tabs defaultValue="identity" className="w-full">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="identity">
									<User className="mr-2 h-4 w-4" />
									Identity Information
								</TabsTrigger>
								<TabsTrigger value="credentials">
									<Lock className="mr-2 h-4 w-4" />
									Account Credentials & Access Level
								</TabsTrigger>
							</TabsList>
							<TabsContent value="identity">
								<Card>
									<CardHeader>
										<CardTitle>Identity Information</CardTitle>
										<CardDescription>
											Fill out the identity information for the employee.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<FormField
												control={form.control}
												name="username"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Username</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="lastName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Last Name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="firstName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="middleName"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Middle Name</FormLabel>
														<FormControl>
															<Input {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="credentials">
								<Card>
									<CardHeader>
										<CardTitle>Account Credentials & Access Level</CardTitle>
										<CardDescription>
											Set the account credentials and access level for the
											employee.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<FormField
												control={form.control}
												name="password"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Password</FormLabel>
														<FormControl>
															<Input type="password" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="confirmPassword"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Confirm Password</FormLabel>
														<FormControl>
															<Input type="password" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
											<FormField
												control={form.control}
												name="accessLevel"
												render={() => (
													<FormItem>
														<FormLabel>Access Level</FormLabel>
														<FormControl>
															<Controller
																control={form.control}
																name="accessLevel"
																render={({ field }) => (
																	<Select
																		onValueChange={field.onChange}
																		value={field.value}
																	>
																		<SelectTrigger>
																			<SelectValue placeholder="Select Access Level" />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="EMPLOYEE">
																				Employee
																			</SelectItem>
																			<SelectItem value="TEAM_LEADER">
																				Team Leader
																			</SelectItem>
																			<SelectItem value="ADMIN">
																				Admin
																			</SelectItem>
																		</SelectContent>
																	</Select>
																)}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
						<DialogFooter>
							<Button type="submit" className="dark:text-white">
								Update
							</Button>
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
				<Toaster />
			</DialogContent>
		</Dialog>
	);
}
