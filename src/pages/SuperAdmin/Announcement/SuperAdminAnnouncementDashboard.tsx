import AnnouncementList from '@/components/SuperAdminComponents/AnnouncementSuperAdmin/AnnouncementList';

export default function SuperAdminAnnouncementDashboard() {
    return (
        <div className="w-full h-full p-5">
            <h2 className="text-3xl font-semibold mb-5">Announcement List</h2>
            <AnnouncementList />
        </div>
    );
}