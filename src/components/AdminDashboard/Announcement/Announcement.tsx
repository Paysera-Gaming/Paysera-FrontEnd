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
    handlePageChange,
  } = useAnnouncements();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SheetComponent />
      <div className="flex justify-between mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search Announcements"
            className="border p-2 rounded"
          />
          <button
            onClick={handleOpenCreateDialog}
            className="bg-blue-600 text-white p-2 rounded"
          >
            Create New Announcement
          </button>
        </div>
      </div>

      <AnnouncementDialog
        newAnnouncement={newAnnouncement}
        handleCreateAnnouncement={handleCreateAnnouncement}
        isCreateDialogOpen={isCreateDialogOpen}
        handleCloseCreateDialog={handleCloseCreateDialog}
        setNewAnnouncement={setNewAnnouncement}
      />

      <h2 className="text-2xl font-semibold mb-6 text-center">Announcements</h2>

      <AnnouncementCounts announcementCounts={announcementCounts} />

      <AnnouncementTable
        announcements={paginatedAnnouncements}
        handleDeleteAnnouncement={handleDeleteAnnouncement}
        handleOpenEditDialog={handleOpenEditDialog}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Announcements;
