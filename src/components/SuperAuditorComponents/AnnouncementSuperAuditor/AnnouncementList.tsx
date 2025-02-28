import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from 'sonner';
import { PlusIcon, Edit2, Trash2 } from 'lucide-react';
import AnnouncementDialogs from './AnnouncementDialogs';
import AnnouncementPagination from './AnnouncementPagination';
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
        <AnnouncementPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalAnnouncements={filteredAnnouncements.length}
          announcementsPerPage={announcementsPerPage}
        />
      )}

      <AnnouncementDialogs
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedAnnouncement={selectedAnnouncement}
        handleFormSubmit={handleFormSubmit}
        handleEditSubmit={handleEditSubmit}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AnnouncementList;