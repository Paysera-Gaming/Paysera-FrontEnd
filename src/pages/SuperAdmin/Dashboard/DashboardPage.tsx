import SuperAdminInfoCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard"
import EmployeesStatusCards from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminStatusCards"
import RecentActivitiesCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard"
import HolidayList from "@/components/SuperAdminComponents/DashboardSuperAdmin/HolidayList"
import AnnouncementCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/AnnouncementCard"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-4 w-full h-full border-border border-solid border p-6 rounded-lg">
      <h2 className="col-span-4 scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0 mb-6">Dashboard</h2>

      {/* Main content area (3 columns) */}
      <div className="col-span-3 space-y-4">
        {/* Employee Status on the left and Announcements on the right */}
        <div className="grid grid-cols-3 gap-4">
          <EmployeesStatusCards />
          <AnnouncementCard />
        </div>

        {/* Super Admin Info and Recent Activities side by side */}
        <div className="grid grid-cols-3 gap-4">
          <SuperAdminInfoCard />
          <RecentActivitiesCard />
        </div>
      </div>

      {/* Right side content (1 column) - Holiday list spanning full height */}
      <div className="col-span-1 h-full">
        <HolidayList />
      </div>
    </div>
  )
}

