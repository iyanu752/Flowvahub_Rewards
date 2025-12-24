import React from 'react';
import { Flame, SmilePlus, MoreVertical, Check, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  notifications?: Notification[];
  unreadCount?: number;
  markAsRead?: (id: string) => void;
  markAllAsRead?: () => void;
  deleteNotification?: (id: string) => void;
  deleteAll?: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose,
  notifications = [],
  unreadCount = 0,
  markAsRead = () => {},
  markAllAsRead = () => {},
  deleteNotification = () => {},
  deleteAll = () => {}
}) => {
  const [showMenu, setShowMenu] = React.useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'streak':
        return { icon: <Flame className="w-5 h-5 text-orange-500" />, bg: 'bg-orange-100' };
      case 'welcome':
        return { icon: <SmilePlus className="w-5 h-5 text-green-500" />, bg: 'bg-green-100' };
      default:
        return { icon: <Check className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-100' };
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const created = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-6 z-50 flex items-start justify-end pt-16 pr-4">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-sm max-h-150 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-linear-to-r from-purple-600 to-purple-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Notifications</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="text-sm text-white/90 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Mark all as read
              </button>
              <button
                onClick={deleteAll}
                disabled={notifications.length === 0}
                className="text-sm text-white/90 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6 text-center py-12">
              <span className="mb-4 text-4xl">🔔</span>
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const iconData = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors relative ${
                      !notification.is_read ? 'bg-purple-50' : ''
                    }`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full ${iconData.bg} flex items-center justify-center`}>
                          {iconData.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </h3>
                          
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(showMenu === notification.id ? null : notification.id);
                              }}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <MoreVertical className="w-4 h-4 text-gray-400" />
                            </button>
                            
                            {showMenu === notification.id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                                {!notification.is_read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                      setShowMenu(null);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                                  >
                                    <Check className="w-4 h-4" />
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                    setShowMenu(null);
                                  }}
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <span className="text-xs text-gray-400 mt-1 block">
                          {getTimeAgo(notification.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    {!notification.is_read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-600 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}