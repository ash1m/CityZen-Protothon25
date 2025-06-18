import React from 'react';
import { CommunityCard } from './CommunityCard';
import { communities } from '../data/mockData';
import { Plus } from 'lucide-react';

export const CommunitiesSection: React.FC = () => {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">My Communities</h2>
        <button className="text-primary-600 text-sm font-medium flex items-center hover:underline">
          <Plus className="h-4 w-4 mr-1" />
          Join More
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x scroll-smooth">
        {communities.map((community) => (
          <div key={community.id} className="snap-start">
            <CommunityCard
              id={community.id}
              name={community.name}
              type={community.type}
              imageUrl={community.imageUrl}
              memberCount={community.memberCount}
              activeIssues={community.activeIssues}
            />
          </div>
        ))}
      </div>
    </section>
  );
};