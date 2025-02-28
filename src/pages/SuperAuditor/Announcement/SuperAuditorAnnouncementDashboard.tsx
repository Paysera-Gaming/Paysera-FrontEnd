import AnnouncementList from "@/components/SuperAuditorComponents/AnnouncementSuperAuditor/AnnouncementList";

export default function SuperAuditorAnnouncementDashboard() {
  return (
    <div className="w-full h-[150vh] border-border border-solid border p-6 rounded-lg">
      <h2 className="text-3xl font-semibold mb-5">Announcement List</h2>
      <AnnouncementList />
    </div>
  );
}
