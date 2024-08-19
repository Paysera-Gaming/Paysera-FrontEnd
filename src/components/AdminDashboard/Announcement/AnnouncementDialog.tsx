import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const AnnouncementDialog = ({ newAnnouncement, handleCreateAnnouncement, isCreateDialogOpen, handleCloseCreateDialog, setNewAnnouncement }) => (
  <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseCreateDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Announcement</DialogTitle>
        <DialogDescription>Fill out the form below to create a new announcement.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 p-6">
        <Input
          type="text"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          placeholder="Enter announcement title"
        />
        <Textarea
          value={newAnnouncement.content}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
          placeholder="Enter announcement content"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={handleCloseCreateDialog} className="p-2 bg-gray-600 text-white rounded-lg">Cancel</button>
          <button onClick={handleCreateAnnouncement} className="p-2 bg-green-600 text-white rounded-lg">Create</button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default AnnouncementDialog;
