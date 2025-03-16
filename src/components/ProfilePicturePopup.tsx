import React, { useState } from 'react';
import { X, Upload, User, Camera, Image, Trash2 } from 'lucide-react';

interface ProfilePicturePopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onAvatarChange: (newAvatar: string) => void;
}

export function ProfilePicturePopup({ 
  isOpen, 
  onClose, 
  currentAvatar, 
  onAvatarChange 
}: ProfilePicturePopupProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  // Predefined avatar options
  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
  ];
  
  // Cool avatar options (illustrated/cartoon style)
  const coolAvatars = [
    '/avatars/cool-avatar-1.png',
    '/avatars/cool-avatar-2.png',
    '/avatars/cool-avatar-3.png',
    '/avatars/cool-avatar-4.png',
    '/avatars/cool-avatar-5.png',
    '/avatars/cool-avatar-6.png',
  ];
  
  // For demo purposes, we'll use these placeholder URLs for cool avatars
  const placeholderCoolAvatars = [
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Milo',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Jasper',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Luna',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoe',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Max',
    'https://api.dicebear.com/7.x/adventurer/svg?seed=Chloe',
  ];
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to a server
      // For this demo, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setSelectedAvatar(imageUrl);
    }
  };
  
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };
  
  const handleRemoveAvatar = () => {
    // Set to null or a default icon
    setSelectedAvatar('default');
  };
  
  const handleSave = () => {
    if (selectedAvatar) {
      onAvatarChange(selectedAvatar);
    }
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-2xl p-6 m-4 animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">Update Your Profile Picture</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        <p className="text-white/60 mb-6">
          Choose an image that represents you—whether it's a real photo, an avatar, or something that makes you feel comfortable. Your choice, your space!
        </p>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 mb-4">
            {selectedAvatar === 'default' ? (
              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                <User className="w-12 h-12 text-white/40" />
              </div>
            ) : (
              <img 
                src={selectedAvatar || currentAvatar} 
                alt="Selected avatar" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          <div className="flex gap-3">
            <label className="cursor-pointer py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2">
              <Image className="w-4 h-4 text-white" />
              <span className="text-white">Gallery</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
              />
            </label>
            
            <label className="cursor-pointer py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2">
              <Camera className="w-4 h-4 text-white" />
              <span className="text-white">Camera</span>
              <input 
                type="file" 
                accept="image/*" 
                capture="user"
                className="hidden" 
                onChange={handleFileUpload}
              />
            </label>
            
            <button
              onClick={handleRemoveAvatar}
              className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2 text-white"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-bold text-white mb-4">Choose an Avatar</h3>
          <div className="grid grid-cols-4 gap-4">
            {placeholderCoolAvatars.map((avatar, index) => (
              <button
                key={index}
                onClick={() => handleAvatarSelect(avatar)}
                className={`p-1 rounded-lg transition-transform hover:scale-105 ${
                  selectedAvatar === avatar ? 'bg-blue-500/30 ring-2 ring-blue-400' : 'bg-white/5'
                }`}
              >
                <img 
                  src={avatar} 
                  alt={`Avatar option ${index + 1}`} 
                  className="w-full aspect-square rounded-lg object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition-colors text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 