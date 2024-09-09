import {
	ScheduleContext,
	TSchedule,
} from '@/components/DataTable/ScheduleColumn';
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
import { useContext, useState } from 'react';
import ScheduleForm from '../SchedulePage/ScheduleForm';

export default function EditSchedule() {
	const [isOpen, setOpen] = useState<boolean>(false);

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<div
				className="p-2 w-full text-sm hover:bg-secondary select-none "
				onClick={() => {
					setOpen(true);
				}}
			>
				<p>Edit Schedule</p>
			</div>
			<DialogContent className="">
				<DialogHeader>
					<DialogTitle>Edit Schedule</DialogTitle>
					<DialogDescription>
						Make changes to schedule. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<ScheduleForm updateParentState={setOpen}></ScheduleForm>
			</DialogContent>
		</Dialog>
	);
}
