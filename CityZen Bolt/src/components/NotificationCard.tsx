import React from 'react';
import { AlertCircle, X, Bell, MapPin, AlertTriangle, Info } from 'lucide-react';

type NotificationIcon = 'alert-circle' | 'bell' | 'map-pin' | 'alert-triangle' | 'info';

interface NotificationCardProps {
  icon: NotificationIcon;
  title: string;
  time: string;
}

const iconMap: Record<NotificationIcon, React.ReactNode> = {
  'alert-circle': <AlertCircle className="h-5 w-5" />,
  'bell': <Bell className="h-5 w-5" />,
  'map-pin': <MapPin className="h-5 w-5" />,
  'alert-triangle': <AlertTriangle className="h-5 w-5" />,
  'info': <Info className="h-5 w-5" />,
};

export const NotificationCard: React.FC<NotificationCardProps> = ({ icon, title, time }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 mb-6 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300">
      <div className="p-4 flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-0.5 text-primary-600 bg-primary-50 p-2 rounded-full">
            {iconMap[icon]}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{time}</p>
          </div>
        </div>
        <button 
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          aria-label="Dismiss notification"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};