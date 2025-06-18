import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MoreVertical, 
  ThumbsUp, 
  MessageSquare,
  ChevronDown,
  Phone,
  FileText,
  Flag,
  AlertCircle,
  User,
  ChevronLeft
} from 'lucide-react';
import { StatusBadge } from './ui/StatusBadge';
import { NavigationBar } from './NavigationBar';
import { issues } from '../data/mockData';

export const IssuePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('by date');

  // Find the issue from mock data
  const issue = issues.find(i => i.id === Number(id)) || {
    id: 1,
    title: "Issue not found",
    status: "pending" as const,
    escalationLevel: 1,
    mediaCount: 0,
    upvotes: 0,
    downvotes: 0,
    comments: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mediaImages = [
    "https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/2119705/pexels-photo-2119705.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/2119704/pexels-photo-2119704.jpeg?auto=compress&cs=tinysrgb&w=300",
    "https://images.pexels.com/photos/2119703/pexels-photo-2119703.jpeg?auto=compress&cs=tinysrgb&w=300"
  ];

  const comments = [
    {
      id: 1,
      author: "Banksy",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60",
      timeAgo: "2 weeks ago",
      content: "This graffiti makes the whole area feel neglected and unsafe.",
      upvotes: 231,
      downvotes: 12,
      replies: 12
    },
    {
      id: 2,
      author: "Kandinsky",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60",
      timeAgo: "2 weeks ago",
      content: "It's an eyesore and sends the wrong message to visitors.",
      upvotes: 231,
      downvotes: 12,
      replies: 12
    },
    {
      id: 3,
      author: "Kalho",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60",
      timeAgo: "1 week ago",
      content: "My kids walk past this every day—this isn't what they should be seeing.",
      upvotes: 231,
      downvotes: 12,
      replies: 12
    },
    {
      id: 4,
      author: "DaliSalvo",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60",
      timeAgo: "1 week ago",
      content: "It looks like gang-related tagging. Can the authorities investigate?",
      upvotes: 231,
      downvotes: 12,
      replies: 12
    }
  ];

  const handleMenuAction = (action: string) => {
    console.log('Menu action:', action);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-700 text-white">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreVertical className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <StatusBadge status={issue.status} />
          </div>
          <h1 className="text-2xl font-bold">{issue.title}</h1>
        </div>
      </div>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-xl z-50 animate-slide-up">
            <div className="max-w-lg mx-auto px-4 py-4">
              <h3 className="text-sm text-gray-500 mb-2 px-4">Actions on Issue (Level {issue.escalationLevel})</h3>
              <p className="text-xs text-gray-400 mb-4 px-4">What else can be done on this issue?</p>
              <div className="space-y-2">
                <button 
                  onClick={() => handleMenuAction('escalate')}
                  className="w-full text-primary-600 px-4 py-3 text-left hover:bg-gray-50"
                >
                  Escalate Further
                </button>
                <button 
                  onClick={() => handleMenuAction('regulations')}
                  className="w-full text-primary-600 px-4 py-3 text-left hover:bg-gray-50"
                >
                  Related City Regulations
                </button>
                <button 
                  onClick={() => handleMenuAction('rules')}
                  className="w-full text-primary-600 px-4 py-3 text-left hover:bg-gray-50"
                >
                  Community Rules
                </button>
                <button 
                  onClick={() => handleMenuAction('close')}
                  className="w-full text-red-500 px-4 py-3 text-left hover:bg-gray-50"
                >
                  Close Issue
                </button>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-primary-600 px-4 py-3 text-left hover:bg-gray-50 border-t"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Media and Level Section */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h2 className="text-sm font-medium text-gray-900 mb-2">Media ({issue.mediaCount || mediaImages.length})</h2>
            <div className="grid grid-cols-4 gap-2">
              {mediaImages.map((image, i) => (
                <div 
                  key={i} 
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative"
                >
                  <img 
                    src={image} 
                    alt={`Graffiti ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 text-white font-medium">
                      View All
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-6 flex flex-col gap-0.5">
            <div className={`h-4 rounded-t-sm ${issue.escalationLevel >= 5 ? 'bg-primary-500' : 'bg-gray-100'}`} />
            <div className={`h-4 ${issue.escalationLevel >= 4 ? 'bg-primary-400' : 'bg-gray-100'}`} />
            <div className={`h-4 ${issue.escalationLevel >= 3 ? 'bg-primary-300' : 'bg-gray-100'}`} />
            <div className={`h-4 ${issue.escalationLevel >= 2 ? 'bg-primary-200' : 'bg-gray-100'}`} />
            <div className={`h-4 rounded-b-sm ${issue.escalationLevel >= 1 ? 'bg-primary-100' : 'bg-gray-100'}`} />
          </div>
        </div>
      </div>

      {/* Voting Section */}
      <div className="border-t border-b">
        <div className="max-w-lg mx-auto px-4 py-4 flex justify-between">
          <div className="flex gap-8">
            <button className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              <span className="font-medium">{issue.upvotes}</span>
            </button>
            <button className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 rotate-180" />
              <span className="font-medium">{issue.downvotes}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-lg mx-auto px-4 py-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Comments</h2>
          <button 
            className="flex items-center text-sm text-gray-600"
            onClick={() => setSelectedSort(selectedSort === 'by date' ? 'by popularity' : 'by date')}
          >
            {selectedSort}
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="relative">
              <div className="flex gap-3">
                <img 
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.timeAgo}</span>
                  </div>
                  <p className="text-gray-800 mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.upvotes}</span>
                    </button>
                    <button className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 rotate-180" />
                      <span>{comment.downvotes}</span>
                    </button>
                    <button className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{comment.replies}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavigationBar />
    </div>
  );
};