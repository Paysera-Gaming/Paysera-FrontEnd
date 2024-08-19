import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const ReplyMessageDialog = ({ isOpen, onClose, message, onReply }) => {
  const [replyContent, setReplyContent] = useState("");

  if (!message) {
    // If no message is provided, return null to avoid rendering the dialog
    return null;
  }

  const handleReply = () => {
    onReply(replyContent);
    setReplyContent("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Reply to {message.sender}
              </Dialog.Title>
              <div className="mt-4">
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={5}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  onClick={handleReply}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Send Reply
                </button>
                <button
                  onClick={onClose}
                  className="ml-2 px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReplyMessageDialog;
