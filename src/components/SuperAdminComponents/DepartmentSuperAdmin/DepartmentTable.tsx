import type React from "react"
import type { Department } from "./api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Edit, Trash, ChevronLeft, ChevronRight } from "lucide-react"

interface DepartmentTableProps {
  currentDepartments: Department[]
  handleViewDepartment: (department: Department) => void
  handleEditDepartment: (department: Department) => void
  handleDeleteDepartment: (department: Department) => void
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const DepartmentTable: React.FC<DepartmentTableProps> = ({
  currentDepartments,
  handleViewDepartment,
  handleEditDepartment,
  handleDeleteDepartment,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400 font-normal">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400 font-normal">
                  Leader
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400 font-normal">
                  Members
                </th>
                <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400 font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDepartments.length > 0 ? (
                currentDepartments.map((department: Department) => (
                  <tr key={department.id} className="hover:bg-gray-100 dark:hover:bg-stone-800">
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent text-left text-black dark:text-gray-300">
                      {department.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent text-left text-black dark:text-gray-300">
                      {department.Leader
                        ? `${department.Leader.firstName} ${department.Leader.lastName}`
                        : "No Leader Assigned"}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent text-left text-black dark:text-gray-300">
                      {department.Employees && department.Employees.length > 0 ? (
                        <>
                          {department.Employees.slice(0, 3).map((employee) => (
                            <span key={employee.id} className="block">
                              {employee.firstName} {employee.lastName}
                            </span>
                          ))}
                          {department.Employees.length > 3 && <span>etc.</span>}
                        </>
                      ) : (
                        <span>No Employees</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent text-left text-black dark:text-gray-300">
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => handleViewDepartment(department)} variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Button>
                        <Button onClick={() => handleEditDepartment(department)} variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button onClick={() => handleDeleteDepartment(department)} variant="outline" size="sm">
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 dark:bg-transparent text-center text-black dark:text-gray-300"
                  >
                    No Department found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center px-2 py-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : "No pages"}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DepartmentTable

