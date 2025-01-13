import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Add this import
import { Employee } from "../EmployeeSuperAdmin/types";
import { DatePickerDemo } from "./DatePickerDemo"; // Ensure the correct path
import { toast } from 'sonner';
import { axiosInstance } from "@/api";
import { PaidLeavePayload } from "./types"; // Ensure the correct path

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axiosInstance.get("/api/employee");
  return response.data;
};

const PaidLeaveForm: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: employees = [] } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scheduleType, setScheduleType] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async (payload: PaidLeavePayload) => {
      await axiosInstance.post("/api/attendance", payload);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['attendanceData'] });
      toast.success("Paid leave submitted successfully!");
      setIsDialogOpen(false); // Close the dialog
    },
    onError: () => {
      toast.error("Failed to submit paid leave because this user already has a paid leave on this day.");
    }
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }
  
    const employee = employees.find(emp => emp.username === selectedEmployee);
    if (!employee) {
      toast.error("Please select a valid employee.");
      return;
    }
  
    // Create the timestamps correctly
    const payload: PaidLeavePayload = {
      employeeId: employee.id,
      date: selectedDate.toISOString(),
      status: "PAID_LEAVE",
      scheduleType,
      timeIn: new Date(selectedDate.setHours(8, 0, 0)).toISOString(),
      timeOut: new Date(selectedDate.setHours(17, 0, 0)).toISOString(),
      lunchTimeIn: new Date(selectedDate.setHours(12, 0, 0)).toISOString(),
      lunchTimeOut: new Date(selectedDate.setHours(13, 0, 0)).toISOString(),
      timeHoursWorked: 8,
      lunchTimeTotal: 1,
      timeTotal: 9,
    };
  
    mutation.mutate(payload);
  };

  const filteredEmployees = employees.filter(employee =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Paid Leave</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Paid Leave</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Fill out the form to apply for paid leave.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employee" className="text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                  Employee
                </Label>
                <div className="col-span-3 relative">
                  <Input
                    type="text"
                    placeholder="Search employee..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchTerm(e.target.value);
                    }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="mb-2"
                  />
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
                      {filteredEmployees.map((employee) => (
                        <div
                          key={employee.id}
                          className={`p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${selectedEmployee === employee.username ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
                          onMouseDown={() => {
                            setSelectedEmployee(employee.username);
                            setSearchTerm(`${employee.firstName} ${employee.lastName}`);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {employee.firstName} {employee.lastName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leaveDates" className="text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                  Leave Dates
                </Label>
                <div className="col-span-3">
                  <DatePickerDemo date={selectedDate} setDate={setSelectedDate} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduleType" className="text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                  Schedule Type
                </Label>
                <select
                  id="scheduleType"
                  className="col-span-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-transparent dark:border-gray-600 dark:text-gray-300"
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                >
                  <option value="" disabled className="dark:bg-gray-700 dark:text-gray-300">Select a schedule type</option>
                  <option value="FIXED" className="dark:bg-gray-700 dark:text-gray-300">FIXED</option>
                  <option value="FLEXI" className="dark:bg-gray-700 dark:text-gray-300">FLEXI</option>
                  <option value="SUPER_FLEXI" className="dark:bg-gray-700 dark:text-gray-300">SUPER_FLEXI</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaidLeaveForm;