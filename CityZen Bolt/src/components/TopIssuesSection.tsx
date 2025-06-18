import React from 'react';
import { IssueCard } from './IssueCard';
import { issues } from '../data/mockData';
import { TrendingUp } from 'lucide-react';

export const TopIssuesSection: React.FC = () => {
  // Get top issues based on votes or engagement
  const topIssues = [...issues].sort((a, b) => b.votesCount - a.votesCount).slice(0, 4);

  return (
    <section className="mb-20"> {/* Added more bottom margin to avoid nav overlap */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-1.5 text-primary-600" />
          Top Issues This Week
        </h2>
        <button className="text-primary-600 text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="grid gap-4">
        {topIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            title={issue.title}
            status={issue.status}
            commentsCount={issue.commentsCount}
            votesCount={issue.votesCount}
            dateCreated={issue.dateCreated}
            location={issue.location}
          />
        ))}
      </div>
    </section>
  );
};