import React, { forwardRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { toast } from 'sonner';

type RemoveDialogProps = {
	deleteRequest: (employeeID: number, departmentId: number) => Promise<number>;
	employeeID: number;
	departmentId: number;
};

const RemoveDialog = forwardRef<HTMLDivElement, RemoveDialogProps>(
	({ deleteRequest, employeeID, departmentId }, ref) => {
		const [openWarn, setOpenWarn] = useState<boolean>(false);

		const queryClient = useQueryClient();

		const mutation = useMutation<number>({
			mutationFn: () => deleteRequest(employeeID, departmentId),
			onSuccess: () => {
				toast.success('Employee removed successfully');
				queryClient.invalidateQueries({ queryKey: ['EmployeesInfo'] });
			},
			onError: (data) => {
				console.log(data.message);

				toast.error('An error happened!');
			},
		});

		const handleOpenWarn = () => {
			setOpenWarn(true);
		};

		const handleCloseWarn = () => {
			setOpenWarn(false);
		};

		const handleContinue = () => {
			mutation.mutate();
			handleCloseWarn();
		};

		return (
			<>
				<div
					ref={ref}
					className="p-2 w-full text-sm text-destructive hover:bg-secondary cursor-pointer select-none"
					onClick={handleOpenWarn}
				>
					<p>Remove Employee</p>
				</div>

				<AlertDialog open={openWarn} onOpenChange={setOpenWarn}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will remove the employee from
								the department.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCloseWarn}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleContinue}>
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		);
	}
);

export default RemoveDialog;
