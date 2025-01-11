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
			<div className=" h-[750px] w-full  grid grid-flow-col grid-rows-6  gap-3 ">
				<DepartmentStatusCard></DepartmentStatusCard>
				<UserInfoCard></UserInfoCard>
				<UserScheduleInfoCard></UserScheduleInfoCard>
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
