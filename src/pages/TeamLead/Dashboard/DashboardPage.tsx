import EmployeesStatusCards from '@/components/TeamLeadComponents/DashboardTeamLead/EmployeeStatusCards';

export default function Dashboard() {
	return (
		<main className="flex-1 w-full border-border border-solid border p-5 rounded-md">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Dashboard
			</h2>
			<EmployeesStatusCards></EmployeesStatusCards>
		</main>
	);
}
