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
import { ScrollArea } from '@/components/ui/scroll-area';

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

				<PersonalScheduleForm updateParentState={setAlert} isPost={false} />

				{/* 
				<ScheduleForm
					isPost={true}
					fetchRequest={createSchedule}
					updateParentState={setAlert}
				></ScheduleForm> */}
			</AlertDialogContent>
		</AlertDialog>
	);
}
