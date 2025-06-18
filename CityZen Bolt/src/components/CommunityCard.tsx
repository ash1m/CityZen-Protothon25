import React from 'react';
import { Users } from 'lucide-react';

interface CommunityCardProps {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  memberCount?: number;
  activeIssues?: number;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({
  id,
  name,
  type,
  imageUrl,
  memberCount,
  activeIssues,
}) => {
  return (
    <div className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 animate-fade-in group">
      <div 
        className="h-32 bg-gray-200 flex items-center justify-center relative overflow-hidden"
        style={{ 
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!imageUrl && (
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {memberCount && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs bg-black/40 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Users className="h-3 w-3" />
            <span>{memberCount}</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
        <p className="text-xs text-gray-500">{type}</p>
        {activeIssues && activeIssues > 0 && (
          <div className="mt-1.5">
            <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">
              {activeIssues} active {activeIssues === 1 ? 'issue' : 'issues'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};