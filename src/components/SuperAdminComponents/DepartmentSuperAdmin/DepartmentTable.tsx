import type React from "react"
import type { Department } from "./api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Edit, Trash } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

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
                  <tr key={department.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
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
        <div className="py-4 px-2 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => onPageChange(currentPage - 1)} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" isActive={index + 1 === currentPage} onClick={() => onPageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={() => onPageChange(currentPage + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}

export default DepartmentTable

