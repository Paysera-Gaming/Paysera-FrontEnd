// react router

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

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

// schema for the form
const formSchema = z
	.object({
		username: z
			.string()
			.min(8, { message: 'Username must be at least 8 characters.' }), // Added username field
		firstName: z
			.string()
			.min(2, { message: 'First name must be at least 2 characters.' }),
		lastName: z
			.string()
			.min(2, { message: 'Last name must be at least 2 characters.' }),
		middleName: z.string().optional(),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters.' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Confirm password must be at least 6 characters.' }),
		accessLevel: z.enum(['TEAM_LEADER', 'EMPLOYEE'], {
			required_error: 'Access level is required.',
		}), // Added access level field
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export default function EmployeeForm({
	onSubmit,
	isOpen,
	onClose,
}: {
	onSubmit: (values: any) => void;
	isOpen: boolean;
	onClose: () => void;
}) {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '', // Added default value for username
			firstName: '',
			lastName: '',
			middleName: '', // Default value for middle name
			password: '',
			confirmPassword: '',
			accessLevel: 'EMPLOYEE', // Default access level
		},
	});

	async function handleSubmit(values: z.infer<typeof formSchema>) {
		if (
			values.username &&
			values.firstName &&
			values.lastName &&
			values.password &&
			values.confirmPassword &&
			values.accessLevel
		) {
			try {
				const response = await axios.post(
					import.meta.env.VITE_BASE_API + '/api/employee',
					{
						username: values.username, // Added username to the payload
						firstName: values.firstName,
						lastName: values.lastName,
						middleName: values.middleName || 'N/A', // Set middle name to "N/A" if not provided
						passwordCredentials: values.password,
						accessLevel: values.accessLevel, // Added access level to the payload
						isActive: false, // Set isActive to false by default
					}
				);
				toast.success('Form submitted successfully!');
				onSubmit(response.data);
				queryClient.invalidateQueries({ queryKey: ['employees'] }); // Invalidate the employee query
				handleClose();
			} catch (error) {
				toast.error('Error submitting the form.');
				console.error('Error submitting the form:', error);
			}
		} else {
			toast.error('Please fill out all required fields.');
		}
	}

	function handleClose() {
		form.reset({
			username: '',
			firstName: '',
			lastName: '',
			middleName: '', // Reset middle name to default
			password: '',
			confirmPassword: '',
			accessLevel: 'EMPLOYEE', // Reset access level to default
		});
		onClose();
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="max-w-2xl mx-auto">
				{' '}
				{/* Adjusted width */}
				<DialogHeader>
					<DialogTitle>Add Employee</DialogTitle>
					<DialogDescription>
						Fill out the form below to add a new employee.
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
								Submit
							</Button>
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
