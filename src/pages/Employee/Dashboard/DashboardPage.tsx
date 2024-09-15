import EmployeeInfoCard from '@/components/TeamLeadComponents/DashboardTeamLead/EmployeeInfoCard';

import RecentActivitiesCard from '@/components/TeamLeadComponents/DashboardTeamLead/RecentActivitesCard';

export default function Dashboard() {
	return (
		<div className=" h-full border-border border-solid border p-5 rounded-md">
			<h2 className="col-span-3 scroll-m-20  text-3xl mb-2 font-semibold tracking-tight first:mt-0">
				Dashboard
			</h2>
			<div className="grid grid-cols-3 gap-3  w-full">
				<EmployeeInfoCard></EmployeeInfoCard>
				<RecentActivitiesCard></RecentActivitiesCard>
			</div>
		</div>
	);
}
