import { employeeColumns } from '@/components/DataTable/DataColumns';
import { DataTable } from '@/components/DataTable/DataTableProvider';

import { TEmployee } from '@/components/DataTable/DataColumns';
export default function ManagePage() {
	const dataEmployees: TEmployee[] = [
		{
			id: 'adawdd',
			fName: 'Bohn',
			lName: 'Boe',
			mName: 'Belacruz',
			role: 'super model',
			createdAt: new Date('02-03-2024'),
			updatedAt: new Date('05-03-2024'),
		},
		{
			id: 'adawdda',
			fName: 'Cohn',
			lName: 'Coe',
			mName: 'Celacruz',
			role: 'super model',
			createdAt: new Date('01-03-2024'),
			updatedAt: new Date('07-03-2024'),
		},
		{
			id: 'adawdd1',
			fName: 'Aohn',
			lName: 'Aoe',
			mName: 'Aelacruz',
			role: 'super model',
			createdAt: new Date('06-03-2024'),
			updatedAt: new Date('08-03-2024'),
		},
		{
			id: 'adawdd2',
			fName: 'John ',
			lName: 'Doe',
			mName: 'Delacruz',
			role: 'super model',
			createdAt: new Date('08-03-2024'),
			updatedAt: new Date('08-03-2024'),
		},
	];

	return (
		<div className=" w-full h-full border-border border-solid border p-5 rounded-md">
			{/* search bar sa table with a add employee of the side then after adding empoyee may form na lalagay anong role nya  */}
			{/* and table of employeees */}
			{/*  */}
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
				Manage Employees
			</h2>
			<DataTable columns={employeeColumns} data={dataEmployees}></DataTable>
		</div>
	);
}
