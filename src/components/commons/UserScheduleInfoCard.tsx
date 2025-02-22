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
	else
		return (
			<>
				<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
					Personal Schedule
				</h3>
				<li>Schedule Info: Not Applicable</li>
				<li>Schedule Type: Not Applicable</li>
				<li>Availability: Not Applicable</li>
			</>
		);
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
		return (
			<>
				<li>Schedule Type: Not Applicable</li>
				<li>Schedule Info: Not Applicable</li>
				<li>Clock-In Time Frame: Not Applicable </li>
			</>
		);
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
			console.log(useUserStore.getState()?.user?.personalSchedule);

			setUserPersonalSchedule(useUserStore.getState()?.user?.personalSchedule);
		} else {
			setUserPersonalSchedule(undefined);
		}
	}, [getUserPersonalSchedule]);

	return (
		<Card className={className + ''}>
			<CardHeader className="flex flex-row  p-3 pb-0  2xl:p-6  items-center justify-between w-full">
				<CardTitle className="text-lg mt-1 2xl:text-2xl">
					Department Schedule
				</CardTitle>
				<Calendar></Calendar>
			</CardHeader>
			<CardContent className="p-3  2xl:p-6 2xl:pt-0 pt-0">
				<ul className="w-full 2xl:text-lg">
					<ScheduleList schedule={getUserDepartmentSchedule}></ScheduleList>
					<hr className="border-dashed border-muted-foreground my-2 2xl:my-5" />
					<PersonalScheduleList
						personalSchedule={getUserPersonalSchedule}
					></PersonalScheduleList>
				</ul>
			</CardContent>
		</Card>
	);
}
