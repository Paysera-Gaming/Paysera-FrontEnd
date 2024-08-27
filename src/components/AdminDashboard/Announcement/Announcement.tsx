import React, { useState, useEffect } from 'react';
import SheetComponent from '../SheetComponent';
import AnnouncementCounts from './AnnouncementCounts';
import AnnouncementTable from './AnnouncementTable';
import AnnouncementDialog from './AnnouncementDialog';
import useAnnouncements from './useAnnouncements';
import { PaginationComponent } from '../PaginationComponent';
import ConfirmationDialog from './ConfirmationDialog';

const Announcements = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<number | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const {
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
    handleFilterByStatus,
  } = useAnnouncements();

  const openDeleteDialog = (id: number) => {
    setAnnouncementToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setAnnouncementToDelete(null);
  };

  const confirmDeleteAnnouncement = () => {
    if (announcementToDelete !== null) {
      handleDeleteAnnouncement(announcementToDelete);
      closeDeleteDialog();
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-left">
          <h1>Announcement Dashboard</h1>
          <p className="header-subtitle">Stay updated with the latest announcements</p>
        </div>
        <div className="header-right">
          <SheetComponent />
          <div className="current-time">{currentTime}</div>
        </div>
      </header>
      
      <main className="main-content p-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Announcements"
              className="border p-2 rounded w-64"
            />
            <button
              onClick={handleOpenCreateDialog}
              className="bg-blue-600 text-white p-2 rounded"
            >
              Create New Announcement
            </button>
          </div>
        </div>

        <AnnouncementCounts
          announcementCounts={announcementCounts}
          onFilter={handleFilterByStatus}
        />

        <AnnouncementDialog
          newAnnouncement={newAnnouncement}
          handleCreateAnnouncement={handleCreateAnnouncement}
          isCreateDialogOpen={isCreateDialogOpen}
          handleCloseCreateDialog={handleCloseCreateDialog}
          setNewAnnouncement={setNewAnnouncement}
        />

        <AnnouncementTable
          announcements={paginatedAnnouncements}
          handleDeleteAnnouncement={openDeleteDialog}
          handleOpenEditDialog={handleOpenEditDialog}
          handleSort={handleSort}
        />

        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => handlePageChange(page)}
        />

        <ConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteAnnouncement}
          message="Are you sure you want to delete this announcement?"
        />
      </main>
    </div>
  );
};

export default Announcements;
