import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "lucide-react"

type Holiday = {
  id: number
  name: string
  month: string
  day: number
  createdAt: string
  updatedAt: string
}

const fetchHolidays = async (): Promise<Holiday[]> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API}api/holiday`)
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
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 relative flex-shrink-0">
        <CardTitle className="text-base font-semibold">Upcoming Holidays</CardTitle>
        <Calendar size={"1.8rem"} className="absolute top-2 right-2" />
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm">Date</TableHead>
              <TableHead className="text-sm">Holiday</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoadingHolidays ? (
              <TableRow>
                <TableCell colSpan={2} className="text-sm">
                  Loading holidays...
                </TableCell>
              </TableRow>
            ) : holidays.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-sm">
                  No upcoming holidays
                </TableCell>
              </TableRow>
            ) : (
              holidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell className="text-sm">{`${holiday.month} ${holiday.day}`}</TableCell>
                  <TableCell className="text-sm">{holiday.name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

