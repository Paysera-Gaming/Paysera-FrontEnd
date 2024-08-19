// MessageCounts.js
import React from 'react';
import { EnvelopeOpenIcon, InboxIcon, PaperAirplaneIcon, StarIcon } from '@heroicons/react/24/outline';

const MessageCounts = ({ messageCounts }) => (
  <div className="mb-6 flex justify-between space-x-4">
  {/* Read Messages */}
  <div className="flex-1 bg-green-100 p-4 rounded-lg border border-green-300 shadow-sm text-center">
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <EnvelopeOpenIcon className="w-8 h-8 text-green-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Read}</p>
      </div>
      <p className="text-lg font-semibold text-green-600 mt-2">Read</p>
    </div>
  </div>

{/* Unread Messages */}
<div className="flex-1 bg-red-100 p-4 rounded-lg border border-red-300 shadow-sm text-center">
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-2">
      <InboxIcon className="w-8 h-8 text-red-600" />
      <p className="text-4xl font-bold text-black">{messageCounts.Unread}</p>
    </div>
    <p className="text-lg font-semibold text-red-600 mt-2">Unread</p>
  </div>
</div>


  {/* Sent Messages */}
  <div className="flex-1 bg-blue-100 p-4 rounded-lg border border-blue-300 shadow-sm text-center">
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <PaperAirplaneIcon className="w-8 h-8 text-blue-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Sent}</p>
      </div>
      <p className="text-lg font-semibold text-blue-600 mt-2">Sent</p>
    </div>
  </div>

  {/* Favorite Messages */}
  <div className="flex-1 bg-purple-100 p-4 rounded-lg border border-purple-300 shadow-sm text-center">
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <StarIcon className="w-8 h-8 text-purple-600" />
        <p className="text-4xl font-bold text-black">{messageCounts.Favorite}</p>
      </div>
      <p className="text-lg font-semibold text-purple-600 mt-2">Favorite</p>
    </div>
  </div>
</div>

);

export default MessageCounts;
