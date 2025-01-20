import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX } from "lucide-react"
import { useState, useEffect } from "react"
import { fetchEmployees } from "@/utils/fetchEmployees"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"

export default function EmployeesStatusCards() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEmployees()
      setEmployees(data)
    }

    fetchData()
  }, [])

  const overallCount = employees.length
  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length
  const offlineCount = overallCount - onlineCount

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Employee Status</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Employees</p>
            <p className="text-2xl font-semibold">{overallCount}</p>
          </div>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Online</p>
            <p className="text-2xl font-semibold">{onlineCount}</p>
          </div>
          <UserCheck className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Offline</p>
            <p className="text-2xl font-semibold">{offlineCount}</p>
          </div>
          <UserX className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardContent>
    </Card>
  )
}

