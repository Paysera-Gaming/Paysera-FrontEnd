import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AnnouncementForm from './AnnouncementForm';

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface AnnouncementDialogsProps {
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedAnnouncement: Announcement | null;
  handleFormSubmit: (newAnnouncement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => void;
  handleEditSubmit: (updatedAnnouncement: Announcement) => void;
  handleDeleteConfirm: () => void;
}

const AnnouncementDialogs: React.FC<AnnouncementDialogsProps> = ({
  isFormOpen,
  setIsFormOpen,
  isEditOpen,
  setIsEditOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedAnnouncement,
  handleFormSubmit,
  handleEditSubmit,
  handleDeleteConfirm
}) => {
  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[800px] sm:max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Add New Announcement</DialogTitle>
            <DialogDescription>
              Enter the details for your new announcement here.
            </DialogDescription>
          </DialogHeader>
          <AnnouncementForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      {selectedAnnouncement && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[800px] sm:max-h-[800px]">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Make changes to your announcement here.
              </DialogDescription>
            </DialogHeader>
            <AnnouncementForm 
              announcement={selectedAnnouncement} 
              onSubmit={(updatedAnnouncement) => handleEditSubmit({ ...selectedAnnouncement, ...updatedAnnouncement })} 
              onCancel={() => setIsEditOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[800px] sm:max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this announcement? This action cannot be undone.
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

export default AnnouncementDialogs;