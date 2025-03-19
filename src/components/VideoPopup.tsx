import React, { useState, useEffect } from 'react';
import '../styles/VideoPopup.css';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ isOpen, onClose }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      setTime(0);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="video-popup-overlay">
      <div className="video-popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        <video controls autoPlay>
          <source src="/assets/BriskWalking.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="timer">
          Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
