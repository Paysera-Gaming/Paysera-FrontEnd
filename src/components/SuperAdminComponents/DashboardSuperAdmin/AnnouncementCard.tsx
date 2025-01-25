import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { Megaphone } from 'lucide-react'

interface Announcement {
  id: number
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

export default function AnnouncementCard() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [error, setError] = useState<string | null>(null)
  const baseApiUrl = import.meta.env.VITE_BASE_API

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${baseApiUrl}api/announcements`)
        const data = await response.json()
        if (Array.isArray(data)) {
          // Sort announcements by ID in descending order
          const sortedAnnouncements = data.sort((a, b) => b.id - a.id)
          setAnnouncements(sortedAnnouncements)
        } else {
          throw new Error("Unexpected response format")
        }
      } catch (error) {
        console.error("Error fetching announcements:", error)
        setError("Failed to load announcements")
      }
    }

    fetchAnnouncements()
  }, [baseApiUrl])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <Card className="col-span-2 min-h-[30px] relative">
      <CardHeader className="pb-1 relative">
        <CardTitle className="text-sm font-semibold">Announcements</CardTitle>
        <Megaphone size={'1.8rem'} className="absolute top-2 right-2" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[65px]">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.id} className="mb-1">
                <strong>{announcement.title}</strong>: {announcement.body}
              </div>
            ))
          ) : (
            <div>No announcements available</div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}