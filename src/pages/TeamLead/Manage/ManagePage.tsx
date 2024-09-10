import { employeeColumns } from '@/components/DataTable/DataColumns';
import { DataTable } from '@/components/DataTable/DataTableProvider';

import { TEmployee } from '@/components/DataTable/DataColumns';
import AddEmployee from '@/components/TeamLeadComponents/DialogForms/AddEmployee';
import { useQuery } from '@tanstack/react-query';
import { getAllEmployeesInDepartment } from '../../../api/EmployeeAPI';
import { Skeleton } from '@/components/ui/skeleton';

// todo's
// need to add edit employee in department - doing
// remove employee in department

export default function ManagePage() {
	const { data, isError, isLoading } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => getAllEmployeesInDepartment('95'),
	});

	const dataEmployees: TEmployee[] = data ?? [];

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
