import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { PlusIcon, Edit2, Trash2 } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = import.meta.env.VITE_BASE_API;

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const fetchAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const response = await axiosInstance.get('/api/announcements');
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (typeof response.data === 'object' && response.data !== null) {
      return [response.data];
    }
    return [];
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

const AnnouncementList: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: announcements = [], isLoading, isError, error } = useQuery<Announcement[], Error>({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const addAnnouncementMutation = useMutation({
    mutationFn: (newAnnouncement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => 
      axiosInstance.post('/api/announcements', newAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement added successfully!');
    },
    onError: (error) => {
      console.error('Error adding announcement:', error);
      toast.error('Failed to add announcement. Please try again.');
    },
  });

  const editAnnouncementMutation = useMutation({
    mutationFn: (updatedAnnouncement: Announcement) => 
      axiosInstance.put(`/api/announcements/${updatedAnnouncement.id}`, updatedAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement updated successfully!');
    },
    onError: (error) => {
      console.error('Error updating announcement:', error);
      toast.error('Failed to update announcement. Please try again.');
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: (id: number) => axiosInstance.delete(`/api/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement. Please try again.');
    },
  });

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  const handleFormSubmit = (newAnnouncement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => {
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading announcements: {error?.message}</div>;
  }

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
          {filteredAnnouncements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Body</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>{announcement.title}</TableCell>
                    <TableCell>{announcement.body}</TableCell>
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
          ) : (
            <div className="text-center py-4">No announcements found.</div>
          )}
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
              onSubmit={(updatedAnnouncement) => handleEditSubmit({ ...selectedAnnouncement, ...updatedAnnouncement })} 
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
  onSubmit: (announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ announcement, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(announcement?.title || '');
  const [body, setBody] = useState(announcement?.body || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      onSubmit({ title, body });
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
        <Textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default AnnouncementList;