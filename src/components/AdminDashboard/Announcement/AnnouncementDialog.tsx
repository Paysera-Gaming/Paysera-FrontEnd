import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AnnouncementDialog = ({
  newAnnouncement,
  selectedAnnouncement,
  handleCreateAnnouncement,
  handleEditAnnouncement,
  isCreateDialogOpen,
  isEditDialogOpen,
  handleCloseCreateDialog,
  handleCloseEditDialog,
  setNewAnnouncement,
  setSelectedAnnouncement,
}) => {
  const isEditing = Boolean(selectedAnnouncement);

  return (
    <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={isEditing ? handleCloseEditDialog : handleCloseCreateDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Announcement' : 'Create New Announcement'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the announcement details below.' : 'Fill out the form below to create a new announcement.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <Input
            type="text"
            value={isEditing ? selectedAnnouncement?.title : newAnnouncement.title}
            onChange={(e) =>
              isEditing
                ? setSelectedAnnouncement({ ...selectedAnnouncement, title: e.target.value })
                : setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
            }
            placeholder="Enter announcement title"
          />
          <Textarea
            value={isEditing ? selectedAnnouncement?.content : newAnnouncement.content}
            onChange={(e) =>
              isEditing
                ? setSelectedAnnouncement({ ...selectedAnnouncement, content: e.target.value })
                : setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
            }
            placeholder="Enter announcement content"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={isEditing ? handleCloseEditDialog : handleCloseCreateDialog} className="p-2 bg-gray-600 text-white rounded-lg">
              Cancel
            </button>
            <button onClick={isEditing ? handleEditAnnouncement : handleCreateAnnouncement} className="p-2 bg-green-600 text-white rounded-lg">
              {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementDialog;
