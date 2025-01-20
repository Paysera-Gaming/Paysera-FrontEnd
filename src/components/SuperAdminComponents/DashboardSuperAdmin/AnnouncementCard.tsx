import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

interface Announcement {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

export default function AnnouncementCard() {
  const [announcements] = useState<Announcement[]>([
    { id: 1, title: "Announcement 1", body: "This is the body of announcement 1", createdAt: "", updatedAt: "" },
    { id: 2, title: "Announcement 2", body: "This is the body of announcement 2", createdAt: "", updatedAt: "" },
    { id: 3, title: "Announcement 3", body: "This is the body of announcement 3", createdAt: "", updatedAt: "" },
    { id: 4, title: "Announcement 4", body: "This is the body of announcement 4", createdAt: "", updatedAt: "" },
    { id: 5, title: "Announcement 5", body: "This is the body of announcement 5", createdAt: "", updatedAt: "" },
    { id: 6, title: "Announcement 6", body: "This is the body of announcement 6", createdAt: "", updatedAt: "" },
    { id: 7, title: "Announcement 7", body: "This is the body of announcement 7", createdAt: "", updatedAt: "" },
    { id: 8, title: "Announcement 8", body: "This is the body of announcement 8", createdAt: "", updatedAt: "" },
    { id: 9, title: "Announcement 9", body: "This is the body of announcement 9", createdAt: "", updatedAt: "" },
    { id: 10, title: "Announcement 10", body: "This is the body of announcement 10", createdAt: "", updatedAt: "" },
    { id: 11, title: "Announcement 11", body: "This is the body of announcement 11", createdAt: "", updatedAt: "" },
    { id: 12, title: "Announcement 12", body: "This is the body of announcement 12", createdAt: "", updatedAt: "" },
    { id: 13, title: "Announcement 13", body: "This is the body of announcement 13", createdAt: "", updatedAt: "" },
    { id: 14, title: "Announcement 14", body: "This is the body of announcement 14", createdAt: "", updatedAt: "" },
    { id: 15, title: "Announcement 15", body: "This is the body of announcement 15", createdAt: "", updatedAt: "" }
  ])

  return (
    <Card className="col-span-2 min-h-[80px]"> {/* Added min-height */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Announcements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-[80px] overflow-auto"> {/* Added max-height and overflow */}
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="text-sm">
              {announcement.title}: {announcement.body}
            </div>
          ))
        ) : (
          <div className="text-sm">No announcements available</div>
        )}
      </CardContent>
    </Card>
  )
}