import SuperAdminInfoCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard";
import RecentActivitiesCard from "@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard";
import HolidayList from "@/components/SuperAdminComponents/DashboardSuperAdmin/HolidayList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full border-border border-solid border p-4 md:p-6 rounded-lg">
      {/* Top row: Super Admin Info, Employee Status Cards, Holiday List */}
      <div className="md:col-span-1 order-1">
        <SuperAdminInfoCard className="h-full" />
      </div>

      <div className="md:col-span-2 order-2 flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-semibold">
                Online
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Online Employees</p>
            </CardContent>
          </Card>
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-semibold">
                Offline
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-1 mt-1">
              {/* Simplified content */}
              <p>Offline Employees</p>
            </CardContent>
          </Card>
          <Card className="relative p-2">
            <CardHeader className="pb-1 flex flex-row items-center justify-between">
              <CardTitle className="text-lg md:text-xl font-semibold">
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
              <CardTitle className="text-lg md:text-xl font-semibold">
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
        <div className="flex-1">
          <RecentActivitiesCard className="h-full" />
        </div>
      </div>

      <div className="md:col-span-1 order-3">
        <HolidayList className="h-full" />
      </div>
    </div>
  );
}
