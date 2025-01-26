import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getHolidays } from '@/api/CommonsAPI';
import { Skeleton } from '../ui/skeleton';
import { ScrollArea } from '../ui/scroll-area';

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
export default function HolidayList() {
	// fetch the holidays here
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: ['holidayQuery'],
		queryFn: getHolidays,
	});

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
		const list = data.reverse().map((day, index) => (
			<li key={index}>
				{getMonthNumberFromName(day.month.toLowerCase())}/{addZero(day.day)} -{' '}
				{day.name}
			</li>
		));

		// const list = <>LE LIST</>;

		return (
			<Card className="p-2 2xl:p-5 row-span-6">
				<CardHeader className="p-0">
					<CardTitle className="text-base 2xl:text-lg">
						Upcoming Holidays
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0 pt-1">
					<ScrollArea className="h-[350px] 2xl:h-[600px]">
						<ul className="flex flex-col-reverse list-disc list-inside text-sm 2xl:text-base">
							{list}
						</ul>
					</ScrollArea>
				</CardContent>
			</Card>
		);
	}
}
