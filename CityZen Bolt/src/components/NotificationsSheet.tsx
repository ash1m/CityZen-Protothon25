import React from 'react';
import { X, AlertCircle, Bell, MapPin, AlertTriangle, Info } from 'lucide-react';
import { notifications } from '../data/mockData';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap = {
  AlertCircle: AlertCircle,
  Bell: Bell,
  MapPin: MapPin,
  AlertTriangle: AlertTriangle,
  Info: Info,
};

export const NotificationsSheet: React.FC<NotificationsSheetProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-40 shadow-lg transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close notifications"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="py-2 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 4rem)' }}>
            {notifications.map((notification) => {
              const IconComponent = iconMap[notification.icon as keyof typeof iconMap];
              
              return (
                <div 
                  key={notification.id}
                  className="py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-2 rounded-full ${notification.read ? 'bg-gray-100 text-gray-600' : 'bg-primary-50 text-primary-600'}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-0.5">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{notification.description}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};