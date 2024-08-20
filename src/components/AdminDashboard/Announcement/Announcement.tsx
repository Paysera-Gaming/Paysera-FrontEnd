import React from 'react';
import SheetComponent from '../SheetComponent';
import AnnouncementCounts from './AnnouncementCounts';
import AnnouncementTable from './AnnouncementTable';
import AnnouncementDialog from './AnnouncementDialog';
import useAnnouncements from './useAnnouncements';
import { PaginationComponent } from '../PaginationComponent';

const Announcements = () => {
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
    handleSort, // Added handleSort
  } = useAnnouncements();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Announcements</h2>

      <AnnouncementCounts announcementCounts={announcementCounts} />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleOpenCreateDialog}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Create New Announcement
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Announcements"
            className="border p-2 rounded w-64"
          />
        </div>
      </div>

      <AnnouncementDialog
        newAnnouncement={newAnnouncement}
        handleCreateAnnouncement={handleCreateAnnouncement}
        isCreateDialogOpen={isCreateDialogOpen}
        handleCloseCreateDialog={handleCloseCreateDialog}
        setNewAnnouncement={setNewAnnouncement}
      />

      <AnnouncementTable
        announcements={paginatedAnnouncements}
        handleDeleteAnnouncement={handleDeleteAnnouncement}
        handleOpenEditDialog={handleOpenEditDialog}
        handleSort={handleSort} // Pass handleSort here
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => handlePageChange(page)}
      />
    </div>
  );
};

export default Announcements;
