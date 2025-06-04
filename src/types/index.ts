
export interface User {
  id: string;
  email?: string | null;
  nickname?: string | null;
  avatarUrl?: string | null;
  role: 'user' | 'admin';
  friendIds?: string[];
}

export interface MapItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface SpaceItem {
  id:string;
  name: string;
  description: string;
  imageUrl: string;
  participantCount: number;
  isPublic: boolean;
}

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  adminOnly?: boolean;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
}

// Represents an active session in a space
export interface ActiveRoom {
  roomId: string; // Could be spaceId or a unique room instance ID
  spaceId: string;
  spaceName: string;
  lastActivity: number; // Timestamp
  activeUserIds: string[]; // IDs of users currently in this room
  // Potentially add spaceImageUrl for display
}
