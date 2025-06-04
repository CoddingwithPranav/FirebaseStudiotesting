
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
  participantCount: number; // Original participant capacity or general interest count
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
  roomId: string; // Using spaceId as roomId for simplicity
  spaceId: string;
  spaceName: string;
  spaceImageUrl?: string; // Added for display on room card
  lastActivity: number; // Timestamp
  currentPlayers: number; // Mock number of current players
}
