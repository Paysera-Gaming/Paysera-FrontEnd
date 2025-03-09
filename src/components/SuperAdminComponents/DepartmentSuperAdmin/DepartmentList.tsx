import type React from "react"
import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchDepartments, fetchTeamLeaders, deleteDepartment, type Department, type Leader } from "./api"
import DepartmentForm from "./DepartmentForm"
import DepartmentDetails from "./DepartmentDetails"
import SearchBar from "./SearchBar"
import DepartmentTable from "./DepartmentTable"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { toast } from "sonner"

const DepartmentList: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: departments = [] } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  })
  const { data: teamLeaders = [] } = useQuery<Leader[]>({
    queryKey: ["teamLeaders"],
    queryFn: fetchTeamLeaders,
  })

  useEffect(() => {
    console.log("Team Leaders without a department:", teamLeaders);
  }, [teamLeaders]);

  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [viewingDepartment, setViewingDepartment] = useState<Department | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const departmentsPerPage = 10

  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] })
      toast.success("Successfully deleted the department")
    },
    onError: () => {
      toast.error("Error deleting the department")
    },
  })

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department)
  }

  const handleDeleteDepartment = (department: Department) => {
    setSelectedDepartment(department)
    setIsDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (selectedDepartment) {
      deleteDepartmentMutation.mutate(selectedDepartment.id)
      setIsDialogOpen(false)
    }
  }

  const handleViewDepartment = (department: Department) => {
    setViewingDepartment(department)
  }

  const handleBackToList = () => {
    setViewingDepartment(null)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const filteredDepartments = departments.filter((department) => {
    const searchLower = searchQuery.toLowerCase()
    const departmentNameMatch = department.name.toLowerCase().includes(searchLower)
    const leaderMatch = department.Leader
      ? `${department.Leader.firstName} ${department.Leader.lastName}`.toLowerCase().includes(searchLower)
      : false
    const membersMatch = department.Employees
      ? department.Employees.some((employee) =>
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchLower),
        )
      : false
    return departmentNameMatch || leaderMatch || membersMatch
  })

  const indexOfLastDepartment = currentPage * departmentsPerPage
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage
  const currentDepartments = filteredDepartments.slice(indexOfFirstDepartment, indexOfLastDepartment)
  const totalPages = Math.ceil(filteredDepartments.length / departmentsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  if (viewingDepartment) {
    return <DepartmentDetails department={viewingDepartment} onBack={handleBackToList} />
  }

  return (
    <div className="w-full py-4 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center" style={{ width: "33%" }}>
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <div className="text-gray-500 dark:text-gray-400 ml-4">{filteredDepartments.length} Departments</div>
        </div>
        <DepartmentForm
          editingDepartment={editingDepartment}
          setEditingDepartment={setEditingDepartment}
          teamLeaders={teamLeaders}
          departments={departments}
        />
      </div>
      <DepartmentTable
        currentDepartments={currentDepartments}
        handleViewDepartment={handleViewDepartment}
        handleEditDepartment={handleEditDepartment}
        handleDeleteDepartment={handleDeleteDepartment}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete {selectedDepartment?.name}?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DepartmentList