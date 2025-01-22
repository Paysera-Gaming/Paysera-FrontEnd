import { TDepartmentSchedules } from '@/api/ScheduleAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

function ScheduleList({
	schedule,
}: {
	schedule: TDepartmentSchedules | undefined;
}) {
	if (schedule?.Schedule != undefined) {
		return (
			<ul>
				<li>Schedule Type: {schedule.name}</li>
				<li>Schedule Info: {schedule.Schedule.scheduleType}</li>
				<li>
					Schedule Block:{' '}
					{schedule.Schedule.startTime + ' - ' + schedule.Schedule.endTime}
				</li>
				<li>
					Personal Schedule Block:{' '}
					{schedule.Schedule.startTime + ' - ' + schedule.Schedule.endTime}
				</li>
				<li>Last Schedule Update: {schedule.Schedule.updatedAt}</li>
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
		<Card className={className}>
			<CardHeader className="flex-row p-3 2xl:p-5 items-center justify-between w-full pb-3 ">
				<CardTitle className="text-base lg:text-lg xl:text-2xl   ">
					Schedule Info
				</CardTitle>
				<Calendar></Calendar>
			</CardHeader>
			<CardContent className=" p-3 pt-0 pb-1 2xl:p-5">
				<ScheduleList schedule={getUserInfo}></ScheduleList>
			</CardContent>
		</Card>
	);
}
