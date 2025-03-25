import { forwardRef, useState } from 'react';
import { TEmployee } from '@/api/EmployeeAPI';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployee } from '@/api/EmployeeAPI';
import { useUserStore } from '@/stores/userStore';
import { getUserInfo } from '@/api/LoginAPI';
import {
	getAllSchedulesInDepartment,
	TDepartmentSchedules,
} from '@/api/ScheduleAPI';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
	SelectGroup,
} from '@/components/ui/select';

function UseRoleListItem() {
	const queryClient = useQueryClient();
	const cachedData = queryClient.getQueryData<TDepartmentSchedules[]>([
		'Schedule',
	]);

	const { data, isLoading } = useQuery({
		queryKey: ['Schedule'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;
			if (departmentId !== undefined) {
				return getAllSchedulesInDepartment(departmentId);
			} else {
				throw new Error('No Department Id Found');
			}
		},
		initialData: cachedData,
	});

	if (isLoading) {
		return <p>loading</p>;
	}

	return (
		<SelectGroup>
			<SelectLabel> Department Roles</SelectLabel>
			{data?.map((item, index) => (
				<SelectItem key={index} value={item.role}>
					{item.role}
				</SelectItem>
			)) || <p>No Roles Found</p>}
		</SelectGroup>
	);
}

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
							<Select
								onValueChange={(value) => setRole(value)}
								defaultValue={employeeInfo.role}
							>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Select a department role" />
								</SelectTrigger>

								<SelectContent>
									<UseRoleListItem></UseRoleListItem>
								</SelectContent>
							</Select>
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
