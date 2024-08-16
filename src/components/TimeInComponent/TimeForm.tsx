import {
	AlarmCheckIcon,
	AlarmClockMinusIcon,
	UtensilsIcon,
	UtensilsCrossedIcon,
} from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '../ui/button';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
	SelectGroup,
} from '@/components/ui/select';

import { z } from 'zod';
import { useForm } from 'react-hook-form';

interface TimeProps {
	timeType: string;
	timeName: string;
	timeDescription: string;
	timeDialogue: string;
}

interface TimeList {
	selectionItems: string[];
}

function RenderIcon({ Icon }: { Icon: string }) {
	switch (Icon) {
		case 'Clock-In':
			return <AlarmCheckIcon></AlarmCheckIcon>;
			break;
		case 'Lunch':
			return <UtensilsIcon></UtensilsIcon>;
			break;
		case 'End-Lunch':
			return <UtensilsCrossedIcon></UtensilsCrossedIcon>;
			break;
		case 'Clock-Out':
			return <AlarmClockMinusIcon></AlarmClockMinusIcon>;
	}
}

function ClockInModal({
	timeDescription,
	timeDialogue,
}: {
	timeDescription: string;
	timeDialogue: string;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button>Start</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{timeDescription}</AlertDialogTitle>
					<AlertDialogDescription>{timeDialogue}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction type="submit">Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function RenderSelectionItems({ selectionItems }: TimeList) {
	const renderedList = selectionItems.map((time) => (
		<SelectItem value={time}>
			<div className="flex items-center justify-center gap-2">
				<RenderIcon Icon={time}></RenderIcon>
				<p>{time}</p>
			</div>
		</SelectItem>
	));

	return (
		<SelectGroup>
			<SelectLabel>Actions</SelectLabel>
			{renderedList}
		</SelectGroup>
	);
}

export default function TimeForm() {
	const timeTypes: string[] = ['Clock-In', 'Lunch', 'End-Lunch', 'Clock-Out'];

	const form = useForm();
	const formSchema = z.object({
		timeType: z.enum(['Clock In', 'Lunch', 'End Lunch', 'Clock Out']),
	});

	return (
		<div className="flex items-center justify-center gap-3">
			<Select>
				<SelectTrigger className="w-[150px]">
					<SelectValue
						placeholder={
							// ugly ass
							<div className="flex items-center justify-center gap-2">
								<AlarmCheckIcon size={20}></AlarmCheckIcon>
								<p>Clock In</p>
							</div>
						}
					/>
				</SelectTrigger>

				<SelectContent>
					<RenderSelectionItems
						selectionItems={timeTypes}
					></RenderSelectionItems>
				</SelectContent>
			</Select>

			<ClockInModal
				timeDescription="Joe"
				timeDialogue="Are you joe?"
			></ClockInModal>
		</div>
	);
}
