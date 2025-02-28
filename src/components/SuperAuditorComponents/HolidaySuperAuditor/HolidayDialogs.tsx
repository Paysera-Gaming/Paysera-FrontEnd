import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HolidayForm from './HolidayForm';

interface Holiday {
  id: number;
  name: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface HolidayDialogsProps {
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedHoliday: Holiday | null;
  handleFormSubmit: (newHoliday: Omit<Holiday, 'id' | 'createdAt' | 'updatedAt'>) => void;
  handleEditSubmit: (updatedHoliday: Omit<Holiday, 'createdAt' | 'updatedAt'>) => void;
  handleDeleteConfirm: () => void;
}

const HolidayDialogs: React.FC<HolidayDialogsProps> = ({
  isFormOpen,
  setIsFormOpen,
  isEditOpen,
  setIsEditOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedHoliday,
  handleFormSubmit,
  handleEditSubmit,
  handleDeleteConfirm
}) => {
  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Holiday</DialogTitle>
            <DialogDescription>
              Enter the details for your new holiday here.
            </DialogDescription>
          </DialogHeader>
          <HolidayForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {selectedHoliday && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Holiday</DialogTitle>
              <DialogDescription>
                Make changes to your holiday here.
              </DialogDescription>
            </DialogHeader>
            <HolidayForm 
              holiday={selectedHoliday} 
              onSubmit={(updatedHoliday) => handleEditSubmit({ ...updatedHoliday, id: selectedHoliday.id })} 
              onCancel={() => setIsEditOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this holiday? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HolidayDialogs;