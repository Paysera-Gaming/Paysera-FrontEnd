import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';

const AvatarUpload = () => {
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-group">
      <label className="form-label block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
      <div className="flex items-center space-x-4">
        <Avatar className="w-16 h-16 rounded-full overflow-hidden">
          <AvatarImage src={avatar || 'https://github.com/shadcn.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label className="upload-label cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md">
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;
