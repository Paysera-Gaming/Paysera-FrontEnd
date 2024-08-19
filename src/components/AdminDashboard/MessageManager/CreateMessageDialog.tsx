import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreateMessageDialog = ({ isOpen, onClose, newMessage, setNewMessage, onCreate }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Message</DialogTitle>
        <DialogDescription>Fill out the form below to create a new message.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 p-6">
        <Input
          placeholder="Recipient"
          value={newMessage.recipient || ''}
          onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
        />
        <Input
          placeholder="Subject"
          value={newMessage.subject || ''}
          onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
        />
        <Textarea
          placeholder="Message Content"
          value={newMessage.content || ''}
          onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
        />
        <button
          onClick={() => {
            onCreate();
            onClose();
          }}
          className="p-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default CreateMessageDialog;
