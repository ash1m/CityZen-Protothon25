import { AlertCircle, Bell, MapPin, AlertTriangle, Info } from 'lucide-react';

export const polls = [
  {
    id: 1,
    question: "Should the garbage truck run on weekends?",
    author: "CitizenAbel",
    community: "Palm Springs",
    options: [
      "Yes, weekends only.",
      "No way. It's fine the day it is.",
      "Not sure. Tell me more.."
    ],
    timeLeft: "3hrs",
    voters: 231
  },
  {
    id: 2,
    question: "Should we add more street lights on Maple Avenue?",
    author: "SafetyFirst",
    community: "La Lucia Ridge",
    options: [
      "Yes, it's too dark at night.",
      "No, I prefer less light pollution.",
      "Only at major intersections."
    ],
    timeLeft: "1d 4hrs",
    voters: 156
  },
  {
    id: 3,
    question: "Do you support the new community garden project?",
    author: "GreenThumb",
    community: "Palm Springs",
    options: [
      "Yes, I'll help maintain it!",
      "Yes, but I won't participate.",
      "No, use the space differently."
    ],
    timeLeft: "2d 8hrs",
    voters: 198
  }
];

export const issueTags = [
  "Garbage",
  "Potholes",
  "Bad Roads",
  "Drain",
  "Parking",
  "Streetlight",
  "Electricity",
  "Street Sign",
  "Animal Related",
  "Graffiti",
  "Dumping"
];

export const issues = [
  {
    id: 1,
    title: "Noise in the street from construction",
    description: "Construction on Oak Street is starting too early and disturbing residents.",
    status: "in-progress" as const,
    commentsCount: 34,
    votesCount: 231,
    raisedBy: "current-user",
    dateCreated: "2025-02-15T08:30:00Z",
    location: "Oak Street & 5th Avenue"
  },
  {
    id: 2,
    title: "Poor drainage after rain",
    description: "Water pooling on Main Street after rainfall, creating hazards.",
    status: "pending" as const,
    commentsCount: 16,
    votesCount: 186,
    raisedBy: "current-user",
    dateCreated: "2025-02-12T14:20:00Z",
    location: "Main Street"
  },
  {
    id: 3,
    title: "Park trash cans overflowing",
    description: "Trash cans at Central Park are not emptied frequently enough.",
    status: "completed" as const,
    commentsCount: 22,
    votesCount: 143,
    raisedBy: "current-user",
    dateCreated: "2025-02-10T11:15:00Z",
    location: "Central Park"
  },
  {
    id: 4,
    title: "Broken swing at children's playground",
    description: "A swing is broken at the Main Street playground, creating safety concerns.",
    status: "in-progress" as const,
    commentsCount: 28,
    votesCount: 201,
    raisedBy: "JaneSmith",
    dateCreated: "2025-02-14T09:45:00Z",
    location: "Main Street Playground"
  },
  {
    id: 5,
    title: "Streetlight out on Elm Street",
    description: "The streetlight at the corner of Elm and 3rd has been out for two weeks.",
    status: "pending" as const,
    commentsCount: 12,
    votesCount: 78,
    raisedBy: "LightWatcher",
    dateCreated: "2025-02-16T19:30:00Z",
    location: "Elm Street & 3rd Avenue"
  },
  {
    id: 6,
    title: "Excessive speeding on residential road",
    description: "Cars are speeding down Maple Avenue, endangering children and pets.",
    status: "in-progress" as const,
    commentsCount: 45,
    votesCount: 254,
    raisedBy: "SafetyFirst",
    dateCreated: "2025-02-11T16:20:00Z",
    location: "Maple Avenue"
  },
  {
    id: 7,
    title: "Graffiti on community center wall",
    description: "The south wall of the community center has been vandalized with graffiti.",
    status: "completed" as const,
    commentsCount: 17,
    votesCount: 132,
    raisedBy: "ArtLover",
    dateCreated: "2025-02-09T10:10:00Z",
    location: "Community Center"
  }
];

export const communities = [
  {
    id: 1,
    name: "Palm Springs",
    type: "Gated Community",
    imageUrl: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600",
    memberCount: 456,
    activeIssues: 12
  },
  {
    id: 2,
    name: "La Lucia Ridge",
    type: "Suburb",
    imageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600",
    memberCount: 789,
    activeIssues: 8
  },
  {
    id: 3,
    name: "Metro Central",
    type: "Urban District",
    imageUrl: "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=600",
    memberCount: 1243,
    activeIssues: 24
  },
  {
    id: 4,
    name: "Green Valley",
    type: "Nature Reserve",
    imageUrl: "https://images.pexels.com/photos/2440024/pexels-photo-2440024.jpeg?auto=compress&cs=tinysrgb&w=600",
    memberCount: 345,
    activeIssues: 5
  }
];

export const notifications = [
  {
    id: 1,
    title: "New Issue Reported",
    description: "A new issue has been reported in your community regarding street lighting.",
    time: "2 minutes ago",
    read: false,
    icon: "AlertCircle"
  },
  {
    id: 2,
    title: "Poll Results Available",
    description: "The results for 'Weekend Garbage Collection' poll are now available.",
    time: "1 hour ago",
    read: false,
    icon: "Bell"
  },
  {
    id: 3,
    title: "Community Update",
    description: "Important updates about the upcoming community meeting.",
    time: "2 hours ago",
    read: false,
    icon: "Info"
  },
  {
    id: 4,
    title: "Issue Status Changed",
    description: "The park maintenance issue has been marked as resolved.",
    time: "1 day ago",
    read: true,
    icon: "AlertTriangle"
  }
];