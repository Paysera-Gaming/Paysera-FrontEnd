import SuperAuditorInfoCard from "@/components/SuperAuditorComponents/DashboardSuperAuditor/SuperAuditorInfoCard";
import EmployeesStatusCards from "@/components/SuperAuditorComponents/DashboardSuperAuditor/SuperAuditorStatusCards";
import RecentActivitiesCard from "@/components/SuperAuditorComponents/DashboardSuperAuditor/RecentActivitesCard";
import HolidayList from "@/components/SuperAuditorComponents/DashboardSuperAuditor/HolidayList";
import AnnouncementCard from "@/components/SuperAuditorComponents/DashboardSuperAuditor/AnnouncementCard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-2 w-full h-[150vh] border-border border-solid border p-6 rounded-lg">
      {/* Main content area (3 columns) */}
      <div className="col-span-3 flex flex-col space-y-2">
        {/* Employee Status on the left and Announcements on the right */}
        <div className="grid grid-cols-3 gap-2 flex-grow">
          <EmployeesStatusCards className="min-h-[100px] flex-grow" />
          <AnnouncementCard className="min-h-[100px] flex-grow" />
        </div>

        {/* Super Admin Info and Recent Activities side by side */}
        <div className="grid grid-cols-3 gap-2 flex-grow">
          <SuperAuditorInfoCard className="min-h-[100px] flex-grow" />
          <RecentActivitiesCard className="min-h-[100px] flex-grow" />
        </div>
      </div>

      {/* Right side content (1 column) - Holiday list spanning full height */}
      <div className="col-span-1 h-full flex flex-col">
        <HolidayList className="min-h-[100px] flex-grow" />
      </div>
    </div>
  );
}
