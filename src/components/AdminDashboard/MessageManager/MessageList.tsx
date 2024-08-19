import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationComponent } from '../PaginationComponent';
import MessageCounts from './MessageCounts';
import CreateMessageDialog from './CreateMessageDialog';
import ReplyMessageDialog from './ReplyMessageDialog';
import SheetComponent from '../SheetComponent';

const MessageList = () => {
  const initialMessages = [
    // Initial messages array
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [viewType, setViewType] = useState("Received"); // "Received" or "Sent"
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
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (viewType === "Received" ? message.sender !== "You" : message.sender === "You")
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getMessageCounts = () => {
    const counts = { Read: 0, Unread: 0 };
    messages.forEach(message => {
      if (counts[message.status] !== undefined) {
        counts[message.status]++;
      }
    });
    return counts;
  };

  const messageCounts = getMessageCounts();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Messages</h2>
      {/* Flex container to align buttons and search bar horizontally */}
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="p-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create New Message
        </button>
        <button
          onClick={() => setViewType("Received")}
          className={`p-3 rounded-lg shadow transition ${viewType === "Received" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Received Messages
        </button>
        <button
          onClick={() => setViewType("Sent")}
          className={`p-3 rounded-lg shadow transition ${viewType === "Sent" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Sent Messages
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
                {viewType === "Received" && (
                  <button
                    onClick={() => handleReply(message)}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Reply
                  </button>
                )}
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
          setMessages([...messages, {
            ...newMessage,
            id: messages.length + 1,
            sender: "You", // Set sender to "You"
            date: new Date().toISOString().split('T')[0],
            status: 'Unread'
          }]);
          setNewMessage({ recipient: '', subject: '', content: '' });
        }}
      />

      <ReplyMessageDialog
        isOpen={isReplyDialogOpen}
        onClose={() => setIsReplyDialogOpen(false)}
        replyMessage={replyMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onReply={() => {
          if (replyMessage) {
            const { sender, subject } = replyMessage;
            setMessages([...messages, {
              recipient: sender,
              sender: "You", // Set sender to "You"
              subject: `Re: ${subject}`,
              content: newMessage.content,
              id: messages.length + 1,
              date: new Date().toISOString().split('T')[0],
              status: 'Unread'
            }]);
            setReplyMessage(null);
            setNewMessage({ recipient: '', subject: '', content: '' });
          }
        }}
      />
    </div>
  );
};

export default MessageList;
