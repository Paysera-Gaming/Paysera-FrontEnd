import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

function formatDate(date: Date): string {
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
}

export interface ChildProps {
	updateParentState: (newValue: string) => void;
}

export function DatePicker({ updateParentState }: ChildProps) {
	const [date, setDate] = React.useState<Date>();

	const noDateSelected = date == undefined;

	return (
		<>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'w-[280px] justify-start text-left font-normal',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<Button
				onClick={() => {
					if (date != undefined) {
						updateParentState(formatDate(date));
					}
				}}
				disabled={noDateSelected}
				className="ml-4"
			>
				Search
			</Button>
		</>
	);
}
