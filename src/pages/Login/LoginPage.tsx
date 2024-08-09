import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import LoginForm from '@/components/LoginPageComponents/LoginForm';

export default function LoginPage() {
	return (
		<Card className="w-[360px]">
			<CardHeader>
				<CardTitle>Paysera</CardTitle>
				<CardDescription>Login</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm></LoginForm>
			</CardContent>
			<CardFooter>
				<p className="text-sm text-muted-foreground">&copy;Paysera 2024</p>
			</CardFooter>
		</Card>
	);
}
