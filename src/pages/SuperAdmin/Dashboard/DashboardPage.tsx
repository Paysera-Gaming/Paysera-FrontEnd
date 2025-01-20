import SuperAdminInfoCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard"
import SuperAdminsStatusCards from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminStatusCards"
import RecentActivitiesCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard"
import HolidayList from "@/components/SuperAdminComponents/DashboardSuperAdmin/HolidayList"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-3 w-full h-full border-border border-solid border p-5 rounded-md">
      <h2 className="col-span-4 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h2>

      {/* Main content area (3 columns) */}
      <div className="col-span-3 space-y-3">
        {/* Employee Status */}
        <SuperAdminsStatusCards />

        {/* Super Admin Info and Paid Leave Record side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-1">
            <SuperAdminInfoCard />
          </div>
          <div className="col-span-1">
            <RecentActivitiesCard />
          </div>
        </div>
      </div>

      {/* Right side content (1 column) - Holiday list spanning full height */}
      <div className="col-span-1">
        <HolidayList />
      </div>
    </div>
  )
}

