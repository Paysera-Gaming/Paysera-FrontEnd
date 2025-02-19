import { logout } from '@/api/LoginAPI';
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
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// logout
import { LogOut } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// function TimeIn(){}

// function TimeOut(){}

// function lunchBreak(){}

export default function LogOutButton() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const mutateLogout = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.removeQueries();
			useUserStore.getState().clearUser();
			localStorage.clear();
			document.cookie.split(';').forEach((c) => {
				c = c.trim();
				document.cookie =
					c.substring(0, c.indexOf('=')) +
					'=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
			});
			navigate('/login');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	function logOutUser() {
		mutateLogout.mutate();
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant={'ghost'}
					className=" w-[230px] text-nowrap whitespace-nowrap p-2 gap-5 hover:bg-red-200 flex justify-start items-center border-destructive transition-colors ease-in-out hover:text-destructive text-destructive"
				>
					<LogOut></LogOut>
					<p className="text-transparent group-hover:text-destructive">
						Logout
					</p>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
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
