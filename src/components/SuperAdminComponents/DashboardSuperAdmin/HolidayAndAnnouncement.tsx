import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AnnouncementCard from "./AnnouncementCard";

export default function HolidayAndAnnouncement({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tabs defaultValue="tab2" className="w-full">
      <TabsList className="w-full flex">
        <TabsTrigger value="tab1" className="flex-grow">
          Announcements
        </TabsTrigger>
        <TabsTrigger value="tab2" className="flex-grow">
          Upcoming Holidays
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <AnnouncementCard />
      </TabsContent>
      <TabsContent value="tab2">{children}</TabsContent>
    </Tabs>
  );
}
