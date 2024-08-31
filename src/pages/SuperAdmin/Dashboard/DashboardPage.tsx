import SuperAdminInfoCard from '@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminInfoCard';
import SuperAdminsStatusCards from '@/components/SuperAdminComponents/DashboardSuperAdmin/SuperAdminStatusCards';
import RecentActivitiesCard from '@/components/SuperAdminComponents/DashboardSuperAdmin/RecentActivitesCard';

export default function Dashboard() {
    return (
        <div className="grid grid-cols-3 gap-3 w-full h-full border-border border-solid border p-5 rounded-md">
            <h2 className="col-span-3 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                Dashboard
            </h2>
            <SuperAdminsStatusCards></SuperAdminsStatusCards>
            <SuperAdminInfoCard></SuperAdminInfoCard>
            <RecentActivitiesCard></RecentActivitiesCard>
        </div>
    );
}
