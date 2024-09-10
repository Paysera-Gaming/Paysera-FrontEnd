import { TEmployee } from '@/components/DataTable/DataColumns';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployee } from '@/api/EmployeeAPI';

export default function EditRole({
	employeeInfo,
}: {
	employeeInfo: TEmployee;
}) {
	// dear lue please add a form hook and zod edit in here ty!
	const [isOpen, setOpen] = useState<boolean>(false);
	const mutation = useMutation({
		mutationFn: () => {
			return updateEmployee(employeeInfo);
		},
		onError: () => {
			toast.error('An error happened!');
		},
		onSuccess: () => {
			toast.success('Employee Added!');
		},
	});

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<div
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
						/>
					</div>
				</div>
				<DialogFooter>
					<DialogTrigger>
						<Button type="submit">Save changes</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
