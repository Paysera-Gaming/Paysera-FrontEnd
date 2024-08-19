import { useState } from 'react';

const useAnnouncements = () => {
  const initialAnnouncements = [
    {
      id: 1,
      title: 'System Maintenance',
      date: '2024-08-01',
      content: 'System maintenance will be conducted on 2024-08-05.',
      status: 'Published',
    },
    {
      id: 2,
      title: 'New Feature Release',
      date: '2024-08-02',
      content: 'We are excited to announce a new feature release.',
      status: 'Draft',
    },
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
  });
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const itemsPerPage = 2;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((announcement) => announcement.id !== id));
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      if (editAnnouncementId) {
        // Edit existing announcement
        setAnnouncements(
          announcements.map((announcement) =>
            announcement.id === editAnnouncementId
              ? { ...announcement, ...newAnnouncement }
              : announcement
          )
        );
      } else {
        // Create new announcement
        setAnnouncements([
          ...announcements,
          {
            ...newAnnouncement,
            id: announcements.length + 1,
            date: new Date().toISOString().split('T')[0],
            status: 'Draft',
          },
        ]);
      }
      handleCloseCreateDialog();
      setNewAnnouncement({ title: '', content: '' });
    }
  };

  const handleOpenEditDialog = (id) => {
    const announcementToEdit = announcements.find((announcement) => announcement.id === id);
    if (announcementToEdit) {
      setEditAnnouncementId(id);
      setNewAnnouncement({ ...announcementToEdit });
      setIsCreateDialogOpen(true);
    }
  };

  const paginatedAnnouncements = announcements
    .filter((announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    announcements.filter((announcement) =>
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const announcementCounts = {
    Published: announcements.filter((a) => a.status === 'Published').length,
    Draft: announcements.filter((a) => a.status === 'Draft').length,
  };

  return {
    announcements,
    newAnnouncement,
    handleCreateAnnouncement,
    handleDeleteAnnouncement,
    handleOpenEditDialog,
    isCreateDialogOpen,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    searchQuery,
    handleSearch,
    paginatedAnnouncements,
    currentPage,
    totalPages,
    announcementCounts,
    setNewAnnouncement,
    handlePageChange,
  };
};

export default useAnnouncements;
