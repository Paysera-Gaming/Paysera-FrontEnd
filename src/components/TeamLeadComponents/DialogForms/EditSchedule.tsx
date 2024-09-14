import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import ScheduleForm from '../SchedulePage/ScheduleForm';
import { updateSchedule } from '@/api/ScheduleAPI';

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
				<ScheduleForm
					isPost={false}
					fetchRequest={updateSchedule}
					updateParentState={setOpen}
				></ScheduleForm>
			</DialogContent>
		</Dialog>
	);
}
