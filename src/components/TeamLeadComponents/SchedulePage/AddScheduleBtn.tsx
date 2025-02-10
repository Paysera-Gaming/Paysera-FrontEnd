import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import { createSchedule } from '@/api/ScheduleAPI';
// Adjust the import path as necessary

export default function AddScheduleBtn() {
	const [openAlert, setAlert] = useState<boolean>(false);
	// form schema

	return (
		<AlertDialog open={openAlert} onOpenChange={setAlert}>
			<AlertDialogTrigger asChild>
				<Button variant={'default'} className="mr-3">
					Add Schedule
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adding Schedule</AlertDialogTitle>
					<AlertDialogDescription>
						<p>You are now adding a schedule into your department
						</p>
						<br></br>
						<ul>
							<h4 className='text-bold'>Schedule Information</h4>
							<li>Fixed: Clock in and out at specified times.</li>
							<li>Flexible: Clock in between 6 AM and 10 AM.</li>
							<li>Super Flexible: As long as the employee renders 8 hours within the day.</li>
						</ul>
					</AlertDialogDescription>
				</AlertDialogHeader>
				{/* form here */}

				<ScheduleForm
					isPost={true}
					fetchRequest={createSchedule}
					updateParentState={setAlert}
				></ScheduleForm>
			</AlertDialogContent>
		</AlertDialog>
	);
}
