import React, { forwardRef, useState } from 'react';
import { TEmployee } from '@/components/DataTable/DataColumns';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployee } from '@/api/EmployeeAPI';

const EditRole = forwardRef<HTMLDivElement, { employeeInfo: TEmployee }>(
	({ employeeInfo }, ref) => {
		// dear lue please add a form hook and zod edit in here ty!
		// const queryClient = useQueryClient();
		const [isOpen, setOpen] = useState<boolean>(false);
		const [roleInput, setRole] = useState<string>('');
		const mutation = useMutation({
			mutationFn: () => {
				employeeInfo.role = roleInput;
				return updateEmployee(employeeInfo);
			},
			onError: () => {
				toast.error('An error happened!');
			},
			onSuccess: () => {
				toast.success('The Role has been changed');
				// queryClient.invalidateQueries({ queryKey: ['EmployeeRole'] });
			},
			mutationKey: ['EmployeeRole'],
		});

		return (
			<Dialog open={isOpen} onOpenChange={setOpen}>
				<div
					ref={ref}
					className="p-2 w-full text-sm hover:bg-secondary select-none "
					onClick={() => {
						setOpen(true);
					}}
				>
					<p>Edit Role</p>
				</div>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Role</DialogTitle>
						<DialogDescription>
							Make changes to Employee's role here. Click save when you're done.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Role
							</Label>
							<Input
								placeholder={employeeInfo.role}
								id="name"
								className="col-span-3"
								onChange={(e) => {
									setRole(e.target.value);
								}}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							disabled={roleInput.length == 0}
							onClick={() => {
								setOpen(false);
								mutation.mutate();
							}}
							type="submit"
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
);

export default EditRole;
