import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { fetchEmployees } from "@/utils/fetchEmployees"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"

export default function EmployeesStatusCards() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      }
    }

    fetchData()
  }, [])

  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length
  const offlineCount = employees.length - onlineCount

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Employee Status</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <p className="text-sm">Online</p>
          </div>
          <p className="text-2xl font-semibold">{onlineCount}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <p className="text-sm">Offline</p>
          </div>
          <p className="text-2xl font-semibold">{offlineCount}</p>
        </div>
      </CardContent>
    </Card>
  )
}