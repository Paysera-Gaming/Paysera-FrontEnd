import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AnnouncementPagination from './AnnouncementPagination';
import { fetchAnnouncements } from './api';

interface Announcement {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const AnnouncementList: React.FC = () => {
  const { data: announcements = [], isLoading, isError, error } = useQuery<Announcement[], Error>({
    queryKey: ['announcements'],
    queryFn: fetchAnnouncements,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  const sortedAnnouncements = announcements.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
    announcement?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading announcements: {error?.message}</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search announcement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardContent>
          {currentAnnouncements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Body</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>{announcement.title}</TableCell>
                    <TableCell>{announcement.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4">No announcements found.</div>
          )}
        </CardContent>
      </Card>

      {filteredAnnouncements.length > announcementsPerPage && (
        <AnnouncementPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalAnnouncements={filteredAnnouncements.length}
          announcementsPerPage={announcementsPerPage}
        />
      )}
    </div>
  );
};

export default AnnouncementList;