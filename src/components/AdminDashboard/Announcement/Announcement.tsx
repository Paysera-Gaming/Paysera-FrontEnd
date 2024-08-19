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
    handleOpenEditDialog, // Add this line
    handleDeleteAnnouncement,
    handleOpenCreateDialog,
    isCreateDialogOpen,
    isEditDialogOpen,
    handleCloseCreateDialog,
    handleCloseEditDialog,
    setNewAnnouncement,
    selectedAnnouncement,
    handleEditAnnouncement,
    paginatedAnnouncements,
    totalPages,
    currentPage,
    handlePageChange,
    announcementCounts
  } = useAnnouncements();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Announcements</h2>
      
      <AnnouncementDialog 
        newAnnouncement={newAnnouncement} 
        handleCreateAnnouncement={handleCreateAnnouncement} 
        isCreateDialogOpen={isCreateDialogOpen}
        handleCloseCreateDialog={handleCloseCreateDialog}
        setNewAnnouncement={setNewAnnouncement}
      />
      
      {/* Edit Dialog */}
      {selectedAnnouncement && (
        <AnnouncementDialog
          newAnnouncement={newAnnouncement}
          handleCreateAnnouncement={handleEditAnnouncement}
          isCreateDialogOpen={isEditDialogOpen}
          handleCloseCreateDialog={handleCloseEditDialog}
          setNewAnnouncement={setNewAnnouncement}
        />
      )}
      
      <AnnouncementCounts announcementCounts={announcementCounts} />

      <AnnouncementTable
        announcements={paginatedAnnouncements}
        handleDeleteAnnouncement={handleDeleteAnnouncement}
        handleOpenEditDialog={handleOpenEditDialog} // Pass it here
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
