// MessageCounts.js
import React from 'react';
import { EnvelopeOpenIcon, InboxIcon, PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/outline';

const MessageCounts = ({ messageCounts }) => (
  <div className="mb-6 flex justify-between space-x-4">
    {/* Read Messages */}
    <div className="flex-1 bg-green-100 p-4 rounded-lg border border-green-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <EnvelopeOpenIcon className="w-8 h-8 text-green-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Read}</p>
        <p className="text-lg font-semibold text-green-600">Read</p>
      </div>
    </div>

    {/* Unread Messages */}
    <div className="flex-1 bg-yellow-100 p-4 rounded-lg border border-yellow-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <InboxIcon className="w-8 h-8 text-yellow-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Unread}</p>
        <p className="text-lg font-semibold text-yellow-600">Unread</p>
      </div>
    </div>

    {/* Sent Messages */}
    <div className="flex-1 bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <PaperAirplaneIcon className="w-8 h-8 text-blue-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Sent}</p>
        <p className="text-lg font-semibold text-blue-600">Sent</p>
      </div>
    </div>

    {/* Favorite Messages */}
    <div className="flex-1 bg-purple-100 p-4 rounded-lg border border-purple-300 shadow-sm text-center">
      <div className="flex flex-col items-center">
        <StarIcon className="w-8 h-8 text-purple-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Favorite}</p>
        <p className="text-lg font-semibold text-purple-600">Favorite</p>
      </div>
    </div>
  </div>
);

export default MessageCounts;
