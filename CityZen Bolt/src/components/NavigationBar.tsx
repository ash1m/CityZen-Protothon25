import React, { useState } from 'react';
import { Phone, FileText, Flag, AlertCircle, User } from 'lucide-react';
import { RaiseIssueSheet } from './RaiseIssueSheet';

export const NavigationBar: React.FC = () => {
  const [isRaiseIssueOpen, setIsRaiseIssueOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-10 py-2 animate-slide-up">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <NavItem icon={<Phone className="h-6 w-6" />} label="Contact" />
          <NavItem icon={<FileText className="h-6 w-6" />} label="Rules" />
          <NavItem 
            icon={<Flag className="h-6 w-6" />} 
            label="Raise Issue" 
            isActive 
            onClick={() => setIsRaiseIssueOpen(true)}
          />
          <NavItem icon={<AlertCircle className="h-6 w-6" />} label="Issues" />
          <NavItem 
            icon={
              <div className="h-7 w-7 rounded-full overflow-hidden border-2 border-white bg-gray-100 shadow-sm">
                <img 
                  src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            } 
            label="Me" 
          />
        </div>
      </nav>

      <RaiseIssueSheet 
        isOpen={isRaiseIssueOpen}
        onClose={() => setIsRaiseIssueOpen(false)}
      />
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center p-1.5 rounded-xl ${
        isActive 
          ? 'text-primary-600 bg-primary-50' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
      } transition-all duration-200`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
  );
};