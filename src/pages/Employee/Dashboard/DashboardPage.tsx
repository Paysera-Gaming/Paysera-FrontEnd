import HolidayList from '@/components/commons/HolidayList';
import NoticeBoardCard from '@/components/commons/NoticeBoardCard';
import UserInfoCard from '@/components/commons/UserInfoCard';
import UserManualCard from '@/components/commons/UserManualCard';
import UserScheduleInfoCard from '@/components/commons/UserScheduleInfoCard';
import RecentActivitiesCard from '@/components/TeamLeadComponents/DashboardTeamLead/RecentActivitesCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Dashboard() {
	return (
		<div className="min-h-0 min-w-0  w-full h-full rounded-md grid grid-flow-col grid-rows-6 gap-3">
			<UserInfoCard className="row-span-3 col-span-1"></UserInfoCard>
			<UserScheduleInfoCard className="row-span-3 col-span-1 "></UserScheduleInfoCard>

			{/*  */}

			<RecentActivitiesCard></RecentActivitiesCard>

			<Tabs
				defaultValue="announcement"
				className="row-span-6 col-span-1 flex flex-col flex-1  "
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="announcement">Announcements</TabsTrigger>
					<TabsTrigger value="upcoming_holidays">Upcoming holidays</TabsTrigger>
				</TabsList>
				{/* Ensures consistent height */}
				<div className="relative h-full">
					<TabsContent value="announcement" className="absolute inset-0">
						<NoticeBoardCard />
					</TabsContent>
					<TabsContent value="upcoming_holidays" className="absolute inset-0">
						<HolidayList />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
