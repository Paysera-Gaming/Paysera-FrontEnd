import { useState } from 'react';

const useAnnouncements = () => {
  const initialAnnouncements = [
    { id: 1, title: 'System Maintenance', date: '2024-08-01', content: 'System maintenance will be conducted on 2024-08-05.', status: 'Published' },
    { id: 2, title: 'New Feature Release', date: '2024-08-02', content: 'We are excited to announce a new feature release.', status: 'Draft' },
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const itemsPerPage = 2;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1, date: new Date().toISOString().split('T')[0], status: 'Published' }]);
      setNewAnnouncement({ title: '', content: '' });
      handleCloseCreateDialog();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getAnnouncementCounts = () => {
    const counts = { Published: 0, Draft: 0 };
    announcements.forEach(announcement => {
      if (counts[announcement.status] !== undefined) {
        counts[announcement.status]++;
      }
    });
    return counts;
  };

  const announcementCounts = getAnnouncementCounts();

  return {
    announcements,
    newAnnouncement,
    handleCreateAnnouncement,
    setNewAnnouncement,
    handleSearch,
    handleDeleteAnnouncement,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    paginatedAnnouncements,
    totalPages,
    currentPage,
    handlePageChange,
    announcementCounts,
  };
};

export default useAnnouncements;
