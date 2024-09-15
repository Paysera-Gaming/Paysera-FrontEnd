import { Outlet } from 'react-router-dom';
import Timebar from '@/components/TimeInComponent/TimeBar';
import { Toaster } from '@/components/ui/sonner';
import EmployeeNavigation from '@/components/EmployeeComponents/EmployeeNavigation/EmployeeNavigation';

export default function EmployeePage() {
	return (
		<div className="h-[100svh] w-[100svw] flex flex-1 items-center justify-start p-5 gap-5">
			<EmployeeNavigation></EmployeeNavigation>
			{/* delete this h full and w full if something krazy happens */}
			<main className="flex h-full items-center justify-start flex-col flex-1 gap-y-3">
				<Timebar></Timebar>
				<Outlet></Outlet>
			</main>
			<Toaster richColors closeButton></Toaster>
		</div>
	);
}
