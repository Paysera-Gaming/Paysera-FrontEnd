import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AnnouncementTable = ({ announcements, handleDeleteAnnouncement }) => (
  <Table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Content</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {announcements.map((announcement) => (
        <TableRow key={announcement.id}>
          <TableCell>{announcement.title}</TableCell>
          <TableCell>{announcement.date}</TableCell>
          <TableCell>{announcement.content}</TableCell>
          <TableCell>{announcement.status}</TableCell>
          <TableCell>
            <button
              onClick={() => handleDeleteAnnouncement(announcement.id)}
              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition ml-2"
            >
              Delete
            </button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default AnnouncementTable;
