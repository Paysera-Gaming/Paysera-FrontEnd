import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

type Holiday = {
  id: number
  name: string
  date: string
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API}/holidays`)
  if (!response.ok) {
    throw new Error("Failed to fetch holidays")
  }
  return response.json()
}

export default function HolidayList() {
  const { data: holidays = [], isLoading: isLoadingHolidays } = useQuery<Holiday[]>({
    queryKey: ["holidays"],
    queryFn: fetchHolidays,
  })

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-semibold">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Holidays
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Holiday</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingHolidays ? (
                <TableRow>
                  <TableCell colSpan={2}>Loading holidays...</TableCell>
                </TableRow>
              ) : holidays.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2}>No upcoming holidays</TableCell>
                </TableRow>
              ) : (
                holidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell>{new Date(holiday.date).toLocaleDateString()}</TableCell>
                    <TableCell>{holiday.name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

