import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getHolidays, IHoliday } from '@/api/CommonsAPI';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';
import { addMonths } from 'date-fns';
import { Badge } from '../ui/badge';
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

// upcoming done ongoing

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
	// fetch the holidays here
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['holidayQuery'],
		queryFn: getHolidays,
	});
	const date = new Date();
	const nextMonth = addMonths(date, 1);
	if (isLoading) {
		return <Skeleton className="row-span-6"></Skeleton>;
	}
	if (isError) {
		return (
			<Card className="row-span-6">
				<CardHeader>
					<CardTitle className="text-base 2xl:text-lg">
						Upcoming Holidays
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p>FAILED TO CATCH HOLIDAYS</p>
				</CardContent>
			</Card>
		);
	}
	if (isSuccess) {
		//  list all dates
		// sort dates
		// filter dates that are relevant only to the current month and day
		const currentMonthList = renderList(data, new Date().getMonth() + 1);
		const nextMonthList = renderList(data, new Date().getMonth() + 2);

		// const list = <>LE LIST</>;

		return (
			<Card className="p-2 2xl:p-5 row-span-6">
				<CardHeader className="p-0">
					<CardTitle className="text-base 2xl:text-lg">
						Upcoming Holidays{' '}
						{`(${date.toLocaleString('default', { month: 'long' })})`}
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0 pt-1">
					<ScrollArea className="h-[350px] 2xl:h-[600px]">
						<ul className="flex flex-col list-disc list-inside text-sm 2xl:text-base">
							{currentMonthList}

							<h3 className="text-base 2xl:text-lg font-semibold scroll-m-20 tracking-tight py-1">
								Next Month{' '}
								{`(${nextMonth.toLocaleString('default', { month: 'long' })})`}
							</h3>

							{nextMonthList}
						</ul>
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}
}
