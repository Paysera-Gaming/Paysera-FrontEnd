import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ReplyMessageDialog = ({ isOpen, onClose, replyMessage, newMessage, setNewMessage, onReply }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogDescription>Respond to the message below.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 p-6">
        <Input
          placeholder="Recipient"
          value={newMessage.recipient || ''}
          onChange={(e) => setNewMessage({ ...newMessage, recipient: e.target.value })}
          disabled
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
            onReply();
            onClose();
          }}
          className="p-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Send Reply
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ReplyMessageDialog;
