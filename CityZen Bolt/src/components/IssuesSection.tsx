import React from 'react';
import { Badge } from './ui/Badge';
import { IssueCard } from './IssueCard';
import { issues } from '../data/mockData';

interface IssuesSectionProps {
  title: string;
  count: number;
}

export const IssuesSection: React.FC<IssuesSectionProps> = ({ title, count }) => {
  // Filter issues that were raised by the user
  const userIssues = issues.slice(0, count);

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {title} <Badge>{count}</Badge>
        </h2>
      </div>

      <div className="grid gap-4">
        {userIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            id={issue.id}
            title={issue.title}
            status={issue.status}
            commentsCount={issue.commentsCount}
            votesCount={issue.votesCount}
          />
        ))}
      </div>
    </section>
  );
};