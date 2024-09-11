import React, { forwardRef, useState } from 'react';
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

const RemoveDialog = forwardRef<HTMLDivElement>((props, ref) => {
	const [openWarn, setWarn] = useState<boolean>(false);

	return (
		<AlertDialog open={openWarn} onOpenChange={setWarn}>
			<div
				ref={ref}
				className="p-2 w-full text-sm text-destructive hover:bg-secondary cursor-pointer select-none"
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
						This action cannot be undone. This will remove the employee from the
						department.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
});

export default RemoveDialog;
