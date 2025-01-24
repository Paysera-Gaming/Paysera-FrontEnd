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
		<div className="min-h-0 min-w-0 w-full h-full border-border border-solid border p-5 rounded-md grid grid-flow-col grid-rows-6 gap-3  ">
			{/* <div className="bg-red-500">test</div> */}
			{/* <div className="bg-red-500 row-span-2">test</div> */}
			{/* <div className="bg-red-500 col-span-1 row-span-2">test</div> */}
			{/* <div className="bg-red-500">test</div> */}

			<DepartmentStatusCard></DepartmentStatusCard>

			<UserInfoCard className="row-span-2"></UserInfoCard>
			<UserScheduleInfoCard className="col-span-1 row-span-2 "></UserScheduleInfoCard>
			<UserManualCard></UserManualCard>

			{/*  */}
			{/* <div className="col-span-3 row-span-3 bg-red-500">TEST</div> */}
			{/* <div className="col-span-3 row-span-3  bg-red-500 ">test</div> */}
			{/* <div className="col-span-3 row-span-6 bg-red-500  ">test</div> */}
			{/*  */}
			<NoticeBoardCard></NoticeBoardCard>
			<RecentActivitiesCard></RecentActivitiesCard>
			<HolidayList></HolidayList>
		</div>
	);
}
