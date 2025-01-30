import { deletePersonalSchedule } from '@/api/PersonalScheduleAPI';
import { PersonalScheduleContext } from '@/stores/context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
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
export default function RemovePersonalScheduleDialog() {
	const [openWarn, setWarn] = useState<boolean>(false);

	const personalScheduleContext = useContext(PersonalScheduleContext);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: () => {
			if (personalScheduleContext?.id) {
				return deletePersonalSchedule(personalScheduleContext.id);
			}
			throw new Error('PersonalSchedule ID is undefined');
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['PersonalSchedule'] });
			toast.success('Personal Schedule has been removed!');
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
				<p>Remove Schedule</p>
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
