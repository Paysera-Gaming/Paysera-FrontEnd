import { forwardRef, useState } from 'react';
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
import { useUserStore } from '@/stores/userStore';
import { getUserInfo } from '@/api/LoginAPI';

const EditRole = forwardRef<HTMLDivElement, { employeeInfo: TEmployee }>(
	({ employeeInfo }, ref) => {
		const queryClient = useQueryClient();
		const [isOpen, setOpen] = useState<boolean>(false);
		const [roleInput, setRole] = useState<string>('');
		const mutation = useMutation({
			mutationFn: () => {
				employeeInfo.role = roleInput;
				return updateEmployee(employeeInfo);
			},

			onSuccess: () => {
				if (employeeInfo.id == useUserStore.getState().user?.id) {
					getUserInfo().then((data) => {
						console.log('this is the data', data);

						useUserStore.getState().setUser(data);
					});
					toast.success('Your role has been changed');
				}
				toast.success('The Role has been changed');
				queryClient.invalidateQueries({ queryKey: ['EmployeesInfo'] });
			},
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
