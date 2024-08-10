import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SheetComponent from 'C:/Users/Admin/Paysera-FrontEnd/src/components/AdminDashboard/SheetComponent.tsx';

const Messages = () => {
  const initialMessages = [
    { id: 1, sender: 'Ken Smith', subject: 'Project Update', date: '2024-08-01', content: 'Project Alpha is progressing well.', status: 'Read' },
    { id: 2, sender: 'Abe Johnson', subject: 'New Task Assigned', date: '2024-08-02', content: 'You have been assigned a new task.', status: 'Unread' },
    { id: 3, sender: 'Monserrat Lee', subject: 'Design Feedback', date: '2024-08-03', content: 'Please review the design changes.', status: 'Read' },
    { id: 4, sender: 'Silas Parker', subject: 'Bug Report', date: '2024-08-04', content: 'A bug was reported in the latest build.', status: 'Unread' },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReply = (id) => {
    // Logic for replying to a message
    alert(`Replying to message with ID: ${id}`);
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const filteredMessages = messages.filter((message) =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <SheetComponent />
      <h2 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Messages</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by subject"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded"
        />
      </div>
      <Table className="border-collapse border border-gray-300">
        <TableCaption>Details of your messages.</TableCaption>
        <TableHeader>
          <TableRow className="border border-gray-300">
            <TableHead className="border border-gray-300">Sender</TableHead>
            <TableHead className="border border-gray-300">Subject</TableHead>
            <TableHead className="border border-gray-300">Date</TableHead>
            <TableHead className="border border-gray-300">Content</TableHead>
            <TableHead className="border border-gray-300">Status</TableHead>
            <TableHead className="border border-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMessages.map((message) => (
            <TableRow key={message.id} className="border border-gray-300">
              <TableCell className="border border-gray-300">{message.sender}</TableCell>
              <TableCell className="border border-gray-300">{message.subject}</TableCell>
              <TableCell className="border border-gray-300">{message.date}</TableCell>
              <TableCell className="border border-gray-300">{message.content}</TableCell>
              <TableCell className="border border-gray-300">{message.status}</TableCell>
              <TableCell className="border border-gray-300">
                <button
                  onClick={() => handleReply(message.id)}
                  className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-700"
                >
                  Reply
                </button>
                <button
                  onClick={() => handleDeleteMessage(message.id)}
                  className="p-2 border rounded bg-red-500 text-white hover:bg-red-700 ml-2"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Messages;
