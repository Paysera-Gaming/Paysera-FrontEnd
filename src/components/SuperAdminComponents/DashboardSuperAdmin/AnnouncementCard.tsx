import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

type AnnouncementCardProps = {
  className?: string;
};

const baseApiUrl = import.meta.env.VITE_BASE_API;

export default function AnnouncementCard({ className }: AnnouncementCardProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${baseApiUrl}api/announcements`);
      const data = await response.json();
      if (Array.isArray(data)) {
        // Sort announcements by ID in descending order
        const sortedAnnouncements = data.sort((a, b) => b.id - a.id);
        setAnnouncements(sortedAnnouncements);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setError("Failed to load announcements");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useWebSocket("announcements", fetchAnnouncements);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className={`col-span-2 min-h-[120px] relative p-2 ${className}`}>
      <CardHeader className="pb-1 flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-semibold">Announcements</CardTitle>
        <Megaphone size={"1.5rem"} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px]">
          {error ? (
            <>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
            </>
          ) : announcements.length > 0 ? (
            <ul className="list-none">
              {announcements.map((announcement) => (
                <li
                  key={announcement.id}
                  className="mb-4 text-base flex items-start"
                >
                  <span className="mr-2">•</span>
                  <div>
                    <div className="font-semibold">{`${formatDate(
                      announcement.createdAt
                    )} - ${announcement.title}`}</div>
                    <div>{announcement.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No announcements available</div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
