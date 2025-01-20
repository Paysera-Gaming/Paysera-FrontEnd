import SuperAdminInfoCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard"
import SuperAdminsStatusCards from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminStatusCards"
import RecentActivitiesCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard"
import HolidayList from "@/components/SuperAdminComponents/DashboardSuperAdmin/HolidayList"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full h-full border-border border-solid border p-5 rounded-md">
      <h2 className="col-span-3 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Dashboard</h2>
      <div className="col-span-2 grid grid-cols-2 gap-3">
        <SuperAdminsStatusCards />
        <HolidayList />
      </div>
      <SuperAdminInfoCard />
      <RecentActivitiesCard className="col-span-3" />
    </div>
  )
}

