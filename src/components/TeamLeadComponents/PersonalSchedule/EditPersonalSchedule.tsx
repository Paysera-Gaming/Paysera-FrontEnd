import PersonalScheduleForm from './PersonalScheduleForm';
import { putPersonalSchedule } from '@/api/PersonalScheduleAPI';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
export default function EditPersonalSchedule() {
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
				<PersonalScheduleForm
					isPost={false}
					fetchRequest={putPersonalSchedule}
					updateParentState={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
}

// EditPersonalSchedule
