import { Outlet } from 'react-router-dom';
import Timebar from '@/components/TimeInComponent/TimeBar';

import EmployeeNavigation from '@/components/EmployeeComponents/EmployeeNavigation/EmployeeNavigation';

export default function EmployeePage() {
	return (
		<div className="h-[100svh] w-[100svw] min-h-0 min-w-0 flex items-center justify-start p-5 gap-10 relative">
			<EmployeeNavigation></EmployeeNavigation>
			{/* delete this h full and w full if something krazy happens */}
			<main className="ml-[calc(4rem_+_1.25rem)] flex w-full h-full flex-1 items-center justify-start flex-col gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
		</div>
	);
}
