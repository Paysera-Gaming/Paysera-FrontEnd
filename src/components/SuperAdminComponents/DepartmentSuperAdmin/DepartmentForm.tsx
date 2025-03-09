"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Leader, Auditor, addDepartment, updateDepartment, updateDepartmentLeader, Department } from './api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface DepartmentFormProps {
  editingDepartment: Department | null;
  setEditingDepartment: (department: Department | null) => void;
  teamLeaders: Leader[];
  auditors: Auditor[]; // Add auditors prop
  departments: Department[];
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ editingDepartment, setEditingDepartment, teamLeaders, auditors, departments }) => {
  const queryClient = useQueryClient();
  const [departmentName, setDepartmentName] = useState('');
  const [departmentLeaderId, setDepartmentLeaderId] = useState<number | null>(null);
  const [departmentAuditorId, setDepartmentAuditorId] = useState<number | null>(null); // Add state for auditor
  const [errorMessage, setErrorMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (editingDepartment) {
      setDepartmentName(editingDepartment.name);
      setDepartmentLeaderId(editingDepartment.leaderId);
      setDepartmentAuditorId(editingDepartment.auditorId || null); // Set auditorId if available
      setIsDialogOpen(true);
    } else {
      setDepartmentName('');
      setDepartmentLeaderId(null);
      setDepartmentAuditorId(null); // Reset auditorId
    }
  }, [editingDepartment]);

  const addDepartmentMutation = useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Department added successfully!');
    },
    onError: () => {
      toast.error('Error adding department.');
    }
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Department updated successfully!');
    },
    onError: () => {
      toast.error('Error updating department.');
    }
  });

  const updateDepartmentLeaderMutation = useMutation({
    mutationFn: updateDepartmentLeader,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      toast.success('Department leader updated successfully!');
    },
    onError: () => {
      toast.error('Error updating department leader.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName || departmentLeaderId === null) {
      toast.error('Please provide both department name and leader ID.');
      return;
    }

    if (editingDepartment) {
      updateDepartmentMutation.mutate({
        id: editingDepartment.id,
        name: departmentName,
        auditorId: departmentAuditorId, // Include auditorId
      });
      if (editingDepartment.leaderId !== departmentLeaderId) {
        updateDepartmentLeaderMutation.mutate({
          id: editingDepartment.id,
          leaderId: departmentLeaderId,
        });
      }
      setEditingDepartment(null);
    } else {
      addDepartmentMutation.mutate({ name: departmentName, leaderId: departmentLeaderId, auditorId: departmentAuditorId });
    }

    setDepartmentName('');
    setDepartmentLeaderId(null);
    setDepartmentAuditorId(null); // Reset auditorId
    setErrorMessage('');
    setIsDialogOpen(false);
  };

  const availableTeamLeaders = teamLeaders.filter((leader) => {
    return !departments.some((department) => department.leaderId === leader.id && department.id !== editingDepartment?.id);
  });

  const availableAuditors = auditors.filter((auditor) => {
    return !departments.some((department) => department.auditorId === auditor.id && department.id !== editingDepartment?.id);
  });

  const handleCancel = () => {
    setEditingDepartment(null);
    setErrorMessage('');
    setIsDialogOpen(false);
  };

  const handleDialogChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      setErrorMessage('');
    }
  };

  return (
    <>
      <Button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 dark:text-white flex items-center"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus className="mr-2" />
        {editingDepartment ? 'Edit Department' : 'Add Department'}
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDepartment ? 'Edit Department' : 'Add Department'}</DialogTitle>
            <DialogDescription>
              {editingDepartment ? 'Update the department details.' : 'Create a new department.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {errorMessage && (
                <div className="col-span-4 text-red-500">
                  {errorMessage}
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentName" className="text-right">
                  Department Name
                </Label>
                <Input
                  id="departmentName"
                  placeholder="Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentLeader" className="text-right">
                  Team Leader
                </Label>
                {availableTeamLeaders.length > 0 ? (
                  <Select onValueChange={(value) => setDepartmentLeaderId(Number(value))}>
                    <SelectTrigger id="departmentLeader" className="col-span-3">
                      <SelectValue placeholder="Select Team Leader" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {availableTeamLeaders.map((leader: Leader) => (
                        <SelectItem key={leader.id} value={leader.id.toString()}>
                          {leader.firstName} {leader.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="col-span-3 text-gray-500">No team leader is available</div>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="departmentAuditor" className="text-right">
                  Auditor
                </Label>
                {availableAuditors.length > 0 ? (
                  <Select onValueChange={(value) => setDepartmentAuditorId(Number(value))}>
                    <SelectTrigger id="departmentAuditor" className="col-span-3">
                      <SelectValue placeholder="Select Auditor" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {availableAuditors.map((auditor: Auditor) => (
                        <SelectItem key={auditor.id} value={auditor.id.toString()}>
                          {auditor.firstName} {auditor.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="col-span-3 text-gray-500">No auditor is available</div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit" className="dark:text-white">
                {editingDepartment ? 'Update Department' : 'Add Department'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepartmentForm;