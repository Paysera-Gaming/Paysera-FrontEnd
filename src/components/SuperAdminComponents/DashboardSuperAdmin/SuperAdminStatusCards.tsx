import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { fetchEmployees } from "@/utils/fetchEmployees"
import type { Employee } from "@/components/SuperAdminComponents/EmployeeSuperAdmin/types"
import { Users } from "lucide-react"

export default function EmployeesStatusCards() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (error) {
        console.error("Error fetching employees:", error)
      }
    }

    fetchData()
  }, [])

  const totalEmployees = employees.length
  const onlineCount = employees.filter((emp: Employee) => emp.isActive).length
  const offlineCount = totalEmployees - onlineCount

  return (
    <Card className="col-span-1 relative p-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold">Employee Status</CardTitle>
        <Users size={"1.8rem"} className="absolute top-2 right-2" />
      </CardHeader>
      <CardContent className="flex flex-col space-y-2 mt-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
          <p className="text-sm">Total Employees</p>
          <p className="text-2xl font-semibold">{totalEmployees}</p>
        </div>
        <div className="flex justify-between space-x-1">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <p className="text-sm">Online</p>
            <p className="text-2xl font-semibold">{onlineCount}</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <p className="text-sm">Offline</p>
            <p className="text-2xl font-semibold">{offlineCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}