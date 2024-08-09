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
