import { useState } from 'react';

const useAnnouncements = () => {
  const initialAnnouncements = [
    { id: 1, title: 'System Maintenance', date: '2024-08-01', content: 'System maintenance will be conducted on 2024-08-05.', status: 'Published' },
    { id: 2, title: 'New Feature Release', date: '2024-08-02', content: 'We are excited to announce a new feature release.', status: 'Draft' },
    // Add more announcements as needed for testing
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [editAnnouncementId, setEditAnnouncementId] = useState(null);
  const [sortOrder, setSortOrder] = useState({ field: '', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState(''); // Add filter status state

  const itemsPerPage = 5;

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
    const isDraft = !newAnnouncement.title || !newAnnouncement.content;
    const status = isDraft ? 'Draft' : 'Published';

    if (editAnnouncementId) {
      setAnnouncements(
        announcements.map((announcement) =>
          announcement.id === editAnnouncementId
            ? { ...announcement, ...newAnnouncement, status }
            : announcement
        )
      );
      setEditAnnouncementId(null);
    } else {
      setAnnouncements([
        ...announcements,
        {
          ...newAnnouncement,
          id: announcements.length + 1,
          date: new Date().toISOString().split('T')[0],
          status,
        },
      ]);
    }
    handleCloseCreateDialog();
    setNewAnnouncement({ title: '', content: '' });
  };

  const handleOpenEditDialog = (id) => {
    const announcementToEdit = announcements.find((announcement) => announcement.id === id);
    if (announcementToEdit) {
      setEditAnnouncementId(id);
      setNewAnnouncement({ ...announcementToEdit });
      setIsCreateDialogOpen(true);
    }
  };

  const handleSort = (field) => {
    const direction = sortOrder.field === field && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    const sortedAnnouncements = [...announcements].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setSortOrder({ field, direction });
    setAnnouncements(sortedAnnouncements);
  };

  const handleFilterByStatus = (status) => {
    setFilterStatus(status); // Update filter status
    setCurrentPage(1);
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterStatus ? announcement.status === filterStatus : true)
  );

  const paginatedAnnouncements = filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);

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
    handleSort,
    handleFilterByStatus, // Expose filter function
  };
};

export default useAnnouncements;
