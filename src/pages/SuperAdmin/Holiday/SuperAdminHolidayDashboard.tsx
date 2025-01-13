import HolidayList from '@/components/SuperAdminComponents/HolidaySuperAdmin/HolidayList';

export default function SuperAdminHolidayDashboard() {
    return (
        <div className="w-full h-full p-5">
            <h2 className="text-3xl font-semibold mb-5">Holiday List</h2>
            <HolidayList />
        </div>
    );
}
