export interface User {
  id: string;
  email?: string | null;
  nickname?: string | null;
  avatarUrl?: string | null;
  role: 'user' | 'admin';
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
