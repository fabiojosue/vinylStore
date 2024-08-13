import React, { useEffect, useState } from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
  duration?: number; // duration in milliseconds
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;
