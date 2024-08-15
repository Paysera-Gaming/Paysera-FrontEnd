import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';
import { PaginationComponent } from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/PaginationComponent.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EnvelopeOpenIcon, InboxIcon } from '@heroicons/react/24/outline';

const MessageCounts = ({ messageCounts }) => (
  <div className="mb-6 flex justify-between text-center">
    <div className="flex-1 bg-green-100 p-4 rounded-lg border border-green-300 shadow-sm">
      <EnvelopeOpenIcon className="w-8 h-8 text-green-600 mb-2 mx-auto" />
      <p className="text-lg font-semibold text-green-600">Read</p>
      <p className="text-2xl font-bold text-black">{messageCounts.Read}</p>
    </div>
    <div className="flex-1 bg-yellow-100 p-4 rounded-lg border border-yellow-300 shadow-sm mx-4">
      <InboxIcon className="w-8 h-8 text-yellow-600 mb-2 mx-auto" />
      <p className="text-lg font-semibold text-yellow-600">Unread</p>
      <p className="text-2xl font-bold text-black">{messageCounts.Unread}</p>
    </div>
  </div>
);

const Messages = () => {
  const initialMessages = [
    { id: 1, sender: 'Ken Smith', subject: 'Project Update', date: '2024-08-01', content: 'Project Alpha is progressing well.', status: 'Read' },
    { id: 2, sender: 'Abe Johnson', subject: 'New Task Assigned', date: '2024-08-02', content: 'You have been assigned a new task.', status: 'Unread' },
    { id: 3, sender: 'Monserrat Lee', subject: 'Design Feedback', date: '2024-08-03', content: 'Please review the design changes.', status: 'Read' },
    { id: 4, sender: 'Silas Parker', subject: 'Bug Report', date: '2024-08-04', content: 'A bug was reported in the latest build.', status: 'Unread' },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
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
      content: `Replying to ${message.sender}'s message: ${message.content}`
    });
    setIsReplyDialogOpen(true);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const handleOpenReplyDialog = () => {
    setIsReplyDialogOpen(true);
  };

  const handleCloseReplyDialog = () => {
    setIsReplyDialogOpen(false);
  };

  const handleCreateMessage = () => {
    if (newMessage.recipient && newMessage.subject && newMessage.content) {
      setMessages([...messages, { ...newMessage, id: messages.length + 1, date: new Date().toISOString().split('T')[0], status: 'Unread' }]);
      setNewMessage({ recipient: '', subject: '', content: '' });
      handleCloseCreateDialog();
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleReplyMessage = () => {
    if (replyMessage) {
      const { sender, subject } = replyMessage;
      const replyContent = `Replying to ${sender}'s message with subject: "${subject}"`;

      setMessages([...messages, {
        recipient: sender,
        subject: `Re: ${subject}`,
        content: replyContent,
        id: messages.length + 1,
        date: new Date().toISOString().split('T')[0],
        status: 'Unread'
      }]);
      setReplyMessage(null);
      setNewMessage({ recipient: '', subject: '', content: '' });
      handleCloseReplyDialog();
    } else {
      alert('Reply message is missing.');
    }
  };

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to calculate total messages by status
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
      <SheetComponent />
      <h2 className="text-2xl font-semibold mb-6 text-center">Messages</h2>
      <div className="mb-6 flex items-center space-x-4">
        <button
          onClick={handleOpenCreateDialog}
          className="p-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Create New Message
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

      {/* Dialog for Creating New Message */}
      <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Message</DialogTitle>
            <DialogDescription>Fill out the form below to create a new message.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-6">
            <div>
              <label className="block mb-1 font-semibold">Recipient</label>
              <Input
                type="text"
                value={newMessage.recipient}
                onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
                placeholder="Enter recipient's email or name"
                className="p-3 border rounded-lg shadow-sm w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Subject</label>
              <Input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                placeholder="Enter message subject"
                className="p-3 border rounded-lg shadow-sm w-full"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Content</label>
              <Textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                placeholder="Enter message content"
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
                onClick={handleCreateMessage}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Create Message
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for Replying to a Message */}
      <Dialog open={isReplyDialogOpen} onOpenChange={handleCloseReplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>Compose your reply to the message.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 p-6">
            {replyMessage && (
              <>
                <div>
                  <label className="block mb-1 font-semibold">To</label>
                  <Input
                    type="text"
                    value={replyMessage.sender}
                    readOnly
                    className="p-3 border rounded-lg shadow-sm w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Subject</label>
                  <Input
                    type="text"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    placeholder="Enter message subject"
                    className="p-3 border rounded-lg shadow-sm w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Content</label>
                  <Textarea
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    placeholder="Enter reply content"
                    className="p-3 border rounded-lg shadow-sm w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={handleCloseReplyDialog}
                    className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleReplyMessage}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Send Reply
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
