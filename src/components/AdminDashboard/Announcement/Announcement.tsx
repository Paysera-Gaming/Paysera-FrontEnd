import React, { useState } from 'react';
import SheetComponent from '../SheetComponent';
import AnnouncementCounts from './AnnouncementCounts';
import AnnouncementTable from './AnnouncementTable';
import AnnouncementDialog from './AnnouncementDialog';
import useAnnouncements from './useAnnouncements';
import { PaginationComponent } from '../PaginationComponent';

const Announcements = () => {
  const { announcements, newAnnouncement, handleCreateAnnouncement, ...rest } = useAnnouncements();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Announcements</h2>
      
      <AnnouncementDialog 
        newAnnouncement={newAnnouncement} 
        handleCreateAnnouncement={handleCreateAnnouncement} 
        {...rest} 
      />
      
      <AnnouncementCounts announcementCounts={rest.announcementCounts} />

      <AnnouncementTable
        announcements={rest.paginatedAnnouncements}
        handleDeleteAnnouncement={rest.handleDeleteAnnouncement}
      />

      <PaginationComponent
        currentPage={rest.currentPage}
        totalPages={rest.totalPages}
        onPageChange={rest.handlePageChange}
      />
    </div>
  );
};

export default Announcements;
