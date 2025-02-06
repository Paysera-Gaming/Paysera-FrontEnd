import { TUserInfo } from '@/api/LoginAPI';
import { TPersonalSchedule } from '@/api/PersonalScheduleAPI';
import { TDepartmentSchedules } from '@/api/ScheduleAPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/stores/userStore';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';

function dateToHours(date: string) {
	const translatedDate = new Date(date);
	return format(translatedDate, 'HH:mm');
}

function PersonalScheduleList({
	personalSchedule,
}: {
	personalSchedule: TPersonalSchedule | undefined;
}) {
	const lookUpDay = {
		MONDAY: 'Mon',
		TUESDAY: 'Tues',
		WEDNESDAY: 'Wed',
		THURSDAY: 'Thurs',
		FRIDAY: 'Fri',
		SATURDAY: 'Sat',
		SUNDAY: 'Sun',
	};

	if (personalSchedule)
		return (
			<>
				<h3 className="scroll-m-20 text-base font-semibold tracking-tight">
					Personal Schedule
				</h3>
				<li>
					Schedule Info:{' '}
					{dateToHours(personalSchedule.Schedule.startTime) +
						'-' +
						dateToHours(personalSchedule.Schedule.endTime)}{' '}
				</li>
				<li>Schedule Type: {personalSchedule.Schedule.scheduleType}</li>
				<li>
					Availability:{' '}
					{personalSchedule.day.map((days, index) => (
						<Badge className="mx-[0.05rem]" key={index}>
							{lookUpDay[days]}
						</Badge>
					))}
				</li>
			</>
		);
	else return <li> Personal Schedule: None </li>;
}

function ScheduleList({
	schedule,
}: {
	schedule: TDepartmentSchedules | undefined;
}) {
	if (schedule?.Schedule != undefined) {
		return (
			<>
				<li>Schedule Type: {schedule.Schedule.scheduleType}</li>
				<li>
					Schedule Info:{' '}
					{dateToHours(schedule.Schedule.startTime) +
						'-' +
						dateToHours(schedule.Schedule.endTime)}
				</li>
			</>
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
	const [getUserDepartmentSchedule, setUserDepartmentSchedule] = useState<
		TDepartmentSchedules | undefined
	>(undefined);

	const [getUserPersonalSchedule, setUserPersonalSchedule] = useState<
		TPersonalSchedule | undefined
	>(undefined);

	useEffect(() => {
		if (useUserStore.getState()?.user) {
			setUserDepartmentSchedule(
				useUserStore.getState()?.user?.departmentSchedule
			);
		} else {
			setUserDepartmentSchedule(undefined);
		}
	}, [getUserDepartmentSchedule]);

	useEffect(() => {
		if (useUserStore.getState()?.user) {
			console.log('TITE');

			console.log(useUserStore.getState()?.user?.personalSchedule);

			setUserPersonalSchedule(useUserStore.getState()?.user?.personalSchedule);
		} else {
			setUserPersonalSchedule(undefined);
		}
	}, [getUserPersonalSchedule]);

	return (
		<Card className={className + 'p-2 pt-0 2xl:p-5'}>
			<CardHeader className="flex flex-row p-0 items-end justify-between w-full ">
				<CardTitle className="text-base 2xl:text-lg">
					Department Schedule
				</CardTitle>
				<Calendar className="2xl:w-[1.25rem] 2xl:h-[1.25rem] h-[1.5rem] w-[1.5rem]"></Calendar>
			</CardHeader>
			<CardContent className="p-0">
				<ul className="text-sm 2xl:text-base w-full">
					<ScheduleList schedule={getUserDepartmentSchedule}></ScheduleList>
					<PersonalScheduleList
						personalSchedule={getUserPersonalSchedule}
					></PersonalScheduleList>
				</ul>
			</CardContent>
		</Card>
	);
}
