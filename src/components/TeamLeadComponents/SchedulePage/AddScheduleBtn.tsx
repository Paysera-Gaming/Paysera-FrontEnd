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
						You are now adding a schedule into your department
					</AlertDialogDescription>
				</AlertDialogHeader>
				{/* form here */}

				<ScheduleForm></ScheduleForm>
			</AlertDialogContent>
		</AlertDialog>
	);
}
