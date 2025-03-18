// react router
import { useNavigate } from 'react-router-dom';

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from 'sonner';

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
import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/LoginAPI';
import { useUserStore } from '@/stores/userStore';
import { useState } from 'react';
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
	const [disableSend, setDisable] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { username: '', password: '' },
	});
	const mutatationLogIn = useMutation({
		mutationFn: () => {
			return login(form.getValues().username, form.getValues().password);
		},

		onSuccess: (data) => {
			toast.success('Login Success');

			useUserStore.getState().setUser(data);
			setTimeout(() => {
				switch (useUserStore.getState().user?.accessLevel) {
					case 'ADMIN':
						navigate('/superadmin/dashboard');
						break;
					case 'TEAM_LEADER':
						navigate('/teamlead/dashboard');
						break;
					case 'EMPLOYEE':
						navigate('/employee/dashboard');
						break;
				}
			}, 500);
		},

		onError: () => {
			setDisable(false);
		},
	});

	function onSubmit() {
		setDisable(true);
		mutatationLogIn.mutate();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="Employee" {...field} />
							</FormControl>
							<FormDescription>Insert your Username here.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" type="password" {...field} />
							</FormControl>
							<FormDescription>Insert your Password here.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={disableSend} type="submit">
					Login
				</Button>
			</form>
		</Form>
	);
}
