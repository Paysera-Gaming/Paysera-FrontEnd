import { useState } from 'react';

const useAnnouncements = () => {
  // Initial announcements data
  const initialAnnouncements = [
    { id: 1, title: 'System Maintenance', date: '2024-08-01', content: 'System maintenance will be conducted on 2024-08-05.', status: 'Published' },
    { id: 2, title: 'New Feature Release', date: '2024-08-02', content: 'We are excited to announce a new feature release.', status: 'Draft' },
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const itemsPerPage = 2;

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Handle delete action
  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  // Handle opening the create dialog
  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  // Handle closing the create dialog
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  // Handle opening the edit dialog
  const handleOpenEditDialog = (announcement) => {
    setSelectedAnnouncement(announcement);
    setNewAnnouncement({ title: announcement.title, content: announcement.content });
    setIsEditDialogOpen(true);
  };

  // Handle closing the edit dialog
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedAnnouncement(null);
  };

  // Handle create announcement
  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1, date: new Date().toISOString().split('T')[0], status: 'Published' }]);
      setNewAnnouncement({ title: '', content: '' });
      handleCloseCreateDialog();
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Handle edit announcement
  const handleEditAnnouncement = () => {
    setAnnouncements(announcements.map(announcement =>
      announcement.id === selectedAnnouncement.id
        ? { ...selectedAnnouncement, title: newAnnouncement.title, content: newAnnouncement.content }
        : announcement
    ));
    handleCloseEditDialog();
  };

  // Filter and paginate announcements
  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get announcement counts by status
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
    setNewAnnouncement,
    handleCreateAnnouncement,
    handleDeleteAnnouncement,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleEditAnnouncement,
    selectedAnnouncement,
    isCreateDialogOpen,
    isEditDialogOpen,
    paginatedAnnouncements,
    totalPages,
    currentPage,
    handlePageChange,
    announcementCounts,
    handleSearch,
  };
};

export default useAnnouncements;
