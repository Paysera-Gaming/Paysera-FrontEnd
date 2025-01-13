import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from 'sonner';
import { PlusIcon, Edit2, Trash2 } from 'lucide-react';
import AnnouncementForm from './AnnouncementForm';
import { fetchAnnouncements, addAnnouncement, editAnnouncement, deleteAnnouncement } from './api';

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

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
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const addAnnouncementMutation = useMutation({
    mutationFn: addAnnouncement,
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
    mutationFn: editAnnouncement,
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
    mutationFn: deleteAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete announcement. Please try again.');
    },
  });

  const sortedAnnouncements = announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
    announcement?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

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
          {currentAnnouncements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Body</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAnnouncements.map((announcement) => (
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

      {filteredAnnouncements.length > announcementsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: Math.ceil(filteredAnnouncements.length / announcementsPerPage) }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredAnnouncements.length / announcementsPerPage)))}
                className={currentPage === Math.ceil(filteredAnnouncements.length / announcementsPerPage) ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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

export default AnnouncementList;