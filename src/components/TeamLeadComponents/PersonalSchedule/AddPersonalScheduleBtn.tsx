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
import PersonalScheduleForm from './PersonalScheduleForm';
import { postPersonalSchedule } from '@/api/PersonalScheduleAPI';

export default function AddPersonalScheduleBtn() {
	const [openAlert, setAlert] = useState<boolean>(false);

	return (
		<AlertDialog open={openAlert} onOpenChange={setAlert}>
			<AlertDialogTrigger asChild>
				<Button variant={'default'} className="mr-3">
					Add Personal Schedule
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Adding Personal Schedule</AlertDialogTitle>
					<AlertDialogDescription>
						You are now adding a personal Schedule
					</AlertDialogDescription>
				</AlertDialogHeader>
				{/* form here */}
				<PersonalScheduleForm
					isPost={true}
					fetchRequest={postPersonalSchedule}
					updateParentState={setAlert}
				/>
			</AlertDialogContent>
		</AlertDialog>
	);
}
