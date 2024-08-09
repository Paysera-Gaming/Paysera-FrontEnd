// react router
import { useNavigate } from 'react-router-dom';

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// shad ui
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// schema for the form
const formSchema = z.object({
	username: z
		.string()
		.min(2, {
			message: 'Username must be at least 2 characters.',
		})
		.max(50, { message: 'max character reached' }),
	password: z
		.string()
		.min(1, { message: 'Password must be filled' })
		.max(50, { message: 'max character reached.' }),
});

export default function LoginForm() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { username: '' },
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// submit your shit here
		if (values.username && values.password) {
			return navigate('/employee');
		} else {
			alert('Wrong password');
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Employee ID</FormLabel>
							<FormControl>
								<Input placeholder="Employee" {...field} />
							</FormControl>
							<FormDescription>Insert your Employee ID here.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Employee Password</FormLabel>
							<FormControl>
								<Input placeholder="password" type="password" {...field} />
							</FormControl>
							<FormDescription>Insert your password here.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
}
