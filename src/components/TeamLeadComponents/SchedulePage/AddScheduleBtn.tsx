import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
	AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';
import { useState } from 'react';
import ScheduleForm from './ScheduleForm';

export default function AddScheduleBtn() {
	const [openAlert, setAlert] = useState<boolean>(false);
	// form schema

	return (
		<AlertDialog open={openAlert} onOpenChange={setAlert}>
			<AlertDialogTrigger>
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

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction type="submit">
						<Button
							variant={'default'}
							onClick={() => {
								setAlert(false);
							}}
						>
							Submit
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
