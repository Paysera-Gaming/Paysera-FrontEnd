import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationComponent } from '../PaginationComponent';
import MessageCounts from './MessageCounts';
import CreateMessageDialog from './CreateMessageDialog';
import ReplyMessageDialog from './ReplyMessageDialog';
import SheetComponent from '../SheetComponent';
import { StarIcon } from '@heroicons/react/24/outline';

const MessageList = () => {
  const initialMessages = [
    {
      id: 1,
      sender: "John Doe",
      recipient: "You",
      subject: "Meeting Reminder",
      content: "Just a reminder about our meeting tomorrow at 10 AM.",
      date: "2024-08-19",
      status: "Unread",
      favorite: false,
    },
    {
      id: 2,
      sender: "Jane Smith",
      recipient: "You",
      subject: "Project Update",
      content: "Please review the attached document for the latest project update.",
      date: "2024-08-18",
      status: "Read",
      favorite: true,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [viewType, setViewType] = useState("Received");
  const [filterType, setFilterType] = useState(null); // null, "Favorites", "Unread"
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
      content: `Replying to ${message.sender}'s message: ${message.content}`
    });
    setIsReplyDialogOpen(true);
  
    // Mark the message as read when replying
    setMessages(messages.map(m => m.id === message.id ? { ...m, status: 'Read' } : m));
  };
  

  const handleViewMessage = (id) => {
    // Mark the message as read when viewed
    setMessages(messages.map(m => m.id === id ? { ...m, status: 'Read' } : m));
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const handleToggleFavorite = (id) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, favorite: !message.favorite } : message
    ));
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = viewType === "Received" ? message.sender !== "You" : message.sender === "You";
    const matchesFilter = filterType === "Favorites" ? message.favorite : filterType === "Unread" ? message.status === "Unread" : true;
    return matchesSearch && matchesView && matchesFilter;
  });

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getMessageCounts = () => {
    const counts = { Read: 0, Unread: 0, Sent: 0, Favorite: 0 };
    messages.forEach(message => {
      if (message.sender === "You") {
        counts.Sent++;
      } else {
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
        <button
          onClick={() => { setViewType("Received"); setFilterType(null); }}
          className={`p-3 rounded-lg shadow transition ${viewType === "Received" && !filterType ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Received Messages
        </button>
        <button
          onClick={() => { setViewType("Sent"); setFilterType(null); }}
          className={`p-3 rounded-lg shadow transition ${viewType === "Sent" && !filterType ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sent Messages
        </button>
        <button
          onClick={() => setFilterType("Favorites")}
          className={`p-3 rounded-lg shadow transition ${filterType === "Favorites" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Favorites
        </button>
        <button
  onClick={() => setFilterType("Unread")}
  className={`p-3 rounded-lg shadow transition ${filterType === "Unread" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
>
  Unread
</button>

        <input
          type="text"
          placeholder="Search by subject"
          value={searchQuery}
          onChange={handleSearch}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow max-w-xs"
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
              <TableCell onClick={() => handleViewMessage(message.id)}>{message.sender}</TableCell>
              <TableCell onClick={() => handleViewMessage(message.id)}>{message.subject}</TableCell>
              <TableCell onClick={() => handleViewMessage(message.id)}>{message.date}</TableCell>
              <TableCell onClick={() => handleViewMessage(message.id)}>{message.content}</TableCell>
              <TableCell>{message.status}</TableCell>
              <TableCell>
                <button onClick={() => handleToggleFavorite(message.id)}>
                  <StarIcon className={`w-6 h-6 ${message.favorite ? "text-yellow-500" : "text-gray-300"}`} />
                </button>
              </TableCell>
              <TableCell>
                {viewType === "Received" && (
                  <button
                    onClick={() => handleReply(message)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                  >
                    Reply
                  </button>
                )}
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition ml-2"
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
          setMessages([...messages, {
            ...newMessage,
            id: messages.length + 1,
            sender: "You",
            date: new Date().toISOString().split('T')[0],
            status: 'Sent',
            favorite: false
          }]);
          setIsCreateDialogOpen(false);
        }}
      />

      {replyMessage && (
        <ReplyMessageDialog
          isOpen={isReplyDialogOpen}
          onClose={() => setIsReplyDialogOpen(false)}
          message={replyMessage}
          onReply={(replyContent) => {
            setMessages([...messages, {
              id: messages.length + 1,
              sender: "You",
              recipient: replyMessage.sender,
              subject: `Re: ${replyMessage.subject}`,
              content: replyContent,
              date: new Date().toISOString().split('T')[0],
              status: 'Sent',
              favorite: false
            }]);
            setIsReplyDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default MessageList;
