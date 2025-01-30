import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { parseTime, timeDifferenceInHours, formatDateTime, formatTime } from "./timeUtils";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import type { Attendance } from "./types";
import { axiosInstance } from "@/api";

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editData: Attendance;
  setEditData: (data: Attendance) => void;
  attendance: Attendance;
}

const EditDialog: React.FC<EditDialogProps> = ({ isOpen, onClose, editData, setEditData, attendance }) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const timeIn = editData.timeIn ? parseTime(editData.timeIn) : null;
    const timeOut = editData.timeOut ? parseTime(editData.timeOut) : null;

    if (timeIn && timeOut) {
      const isTimeInPM = timeIn.hours >= 12;
      const isTimeOutAM = timeOut.hours < 12;

      if (isTimeInPM && isTimeOutAM) {
        setErrorMessage("Time In cannot be PM and Time Out be AM.");
        return;
      }

      if (timeOut.hours < timeIn.hours || (timeOut.hours === timeIn.hours && timeOut.minutes < timeIn.minutes)) {
        setErrorMessage("Time Out cannot be earlier than Time In.");
        return;
      }
    }

    const totalWorkHours = timeIn && timeOut ? timeDifferenceInHours(timeIn, timeOut) : 0;
    const overTimeTotal = editData.overTimeTotal || 0;
    const totalTime = totalWorkHours + overTimeTotal;

    const validWorkTimeTotal = totalWorkHours >= 0 ? totalWorkHours : null;

    const payload = {
      id: editData.id,
      employeeId: editData.employee.id,
      date: new Date(editData.date).toISOString(),
      status: editData.status,
      scheduleType: editData.scheduleType,
      timeIn: timeIn ? formatDateTime(editData.date, timeIn) : null,
      timeOut: timeOut ? formatDateTime(editData.date, timeOut) : null,
      timeHoursWorked: validWorkTimeTotal,
      overTimeTotal: overTimeTotal,
      timeTotal: totalTime.toFixed(2),
    };

    try {
      await axiosInstance.put(`/api/attendance/${attendance.id}`, payload);
      toast.success(`Successfully updated attendance on ${attendance.date}`);
      queryClient.invalidateQueries({ queryKey: ["attendanceList"] });
      handleClose();
    } catch (error) {
      toast.error("Error updating the attendance.");
      console.error("Error updating the attendance:", error);
    }
  };

  const handleClose = () => {
    setErrorMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Edit Attendance for {attendance.employee.lastName}, {attendance.employee.firstName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditSave} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={editData.status} onValueChange={(value) => setEditData({ ...editData, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONGOING">ONGOING</SelectItem>
                  <SelectItem value="BREAK">BREAK</SelectItem>
                  <SelectItem value="DONE">DONE</SelectItem>
                  <SelectItem value="PAID_LEAVE">PAID LEAVE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeIn">Time In</Label>
              <Input
                type="time"
                id="timeIn"
                value={editData.timeIn ? formatTime(parseTime(editData.timeIn)) : ""}
                onChange={(e) => setEditData({ ...editData, timeIn: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeOut">Time Out</Label>
              <Input
                type="time"
                id="timeOut"
                value={editData.timeOut ? formatTime(parseTime(editData.timeOut)) : ""}
                onChange={(e) => setEditData({ ...editData, timeOut: e.target.value })}
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;