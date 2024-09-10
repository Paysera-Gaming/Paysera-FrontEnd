import { employeeColumns } from '@/components/DataTable/DataColumns';
import { DataTable } from '@/components/DataTable/DataTableProvider';

import { TEmployee } from '@/components/DataTable/DataColumns';
import AddEmployee from '@/components/TeamLeadComponents/DialogForms/AddEmployee';
import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '../../../api/EmployeeAPI';
import { Skeleton } from '@/components/ui/skeleton';
export default function ManagePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['repoData'],
		queryFn: getAllEmployees,
	});

	const dataEmployees: TEmployee[] = data ?? [];

	if (isError) {
		return <>TITEEEE</>;
	}

	if (isLoading) {
		return (
			<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
				<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
					Manage Employees In Department
				</h2>
				<Skeleton className="h-4 w-full flex-1" />
			</div>
		);
	}

	return (
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
				Manage Employees In Department
			</h2>
			<DataTable
				addButton={<AddEmployee />}
				columns={employeeColumns}
				data={dataEmployees}
				searchQuery="id"
			></DataTable>
		</div>
	);
}
