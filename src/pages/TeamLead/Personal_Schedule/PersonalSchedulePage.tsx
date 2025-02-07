import {
	getAllPersonalSchedules,
	TPersonalSchedule,
} from '@/api/PersonalScheduleAPI';
import { DataTable } from '@/components/DataTable/DataTableProvider';
import personalScheduleColumn from '@/components/DataTable/PersonalScheduleColumn';
import ErrorDisplay from '@/components/ErrorComponent/ErrorDisplay';
import AddPersonalScheduleBtn from '@/components/TeamLeadComponents/PersonalSchedule/AddPersonalScheduleBtn';

import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';

export default function PersonalSchedulePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['PersonalSchedule'],
		queryFn: () => getAllPersonalSchedules(),
	});

	const personalScheduleData: TPersonalSchedule[] = data ?? [];

	if (isError) {
		return <ErrorDisplay />;
	}

	if (isLoading) {
		return (
			<div className=" w-full h-full border-border border-solid border p-5 rounded-md ">
				<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
					Personal Schedule
				</h2>
				<div className="grid grid-cols-5 w-full mt-2 gap-2">
					<Skeleton className="col-span-5 h-10" />
					<Skeleton className="col-span-5 h-72" />
					<div className="col-span-3"></div>
					<Skeleton className="col-span-1 h-10" />
					<Skeleton className="col-span-1 h-10" />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Personal Schedule Page
			</h2>
			<DataTable
				addButton={<AddPersonalScheduleBtn></AddPersonalScheduleBtn>}
				columns={personalScheduleColumn()}
				data={personalScheduleData}
				searchQuery="Employee_lastName"
			></DataTable>
		</div>
	);
}
