import {
	getAllSchedulesInDepartment,
	TDepartmentSchedules,
} from '@/api/ScheduleAPI';
import { DataTable } from '@/components/DataTable/DataTableProvider';
import { scheduleColumns } from '@/components/DataTable/ScheduleColumn';
import AddScheduleBtn from '@/components/TeamLeadComponents/SchedulePage/AddScheduleBtn';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/userStore';
import { useQuery } from '@tanstack/react-query';

export default function SchedulePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['Schedule'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;
			if (departmentId !== undefined) {
				return getAllSchedulesInDepartment(departmentId);
			} else {
				throw new Error('No Department Id Found');
			}
		},
	});

	const scheduleData: TDepartmentSchedules[] = data ?? [];
	if (isError) {
		return <>An Error has occured</>;
	}

	if (isLoading) {
		return (
			<div className=" w-full h-full border-border border-solid border p-5 rounded-md ">
				<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
					Manage Employees In Department
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
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
			{/* adjust the bloody cancel and submit button sa add schedule */}
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Manage Schedule
			</h2>
			<DataTable
				addButton={<AddScheduleBtn />}
				columns={scheduleColumns}
				data={scheduleData}
				searchQuery="name"
			></DataTable>
		</div>
	);
}
