import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';
import { PaginationComponent } from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/PaginationComponent.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MegaphoneIcon } from '@heroicons/react/24/outline';

const AnnouncementCounts = ({ announcementCounts }) => (
  <div className="mb-6 flex justify-between text-center">
    <div className="flex-1 bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm">
      <MegaphoneIcon className="w-8 h-8 text-blue-600 mb-2 mx-auto" />
      <p className="text-lg font-semibold text-blue-600">Published</p>
      <p className="text-2xl font-bold text-black">{announcementCounts.Published}</p>
    </div>
    <div className="flex-1 bg-red-100 p-4 rounded-lg border border-red-300 shadow-sm mx-4">
      <MegaphoneIcon className="w-8 h-8 text-red-600 mb-2 mx-auto" />
      <p className="text-lg font-semibold text-red-600">Draft</p>
      <p className="text-2xl font-bold text-black">{announcementCounts.Draft}</p>
    </div>
  </div>
);

const Announcements = () => {
  const initialAnnouncements = [
    { id: 1, title: 'System Maintenance', date: '2024-08-01', content: 'System maintenance will be conducted on 2024-08-05.', status: 'Published' },
    { id: 2, title: 'New Feature Release', date: '2024-08-02', content: 'We are excited to announce a new feature release.', status: 'Draft' },
  ];

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const itemsPerPage = 2;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title && newAnnouncement.content) {
      setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1, date: new Date().toISOString().split('T')[0], status: 'Published' }]);
      setNewAnnouncement({ title: '', content: '' });
      handleCloseCreateDialog();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Announcements</h2>
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={handleOpenCreateDialog}
          className="p-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create New Announcement
        </button>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
        />
      </div>

      <AnnouncementCounts announcementCounts={announcementCounts} />

      <Table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <TableCaption>Details of your announcements.</TableCaption>
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
          {paginatedAnnouncements.map((announcement) => (
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

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Announcement</DialogTitle>
            <DialogDescription>Fill out the form below to create a new announcement.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <Input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                placeholder="Enter announcement title"
                className="p-3 border rounded-lg shadow-sm w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content</label>
              <Textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                placeholder="Enter announcement content"
                className="p-3 border rounded-lg shadow-sm w-full"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={handleCloseCreateDialog}
                className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateAnnouncement}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Announcement
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Announcements;
