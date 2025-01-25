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

  const totalEmployees = employees.length
  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length
  const offlineCount = totalEmployees - onlineCount

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Employee Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-1">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <p className="text-xs">Total Employees</p>
          <p className="text-xl font-semibold">{totalEmployees}</p>
        </div>
        <div className="flex justify-between space-x-1">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <p className="text-xs">Online</p>
            <p className="text-xl font-semibold">{onlineCount}</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <p className="text-xs">Offline</p>
            <p className="text-xl font-semibold">{offlineCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}