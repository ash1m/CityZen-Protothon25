import React, { useState } from 'react';
import { BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/Badge';
import { polls } from '../data/mockData';

export const PollsSection: React.FC = () => {
  const [currentPoll, setCurrentPoll] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleOptionSelect = (pollId: number, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [pollId]: optionIndex,
    }));
  };

  const handleSubmit = (pollId: number) => {
    console.log(`Submitted answer for poll ${pollId}: option ${selectedOptions[pollId]}`);
    setShowResults((prev) => ({
      ...prev,
      [pollId]: true,
    }));
  };

  const navigatePoll = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPoll < polls.length - 1) {
      setCurrentPoll(currentPoll + 1);
    } else if (direction === 'prev' && currentPoll > 0) {
      setCurrentPoll(currentPoll - 1);
    }
  };

  const currentPollData = polls[currentPoll];

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">Polls <Badge>{polls.length}</Badge></h2>
        {polls.length > 1 && (
          <div className="flex gap-2">
            <button 
              onClick={() => navigatePoll('prev')}
              disabled={currentPoll === 0}
              className={`p-1 rounded-full ${
                currentPoll === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              } transition-colors`}
              aria-label="Previous poll"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => navigatePoll('next')}
              disabled={currentPoll === polls.length - 1}
              className={`p-1 rounded-full ${
                currentPoll === polls.length - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              } transition-colors`}
              aria-label="Next poll"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-primary-50 p-1.5 rounded-lg text-primary-600">
              <BarChart2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-medium text-gray-900">{currentPollData.question}</h3>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
            <span>{currentPollData.author}</span>
            <span>in</span>
            <span className="font-medium text-primary-600 hover:underline cursor-pointer">{currentPollData.community}</span>
          </div>

          {showResults[currentPollData.id] ? (
            <div className="space-y-3 mb-4">
              {currentPollData.options.map((option, idx) => {
                const isSelected = selectedOptions[currentPollData.id] === idx;
                const percentage = isSelected ? 65 : (idx === 0 ? 45 : idx === 1 ? 30 : 25);
                
                return (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{option}</span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${isSelected ? 'bg-primary-600' : 'bg-gray-400'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-1.5 mb-4">
              {currentPollData.options.map((option, idx) => (
                <label 
                  key={idx} 
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedOptions[currentPollData.id] === idx 
                      ? 'bg-primary-50 border border-primary-200' 
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name={`poll-${currentPollData.id}`}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-full"
                      checked={selectedOptions[currentPollData.id] === idx}
                      onChange={() => handleOptionSelect(currentPollData.id, idx)}
                    />
                  </div>
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{currentPollData.timeLeft} left to end of poll</p>
            {!showResults[currentPollData.id] ? (
              <button 
                onClick={() => handleSubmit(currentPollData.id)}
                disabled={selectedOptions[currentPollData.id] === undefined}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedOptions[currentPollData.id] !== undefined
                    ? 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } transition-colors`}
              >
                Submit
              </button>
            ) : (
              <div className="text-sm text-gray-600">
                <span className="font-medium">{currentPollData.voters}</span> voters
              </div>
            )}
          </div>
        </div>

        {polls.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-3">
            {polls.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPoll(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentPoll 
                    ? 'w-6 bg-primary-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`View poll ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};