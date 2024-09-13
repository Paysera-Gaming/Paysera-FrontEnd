import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import { Employee } from "../EmployeeSuperAdmin/types";
import { DatePickerDemo } from "./DatePickerDemo"; // Ensure the correct path
import { Toaster, toast } from 'sonner';

const fetchEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get(import.meta.env.VITE_BASE_API + "/api/employee");
  return response.data;
};

const PaidLeaveForm: React.FC = () => {
  const { data: employees = [] } = useQuery<Employee[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [scheduleType, setScheduleType] = useState<string>("");

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

    const date = selectedDate.toISOString().split('T')[0]; // Get the date part only

    const payload = {
      employeeId: employee.id,
      date: selectedDate.toISOString(),
      status: "PAID_LEAVE",
      scheduleType,
      timeIn: new Date(`${date}T08:00:00`).toISOString(),
      timeOut: new Date(`${date}T17:00:00`).toISOString(),
      lunchTimeIn: new Date(`${date}T12:00:00`).toISOString(),
      lunchTimeOut: new Date(`${date}T13:00:00`).toISOString(),
      timeHoursWorked: 8,
      lunchTimeTotal: 1,
      timeTotal: 9,
    };

    try {
      await axios.post(import.meta.env.VITE_BASE_API + "/api/attendance", payload);
      toast.success("Paid leave submitted successfully!");
    } catch (error) {
      console.error("Error submitting paid leave:", error);
      toast.error("Failed to submit paid leave.");
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Paid Leave</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Paid Leave</DialogTitle>
            <DialogDescription>
              Fill out the form to apply for paid leave.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="employee" className="text-right">
                  Employee
                </Label>
                <select
                  id="employee"
                  className="col-span-3"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="" disabled>Select an employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.username}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="leaveDates" className="text-right">
                  Leave Dates
                </Label>
                <div className="col-span-3">
                  <DatePickerDemo date={selectedDate} setDate={setSelectedDate} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scheduleType" className="text-right">
                  Schedule Type
                </Label>
                <select
                  id="scheduleType"
                  className="col-span-3"
                  value={scheduleType}
                  onChange={(e) => setScheduleType(e.target.value)}
                >
                  <option value="" disabled>Select a schedule type</option>
                  <option value="FIXED">FIXED</option>
                  <option value="FLEXI">FLEXI</option>
                  <option value="SUPER_FLEXI">SUPER_FLEXI</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default PaidLeaveForm;