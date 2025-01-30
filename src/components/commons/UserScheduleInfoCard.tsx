import { TDepartmentSchedules } from '@/api/ScheduleAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

function dateToHours(date: string) {
	const translatedDate = new Date(date);
	return format(translatedDate, 'HH:mm');
}

function ScheduleList({
	schedule,
}: {
	schedule: TDepartmentSchedules | undefined;
}) {
	if (schedule?.Schedule != undefined) {
		return (
			<ul className="text-sm 2xl:text-base w-full">
				<li>Schedule Type: {schedule.Schedule.scheduleType}</li>
				<li>
					Schedule Info:{' '}
					{dateToHours(schedule.Schedule.startTime) +
						'-' +
						dateToHours(schedule.Schedule.endTime)}
				</li>
				<li>
					Personal Schedule Info: SOON
					{/* {schedule.Schedule.startTime + ' - ' + schedule.Schedule.endTime} */}
				</li>
			</ul>
		);
	} else {
		return <div>Currently No Schedule Assigned</div>;
	}
}

export default function UserScheduleInfoCard({
	className,
}: {
	className: string;
}) {
	const [getUserInfo, setUserInfo] = useState<TDepartmentSchedules | undefined>(
		undefined
	);
	useEffect(() => {
		if (useUserStore.getState()?.user?.schedule) {
			setUserInfo(useUserStore.getState()?.user?.schedule);
		} else {
			setUserInfo(undefined);
		}
	}, [getUserInfo]);

	return (
		<Card className={className + 'p-2 pt-0 2xl:p-5'}>
			<CardHeader className="flex flex-row p-0 items-end justify-between w-full ">
				<CardTitle className="text-base 2xl:text-lg">Schedule Info</CardTitle>
				<Calendar className="2xl:w-[1.25rem] 2xl:h-[1.25rem] h-[1.5rem] w-[1.5rem]"></Calendar>
			</CardHeader>
			<CardContent className="p-0">
				<ScheduleList schedule={getUserInfo}></ScheduleList>
			</CardContent>
		</Card>
	);
}
