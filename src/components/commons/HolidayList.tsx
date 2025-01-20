import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getHolidays } from '@/api/CommonsAPI';
import { Skeleton } from '../ui/skeleton';

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
					<CardTitle className="text-base lg:text-lg xl:text-2xl  ">
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
		const list = data.map((day, index) => (
			<li key={index}>
				{day.month}/{day.day} - {day.name}
			</li>
		));

		// const list = <>LE LIST</>;

		return (
			<Card className="row-span-6">
				<CardHeader>
					<CardTitle className="text-base lg:text-lg xl:text-2xl  ">
						Upcoming Holidays
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="list-disc list-inside">{list}</ul>
				</CardContent>
			</Card>
		);
	}
}
