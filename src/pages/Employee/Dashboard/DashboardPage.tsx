import HolidayList from '@/components/commons/HolidayList';
import NoticeBoardCard from '@/components/commons/NoticeBoardCard';
import UserInfoCard from '@/components/commons/UserInfoCard';
import UserManualCard from '@/components/commons/UserManualCard';
import UserScheduleInfoCard from '@/components/commons/UserScheduleInfoCard';
import RecentActivitiesCard from '@/components/TeamLeadComponents/DashboardTeamLead/RecentActivitesCard';

export default function Dashboard() {
	return (
		<div className="min-h-0 min-w-0  w-full h-full border-border border-solid border p-2 2xl:p-5 rounded-md grid grid-flow-col grid-rows-6 gap-2 2xl:3">
			<UserInfoCard className="row-span-3"></UserInfoCard>
			<UserScheduleInfoCard className="col-span-1 row-span-2 "></UserScheduleInfoCard>
			<UserManualCard></UserManualCard>
			{/*  */}
			<NoticeBoardCard></NoticeBoardCard>
			<RecentActivitiesCard></RecentActivitiesCard>
			{/*  */}
			<HolidayList></HolidayList>
		</div>
	);
}
