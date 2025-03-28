import HolidayList from "@/components/AuditorComponents/HolidayAuditor/HolidayList";

export default function AuditorHolidayDashboard() {
  return (
    <div className="w-full h-[150vh] border-border border-solid border p-6 rounded-lg">
      <h2 className="text-3xl font-semibold mb-5">Holiday List</h2>
      <HolidayList />
    </div>
  );
}
