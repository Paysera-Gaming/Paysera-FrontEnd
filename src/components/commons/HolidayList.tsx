import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getHolidays, IHoliday } from '@/api/CommonsAPI';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';
import { addMonths } from 'date-fns';
import { useWebSocket } from '@/hooks/useWebSocket';

function addZero(digit: number) {
	if (digit < 10 && digit > 0) {
		return '0' + digit;
	} else {
		return digit;
	}
}

function getMonthNumberFromName(monthName: string) {
	return addZero(new Date(`${monthName} 1, 2022`).getMonth() + 1);
}

function renderList(holidays: IHoliday[], month: number) {
	const filteredList = holidays.filter((holiday) => {
		if (getMonthNumberFromName(holiday.month) == month) {
			return holiday;
		}
	});

	const list = filteredList.reverse().map((day, index) => (
		<li key={index}>
			{addZero(day.day)} - {day.name}
		</li>
	));

	return list;
}

export default function HolidayList() {
	// Fetch the holidays here
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['holidayQuery'],
		queryFn: getHolidays,
	});

	const date = new Date();
	const nextMonth = addMonths(date, 1);

	const queryClient = useQueryClient();
	useWebSocket('holidays', () => {
		// this will invalidate old queries and get new queries
		queryClient.invalidateQueries({ queryKey: ['holidayQuery'] });
	});

	if (isLoading) {
		return <Skeleton className=""></Skeleton>;
	}

	if (isError) {
		return (
			<Card className="">
				<CardHeader>
					<CardTitle className="">Upcoming Holidays</CardTitle>
				</CardHeader>
				<CardContent>
					<p>FAILED TO FETCH HOLIDAYS - API might be offline.</p>
				</CardContent>
			</Card>
		);
	}

	if (isSuccess) {
		// Check if data is an array before proceeding
		if (!Array.isArray(data)) {
			return (
				<Card className="h-full">
					<CardHeader>
						<CardTitle>Upcoming Holidays</CardTitle>
					</CardHeader>
					<CardContent>
						<p>No holidays data available.</p>
					</CardContent>
				</Card>
			);
		}

		const currentMonthList = renderList(data, new Date().getMonth() + 1);
		const nextMonthList = renderList(data, new Date().getMonth() + 2);

		return (
			<Card className="h-full">
				<CardHeader className="">
					<CardTitle className="">
						Upcoming Holidays
						<br />
						{`(${date.toLocaleString('default', { month: 'long' })})`}
					</CardTitle>
				</CardHeader>
				<CardContent className="">
					<ScrollArea className="h-[300px] 2xl:h-[500px]">
						<ul className="flex flex-col list-disc list-inside">
							{currentMonthList.length !== 0 ? currentMonthList : 'No Holidays'}
							<h3 className="  font-semibold scroll-m-20 tracking-tight py-1">
								Next Month{' '}
								{`(${nextMonth.toLocaleString('default', { month: 'long' })})`}
							</h3>
							{nextMonthList.length !== 0 ? nextMonthList : 'No Holidays'}
						</ul>
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}
}
