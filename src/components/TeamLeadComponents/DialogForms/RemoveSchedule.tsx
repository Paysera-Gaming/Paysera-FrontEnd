import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState, useContext } from 'react';
import { ScheduleContext } from '@/components/DataTable/ScheduleColumn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSchedule } from '@/api/ScheduleAPI';
import { toast } from 'sonner';

export default function RemoveScheduleDialog() {
	const [openWarn, setWarn] = useState<boolean>(false);
	const ScheduleSub = useContext(ScheduleContext);
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: () => {
			if (ScheduleSub?.id !== undefined) {
				return deleteSchedule(ScheduleSub.scheduleId);
			}
			throw new Error('Schedule ID is undefined');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['Schedule'] });
			toast.success('Schedule has been removed!');
		},
		onError: (error) => {
			console.error(error);
		},
	});

	function submitDelete() {
		mutation.mutate();
		setWarn(false);
	}

	return (
		<AlertDialog open={openWarn} onOpenChange={setWarn}>
			<div
				className="p-2 w-full text-sm text-destructive hover:bg-secondary cursor-pointer select-none "
				onClick={() => {
					setWarn(true);
				}}
			>
				<p>Remove Employee</p>
			</div>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will remove the schedule
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={submitDelete}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
