import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import LoginForm from '@/components/LoginPageComponents/LoginForm';
import { useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import { useNavigate } from 'react-router-dom';

const routeMaps = new Map([
	['EMPLOYEE', '/employee/dashboard'],
	['TEAM_LEADER', '/teamlead/dashboard'],
	['ADMIN', '/superadmin/dashboard'],
]);

export default function LoginPage() {
	const navigate = useNavigate();
	// this useEffect checks if the user is already logged in
	// if so then they will be redirected to their respective dashboard
	useEffect(() => {
		// check first if there is already permission to send notifs
		if (Notification.permission != 'granted') {
			Notification.requestPermission();
		}

		if (useUserStore.getState().user != undefined) {
			const userRoute = useUserStore.getState().user?.accessLevel;
			console.log('User is logged in');
			const route = routeMaps.get(userRoute || '') || '/defaultRoute';
			navigate(route);
		}
	});

	return (
		<main className=" h-full flex items-center justify-center">
			<Card className="w-[360px]">
				<CardHeader>
					<CardTitle>Paysera</CardTitle>
					<CardDescription>Login</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm></LoginForm>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-muted-foreground">Paysera&reg; 2024</p>
				</CardFooter>
			</Card>
		</main>
	);
}
