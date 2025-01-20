import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Employee Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Employees</p>
            <p className="text-2xl font-semibold">{overallCount}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Online</p>
            <p className="text-2xl font-semibold">{onlineCount}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Offline</p>
            <p className="text-2xl font-semibold">{offlineCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}