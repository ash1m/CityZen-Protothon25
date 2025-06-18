import React, { useState } from 'react';
import { X, Mic, Upload, Camera, Trash2, AlertCircle, MessageSquare, ThumbsUp } from 'lucide-react';
import { issueTags } from '../data/mockData';
import mapLocationImage from '../assets/map-location.jpg';

interface RaiseIssueSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

export const RaiseIssueSheet: React.FC<RaiseIssueSheetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<Step>(1);
  const [issueText, setIssueText] = useState('');
  const [filteredTags, setFilteredTags] = useState(issueTags);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [similarIssues] = useState([
    {
      id: 1,
      title: "Broken streetlight on Ridge Road",
      description: "The streetlight near the intersection has been flickering for the past week",
      status: "pending",
      commentsCount: 5,
      votesCount: 12,
      dateCreated: "2025-02-18T10:30:00Z"
    },
    {
      id: 2,
      title: "Poor visibility at Armstrong Ave crossing",
      description: "Traffic signs are obscured by overgrown trees",
      status: "in-progress",
      commentsCount: 8,
      votesCount: 15,
      dateCreated: "2025-02-17T14:20:00Z"
    }
  ]);

  React.useEffect(() => {
    if (issueText.trim()) {
      const filtered = issueTags.filter(tag => 
        tag.toLowerCase().includes(issueText.toLowerCase()) ||
        issueText.toLowerCase().includes(tag.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(issueTags);
    }
  }, [issueText]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'video/mp4'].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="Start typing your issue.."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Use voice input"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${
                    !issueText || tag.toLowerCase().includes(issueText.toLowerCase())
                      ? 'opacity-100 transform scale-100'
                      : 'opacity-50 transform scale-95'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Highlight the area of the issue</h3>
              <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={mapLocationImage}
                  alt="Map Location"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Relevant Communities</h3>
              <div className="flex flex-wrap gap-2">
                {['Palm Springs', 'La Lucia Ridge'].map((community) => (
                  <button
                    key={community}
                    onClick={() => setSelectedCommunities(prev => 
                      prev.includes(community) 
                        ? prev.filter(c => c !== community)
                        : [...prev, community]
                    )}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCommunities.includes(community)
                        ? 'bg-primary-100 text-primary-700 ring-1 ring-primary-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {community}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,video/mp4"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports: JPG, PNG, MP4 (max 10MB)
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Similar Issues Found</h3>
                  <p className="text-sm text-amber-700">
                    We found some similar issues in your area. Would you like to join one of these instead?
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {similarIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-500 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{issue.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{issue.commentsCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{issue.votesCount}</span>
                      </div>
                    </div>
                    <button className="text-primary-600 text-sm font-medium hover:underline">
                      Join Issue
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Post as Anonymous</span>
            </label>
          </div>
        );
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed inset-x-0 bottom-0 bg-white z-50 rounded-t-2xl shadow-lg transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className="max-w-lg mx-auto px-4 pb-6">
          <div className="flex items-center justify-between py-4 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Raise Issue</h2>
              <p className="text-sm text-gray-500">Step {step} of 4</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative h-1 bg-gray-100 rounded-full mt-4 mb-6">
            <div 
              className="absolute left-0 h-full bg-primary-600 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 12rem)' }}>
            {renderStepContent()}
          </div>

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep((prev) => (prev - 1) as Step)}
                className="flex-1 py-3 px-4 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Back
              </button>
            )}
            <button 
              onClick={() => {
                if (step < 4) {
                  setStep((prev) => (prev + 1) as Step);
                } else {
                  // Handle final submission
                  onClose();
                }
              }}
              className="flex-1 py-3 px-4 rounded-xl font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              {step === 4 ? 'Submit Issue' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};