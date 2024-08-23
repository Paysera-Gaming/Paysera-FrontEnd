import React from 'react';
import { BookCheck, BookDashed } from 'lucide-react'; // Import the BookCheck and BookDashed icons

const AnnouncementCounts = ({ announcementCounts }) => (
  <div className="mb-0 flex justify-between">
    {/* Published Announcements */}
    <div className="flex-1 bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <BookCheck className="w-8 h-8 text-blue-600" /> {/* Use BookCheck icon for Published */}
          <p className="text-4xl font-bold text-black ml-2">
            {announcementCounts.Published}
          </p>
        </div>
        <p className="text-lg font-semibold text-blue-600">Published</p>
      </div>
    </div>

    {/* Draft Announcements */}
    <div className="flex-1 bg-red-100 p-4 rounded-lg border border-red-300 shadow-sm mx-4 text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <BookDashed className="w-8 h-8 text-red-600" /> {/* Use BookDashed icon for Draft */}
          <p className="text-4xl font-bold text-black ml-2">
            {announcementCounts.Draft}
          </p>
        </div>
        <p className="text-lg font-semibold text-red-600">Draft</p>
      </div>
    </div>
  </div>
);

export default AnnouncementCounts;
