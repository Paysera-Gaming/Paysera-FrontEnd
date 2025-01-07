import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/api';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"; // Import Label component
import { toast } from 'sonner';
import { PlusIcon, Edit2, Trash2 } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  body: string;
  limitDateDisplay: string;
}

const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const response = await axiosInstance.get('/api/announcement');
  return response.data;
};

const AnnouncementList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: announcements = [] } = useQuery<Announcement[], Error>({
    queryKey: ['announcement'],
    queryFn: fetchAnnouncements,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const addAnnouncementMutation = useMutation({
    mutationFn: (newAnnouncement: Omit<Announcement, 'id'>) => axiosInstance.post('/api/announcement', newAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcement'] });
      toast.success('Announcement added successfully!');
    },
  });

  const editAnnouncementMutation = useMutation({
    mutationFn: (updatedAnnouncement: Announcement) => axiosInstance.put(`/api/announcement/${updatedAnnouncement.id}`, updatedAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcement'] });
      toast.success('Announcement updated successfully!');
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/api/announcement/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcement'] });
      toast.success('Announcement deleted successfully!');
    },
  });

  const filteredAnnouncements = announcements.filter((announcement) => {
    return announcement.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFormSubmit = (newAnnouncement: Omit<Announcement, 'id'>) => {
    addAnnouncementMutation.mutate(newAnnouncement);
    setIsFormOpen(false);
  };

  const handleEditSubmit = (updatedAnnouncement: Announcement) => {
    editAnnouncementMutation.mutate(updatedAnnouncement);
    setIsEditOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedAnnouncement) {
      deleteAnnouncementMutation.mutate(selectedAnnouncement.id);
      setIsDeleteDialogOpen(false);
      setSelectedAnnouncement(null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search announcement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Announcement
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Body</TableHead>
                <TableHead>Limit Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>{announcement.title}</TableCell>
                  <TableCell>{announcement.body}</TableCell>
                  <TableCell>{announcement.limitDateDisplay}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setIsEditOpen(true);
                      }}>
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setSelectedAnnouncement(announcement);
                        setIsDeleteDialogOpen(true);
                      }}>
                        <Trash2 size={16} className="mr-2" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Make changes to your announcement here.
              </DialogDescription>
            </DialogHeader>
            <AnnouncementForm 
              announcement={selectedAnnouncement} 
              onSubmit={(updatedAnnouncement) => handleEditSubmit({ ...updatedAnnouncement, id: selectedAnnouncement.id })} 
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
              Are you sure you want to delete this announcement? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface AnnouncementFormProps {
  announcement?: Announcement;
  onSubmit: (announcement: Omit<Announcement, 'id'>) => void;
  onCancel: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ announcement, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(announcement?.title || '');
  const [body, setBody] = useState(announcement?.body || '');
  const [limitDateDisplay, setLimitDateDisplay] = useState(announcement?.limitDateDisplay || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body && limitDateDisplay) {
      onSubmit({ title, body, limitDateDisplay });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="body">Body</Label>
        <Input id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="limitDateDisplay">Limit Date</Label>
        <Input id="limitDateDisplay" value={limitDateDisplay} onChange={(e) => setLimitDateDisplay(e.target.value)} required />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default AnnouncementList;