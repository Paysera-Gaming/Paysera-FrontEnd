// MessageList.js
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationComponent } from '../PaginationComponent';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline';
import MessageCounts from './MessageCounts';
import CreateMessageDialog from './CreateMessageDialog';
import ReplyMessageDialog from './ReplyMessageDialog';
import SheetComponent from '../SheetComponent';

const MessageList = () => {
  const initialMessages = [
    {
      id: 1,
      sender: 'John Doe',
      subject: 'Meeting Reminder',
      content: 'Just a reminder about our meeting tomorrow at 10 AM.',
      date: '2024-08-19',
      status: 'Read',
      favorite: true,
    },
    {
      id: 2,
      sender: 'Jane Smith',
      subject: 'Project Update',
      content: 'The project status has been updated. Please check the document.',
      date: '2024-08-18',
      status: 'Unread',
      favorite: false,
    },
    // More sample messages
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({ recipient: '', subject: '', content: '' });
  const [replyMessage, setReplyMessage] = useState(null);
  const itemsPerPage = 2;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleReply = (message) => {
    setReplyMessage(message);
    setNewMessage({
      recipient: message.sender,
      subject: `Re: ${message.subject}`,
      content: `Replying to ${message.sender}'s message: ${message.content}`,
    });
    setIsReplyDialogOpen(true);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  const toggleFavorite = (id) => {
    setMessages(
      messages.map((message) =>
        message.id === id ? { ...message, favorite: !message.favorite } : message
      )
    );
  };

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getMessageCounts = () => {
    const counts = { Read: 0, Unread: 0, Sent: 0, Favorite: 0 };
    messages.forEach((message) => {
      if (counts[message.status] !== undefined) {
        counts[message.status]++;
      }
      if (message.favorite) {
        counts.Favorite++;
      }
    });
    return counts;
  };

  const messageCounts = getMessageCounts();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Messages</h2>
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="p-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create New Message
        </button>
        <button className="p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Received Messages
        </button>
        <button className="p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Sent Messages
        </button>
        <input
          type="text"
          placeholder="Search by subject"
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs"
        />
      </div>

      <MessageCounts messageCounts={messageCounts} />

      <SheetComponent /> {/* Include SheetComponent if needed */}

      <Table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <TableCaption>Details of your messages.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Favorite</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMessages.map((message) => (
            <TableRow key={message.id}>
              <TableCell>{message.sender}</TableCell>
              <TableCell>{message.subject}</TableCell>
              <TableCell>{message.date}</TableCell>
              <TableCell>{message.content}</TableCell>
              <TableCell>{message.status}</TableCell>
              <TableCell>
                <button onClick={() => toggleFavorite(message.id)}>
                  {message.favorite ? (
                    <SolidStarIcon className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <OutlineStarIcon className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleReply(message)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
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

      <CreateMessageDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onCreate={() => {
          setMessages([
            ...messages,
            {
              ...newMessage,
              id: messages.length + 1,
              date: new Date().toISOString().split('T')[0],
              status: 'Sent',
            },
          ]);
          setNewMessage({ recipient: '', subject: '', content: '' });
        }}
      />

      <ReplyMessageDialog
        isOpen={isReplyDialogOpen}
        onClose={() => setIsReplyDialogOpen(false)}
        replyMessage={replyMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
      />
    </div>
  );
};

export default MessageList;
