// import EmployeeInfoCard from '@/components/TeamLeadComponents/DashboardTeamLead/EmployeeInfoCard';
// import EmployeesStatusCards from '@/components/TeamLeadComponents/DashboardTeamLead/EmployeeStatusCards';
// import RecentActivitiesCard from '@/components/TeamLeadComponents/DashboardTeamLead/RecentActivitesCard';

import HolidayList from '@/components/commons/HolidayList';
import NoticeBoardCard from '@/components/commons/NoticeBoardCard';
import UserInfoCard from '@/components/commons/UserInfoCard';
import UserManualCard from '@/components/commons/UserManualCard';
import UserScheduleInfoCard from '@/components/commons/UserScheduleInfoCard';
import DepartmentStatusCard from '@/components/TeamLeadComponents/DashboardTeamLead/DepartmentStatusCard';
import RecentActivitiesCard from '@/components/TeamLeadComponents/DashboardTeamLead/RecentActivitesCard';

export default function Dashboard() {
	return (
		<div className=" h-full w-full border-border border-solid border p-5 rounded-md">
			<div className="w-[550px] lg:w-[700px] 2xl:w-auto h-[750px] grid grid-flow-col grid-rows-6  gap-3 ">
				<DepartmentStatusCard></DepartmentStatusCard>
				<UserInfoCard className="row-span-2"></UserInfoCard>
				<UserScheduleInfoCard className="col-span-1 row-span-2"></UserScheduleInfoCard>
				<UserManualCard></UserManualCard>
				{/*  */}
				<NoticeBoardCard></NoticeBoardCard>
				<RecentActivitiesCard></RecentActivitiesCard>
				{/*  */}
				<HolidayList></HolidayList>
			</div>
		</div>
	);
}
