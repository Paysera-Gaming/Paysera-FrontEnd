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

						<br></br>

						<span className='text-bold'>Schedule Information</span>
						<br></br>

						<span>Fixed: Clock in and out at specified times.</span>
						<br></br>

						<span>Flexible: Clock in between 6 AM and 10 AM.</span>
						<br></br>

						<span>Super Flexible: As long as the employee renders 8 hours within the day.</span>

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
