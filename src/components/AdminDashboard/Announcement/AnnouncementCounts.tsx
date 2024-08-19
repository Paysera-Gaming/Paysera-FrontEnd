import React from 'react';
import { MegaphoneIcon } from '@heroicons/react/24/outline';

const AnnouncementCounts = ({ announcementCounts }) => (
  <div className="mb-6 flex justify-between">
    {/* Published Announcements */}
    <div className="flex-1 bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <MegaphoneIcon className="w-8 h-8 text-blue-600" /> {/* Larger icon */}
          <p className="text-4xl font-bold text-black ml-2">{announcementCounts.Published}</p> {/* Larger count */}
        </div>
        <p className="text-lg font-semibold text-blue-600">Published</p> {/* Label below */}
      </div>
    </div>

    {/* Draft Announcements */}
    <div className="flex-1 bg-red-100 p-4 rounded-lg border border-red-300 shadow-sm mx-4 text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <MegaphoneIcon className="w-8 h-8 text-red-600" /> {/* Larger icon */}
          <p className="text-4xl font-bold text-black ml-2">{announcementCounts.Draft}</p> {/* Larger count */}
        </div>
        <p className="text-lg font-semibold text-red-600">Draft</p> {/* Label below */}
      </div>
    </div>
  </div>
);

export default AnnouncementCounts;
