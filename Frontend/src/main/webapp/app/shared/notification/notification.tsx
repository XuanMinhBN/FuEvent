import React, { useEffect } from 'react';
import './notification.scss';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface INotification {
  id: string | number;
  type?: NotificationType;
  message: React.ReactNode;
  duration?: number;
}

interface NotificationItemProps extends INotification {
  onClose: (id: string | number) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ id, type = 'info', message, onClose, duration = 4000 }) => {
  //   useEffect(() => {
  //     if (!duration) return;
  //     const t = setTimeout(() => onClose(id), duration);
  //     return () => clearTimeout(t);
  //   }, [id, duration, onClose]);

  return (
    <div className={`notification-item ${type}`} role="alert" aria-live="polite">
      <div className="notification-message">{message}</div>
      <button className="notification-close" onClick={() => onClose(id)} aria-label="Close">
        ×
      </button>
    </div>
  );
};

interface NotificationsContainerProps {
  notifications: INotification[];
  onClose: (id: string | number) => void;
}

export const NotificationsContainer: React.FC<NotificationsContainerProps> = ({ notifications = [], onClose }) => {
  return (
    <div className="notifications-root">
      {notifications.map(n => (
        <NotificationItem key={n.id} {...n} onClose={onClose} />
      ))}
    </div>
  );
};
