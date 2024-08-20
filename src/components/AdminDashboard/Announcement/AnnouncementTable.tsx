import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AnnouncementTable = ({ announcements, handleDeleteAnnouncement, handleOpenEditDialog, handleSort }) => (
  <Table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
    <TableHeader>
      <TableRow>
        <TableHead className="text-center align-middle border border-gray-300">
          <button onClick={() => handleSort('title')}>Title</button>
        </TableHead>
        <TableHead className="text-center align-middle border border-gray-300">
          <button onClick={() => handleSort('date')}>Date</button>
        </TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Content</TableHead>
        <TableHead className="text-center align-middle border border-gray-300">
          <button onClick={() => handleSort('status')}>Status</button>
        </TableHead>
        <TableHead className="text-center align-middle border border-gray-300">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {announcements.map((announcement) => (
        <TableRow key={announcement.id}>
          <TableCell className="text-center align-middle border border-gray-300">{announcement.title}</TableCell>
          <TableCell className="text-center align-middle border border-gray-300">{announcement.date}</TableCell>
          <TableCell className="text-center align-middle border border-gray-300">{announcement.content}</TableCell>
          <TableCell className="text-center align-middle border border-gray-300">{announcement.status}</TableCell>
          <TableCell className="text-center align-middle border border-gray-300">
            <button onClick={() => handleOpenEditDialog(announcement.id)} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-500 transition">Edit</button>
            <button onClick={() => handleDeleteAnnouncement(announcement.id)} className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default AnnouncementTable;
