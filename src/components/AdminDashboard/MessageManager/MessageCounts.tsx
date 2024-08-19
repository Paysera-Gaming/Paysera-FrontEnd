import React from 'react';
import { EnvelopeOpenIcon, InboxIcon } from '@heroicons/react/24/outline';

const MessageCounts = ({ messageCounts }) => (
  <div className="mb-6 flex justify-between">
    {/* Read Messages */}
    <div className="flex-1 bg-green-100 p-4 rounded-lg border border-green-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <EnvelopeOpenIcon className="w-8 h-8 text-green-600" />
          <p className="text-4xl font-bold text-black ml-2">{messageCounts.Read}</p>
        </div>
        <p className="text-lg font-semibold text-green-600">Read</p>
      </div>
    </div>

    {/* Unread Messages */}
    <div className="flex-1 bg-yellow-100 p-4 rounded-lg border border-yellow-300 shadow-sm mx-4 text-center">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-2">
          <InboxIcon className="w-8 h-8 text-yellow-600" />
          <p className="text-4xl font-bold text-black ml-2">{messageCounts.Unread}</p>
        </div>
        <p className="text-lg font-semibold text-yellow-600">Unread</p>
      </div>
    </div>
  </div>
);

export default MessageCounts;
