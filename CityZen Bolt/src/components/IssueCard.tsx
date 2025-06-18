import React from 'react';
import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface IssueCardProps {
  id: number;
  title: string;
  description?: string;
  status: 'in-progress' | 'completed' | 'pending' | 'rejected';
  commentsCount: number;
  votesCount: number;
  dateCreated?: string;
  location?: string;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  id,
  title,
  description,
  status,
  commentsCount,
  votesCount,
  dateCreated,
  location,
}) => {
  // Generate a random escalation level (1-5) for demonstration
  const escalationLevel = Math.floor(Math.random() * 5) + 1;

  return (
    <Link to={`/issues/${id}`}>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in hover:shadow-md transition-all duration-300">
        <div className="flex items-stretch">
          <div className="w-6 flex flex-col">
            <div className={`flex-1 ${escalationLevel >= 5 ? 'bg-primary-500' : 'bg-gray-50'}`}></div>
            <div className={`flex-1 ${escalationLevel >= 4 ? 'bg-primary-400' : 'bg-gray-50'}`}></div>
            <div className={`flex-1 ${escalationLevel >= 3 ? 'bg-primary-300' : 'bg-gray-50'}`}></div>
            <div className={`flex-1 ${escalationLevel >= 2 ? 'bg-primary-200' : 'bg-gray-50'}`}></div>
            <div className={`flex-1 ${escalationLevel >= 1 ? 'bg-primary-100' : 'bg-gray-50'}`}></div>
          </div>
          <div className="flex-1 p-3">
            <div className="mb-2 flex items-center justify-between">
              <StatusBadge status={status} />
              {dateCreated && (
                <span className="text-xs text-gray-500">
                  {format(new Date(dateCreated), 'MMM d')}
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">{title}</h3>
            {description && (
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-500 gap-3">
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  <span>{commentsCount}</span>
                </div>
                {location && (
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="truncate max-w-[100px]">{location}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle share action
                  }}
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 font-medium text-primary-600 bg-primary-50 group cursor-pointer hover:bg-primary-100 transition-colors">
            <ThumbsUp className="h-4 w-4 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-sm">{votesCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};