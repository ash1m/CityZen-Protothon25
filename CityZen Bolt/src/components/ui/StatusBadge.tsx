import React from 'react';

interface StatusBadgeProps {
  status: 'in-progress' | 'completed' | 'pending' | 'rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'in-progress':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'completed':
        return 'bg-success-700 text-white border-success-800';
      case 'pending':
        return 'bg-warning-50 text-warning-700 border-warning-200';
      case 'rejected':
        return 'bg-error-50 text-error-700 border-error-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${getStatusStyles()}`}>
      {getStatusText()}
    </span>
  );
};