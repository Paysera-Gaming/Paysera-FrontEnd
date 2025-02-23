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
import '../../index.css';

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
					className="p-0 group-hover:px-2 transition-all ease-in-out  group/logout  border-destructive mb-2 "
				>
					<div className="rounded-l h-10 w-16 group-hover:w-[calc(4rem_-_0.5rem)] m flex items-center justify-center group-hover/logout:bg-red-200 transition-all ease-in-out group-hover/logout:text-destructive text-destructive">
						<LogOut></LogOut>
					</div>
					<div className="rounded-r h-10 w-44 group-hover:w-[calc(11rem_-_0.5rem)] flex items-center justify-start group-hover/logout:bg-red-200 transition-all ease-in-out group-hover/logout:text-destructive">
						<p className="text-destructive text-lg">Logout</p>
					</div>
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
