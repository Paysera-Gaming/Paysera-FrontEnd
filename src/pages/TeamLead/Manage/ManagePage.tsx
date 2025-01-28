import { employeeColumns } from '@/components/DataTable/DataColumns';
import { DataTable } from '@/components/DataTable/DataTableProvider';

import { TEmployee } from '@/components/DataTable/DataColumns';
import AddEmployee from '@/components/TeamLeadComponents/DialogForms/AddEmployee';
import { useQuery } from '@tanstack/react-query';
import { getAllEmployeesInDepartment } from '../../../api/EmployeeAPI';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserStore } from '@/stores/userStore';
import ErrorDisplay from '@/components/ErrorComponent/ErrorDisplay';

export default function ManagePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['EmployeesInfo'],
		queryFn: () => {
			const user = useUserStore.getState().getUser();
			const departmentId = user?.departmentId;

			if (departmentId !== undefined) {
				return getAllEmployeesInDepartment(departmentId.toString());
			} else {
				throw new Error('No Department Id Found');
			}
		},
	});

	const dataEmployees: TEmployee[] = data ?? [];

	if (isError) {
		return <ErrorDisplay />;
	}

	if (isLoading) {
		return (
			<div className="min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md ">
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
		<div className=" min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Manage Employees In Department
			</h2>
			<DataTable
				addButton={<AddEmployee />}
				columns={employeeColumns}
				data={dataEmployees}
				searchQuery="lastName"
			></DataTable>
		</div>
	);
}
