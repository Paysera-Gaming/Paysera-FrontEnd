import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// button
import { Button } from '@/components/ui/button';
// logout
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LogOutButton() {
	const navigate = useNavigate();

	function logOutUser() {
		navigate('/login');
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={'outline'} className="gap-2 w-full">
					<LogOut></LogOut> <p>Logout</p>{' '}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure you want to logout?
					</AlertDialogTitle>
					<AlertDialogDescription>
						After loging out you have to login again.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={logOutUser}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
