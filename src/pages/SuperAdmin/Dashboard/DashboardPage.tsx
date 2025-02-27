import SuperAdminInfoCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard";
import RecentActivitiesCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard";
import HolidayList from "@/components/SuperAdminComponents/DashboardSuperAdmin/HolidayList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-2 w-full h-[150vh] border-border border-solid border p-6 rounded-lg">
      {/* Top row: Super Admin Info, Employee Status Cards, Holiday List */}
      <div className="col-span-1">
        <SuperAdminInfoCard className="min-h-[100px] flex-grow" />
      </div>
      <div className="col-span-2">
        <div className="grid grid-cols-4 gap-2">
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Online</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Online Employees</p>
            </CardContent>
          </Card>
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">Offline</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Offline Employees</p>
            </CardContent>
          </Card>
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Department
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Departments</p>
            </CardContent>
          </Card>
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Total Employees</p>
            </CardContent>
          </Card>
        </div>
        {/* Recent Activities below Employee Status Cards */}
        <div className="col-span-4 mt-2">
          <RecentActivitiesCard className="min-h-[100px] flex-grow" />
        </div>
      </div>
      <div className="col-span-1">
        <HolidayList className="min-h-[100px] flex-grow" />
      </div>
    </div>
  );
}
