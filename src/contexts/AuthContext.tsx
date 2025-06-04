
"use client";

import type { User, SpaceItem, ActiveRoom } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Mock a list of all users in the system for search functionality
const mockAllUsers: User[] = [
  { id: '1', email: 'user@example.com', nickname: 'MetaUser', avatarUrl: `https://placehold.co/100x100.png?text=M`, role: 'user', friendIds: ['2', '3'] },
  { id: '2', email: 'friend.alpha@example.com', nickname: 'FriendAlpha', avatarUrl: `https://placehold.co/100x100.png?text=F`, role: 'user', friendIds: ['1'] },
  { id: '3', email: 'beta.user@example.com', nickname: 'BetaUser', avatarUrl: `https://placehold.co/100x100.png?text=B`, role: 'user', friendIds: ['1', '4'] },
  { id: '4', email: 'gamma.explorer@example.com', nickname: 'GammaExplorer', avatarUrl: `https://placehold.co/100x100.png?text=G`, role: 'user', friendIds: ['3'] },
  { id: '5', email: 'delta.creator@example.com', nickname: 'DeltaCreator', avatarUrl: `https://placehold.co/100x100.png?text=D`, role: 'user', friendIds: [] },
  { id: 'admin', email: 'admin@example.com', nickname: 'AdminBoss', avatarUrl: `https://placehold.co/100x100.png?text=A`, role: 'admin', friendIds: ['1'] },
];


interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (nickname: string, avatarFile?: File) => Promise<void>;
  addFriend: (friendId: string) => Promise<void>;
  friends: User[];
  searchableUsers: User[];
  activeRooms: ActiveRoom[];
  addActiveRoom: (space: SpaceItem) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACTIVE_ROOMS_STORAGE_KEY = 'metaverse-active-rooms';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRooms, setActiveRooms] = useState<ActiveRoom[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('metaverse-user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          if (!parsedUser.friendIds) {
            parsedUser.friendIds = [];
          }
          setUser(parsedUser);
        }
        const storedRooms = localStorage.getItem(ACTIVE_ROOMS_STORAGE_KEY);
        if (storedRooms) {
          setActiveRooms(JSON.parse(storedRooms));
        }
      } catch (error) {
        console.error("Failed to parse data from localStorage", error);
        localStorage.removeItem('metaverse-user');
        localStorage.removeItem(ACTIVE_ROOMS_STORAGE_KEY);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !user && !['/login', '/signup', '/'].includes(pathname) && !pathname.startsWith('/_next/')) {
       // router.push('/login');
    }
  }, [user, isLoading, pathname, router]);


  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser = mockAllUsers.find(u => u.email === email);
    
    if (!foundUser) { 
        foundUser = {
            id: String(Date.now()), 
            email,
            nickname: email.split('@')[0] || 'NewUser',
            avatarUrl: `https://placehold.co/100x100.png?text=${(email[0] || 'N').toUpperCase()}`,
            role: email.includes('admin') ? 'admin' : 'user',
            friendIds: [],
        };
    } else {
       if (!foundUser.friendIds) {
            foundUser.friendIds = [];
        }
    }
    
    setUser(foundUser);
    localStorage.setItem('metaverse-user', JSON.stringify(foundUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const signup = async (email: string, pass: string, nickname: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: String(Date.now()), 
      email,
      nickname,
      avatarUrl: `https://placehold.co/100x100.png?text=${(nickname[0] || 'S').toUpperCase()}`,
      role: 'user',
      friendIds: [],
    };
    setUser(newUser);
    localStorage.setItem('metaverse-user', JSON.stringify(newUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('metaverse-user');
    // Optionally clear active rooms on logout, or leave them if they are not user-specific
    // localStorage.removeItem(ACTIVE_ROOMS_STORAGE_KEY); 
    // setActiveRooms([]);
    setIsLoading(false);
    router.push('/login');
  };

  const updateProfile = async (nickname: string, avatarFile?: File) => {
    if (!user) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let newAvatarUrl = user.avatarUrl;
    if (avatarFile) {
      newAvatarUrl = URL.createObjectURL(avatarFile);
    }

    const updatedUser = { ...user, nickname, avatarUrl: newAvatarUrl };
    setUser(updatedUser);
    localStorage.setItem('metaverse-user', JSON.stringify(updatedUser));
    setIsLoading(false);
    toast({ title: "Profile Updated", description: "Your changes have been saved." });
  };

  const addFriend = async (friendId: string) => {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to add friends.", variant: "destructive" });
      return;
    }
    if (friendId === user.id) {
      toast({ title: "Cannot Add Self", description: "You cannot add yourself as a friend.", variant: "destructive" });
      return;
    }
    if (user.friendIds?.includes(friendId)) {
      toast({ title: "Already Friends", description: "This user is already in your friends list." });
      return;
    }

    const updatedUser: User = {
      ...user,
      friendIds: [...(user.friendIds || []), friendId],
    };
    setUser(updatedUser);
    localStorage.setItem('metaverse-user', JSON.stringify(updatedUser));
    toast({ title: "Friend Added!", description: `${mockAllUsers.find(u=>u.id === friendId)?.nickname || 'User'} is now your friend.` });
  };
  
  const friends = useMemo(() => {
    if (!user || !user.friendIds) return [];
    return mockAllUsers.filter(u => user.friendIds!.includes(u.id));
  }, [user]);

  const searchableUsers = useMemo(() => {
    if (!user) return mockAllUsers.filter(u => u.id !== 'admin'); 
    return mockAllUsers.filter(u => u.id !== user.id && !user.friendIds?.includes(u.id));
  }, [user]);

  const addActiveRoom = (space: SpaceItem) => {
    setActiveRooms(prevRooms => {
      const existingRoomIndex = prevRooms.findIndex(room => room.spaceId === space.id);
      const newRoom: ActiveRoom = {
        roomId: space.id,
        spaceId: space.id,
        spaceName: space.name,
        spaceImageUrl: space.imageUrl,
        lastActivity: Date.now(),
        currentPlayers: Math.floor(Math.random() * (space.participantCount / 2)) + 1, // Mock players
      };

      let updatedRooms;
      if (existingRoomIndex > -1) {
        // Update existing room's activity and player count
        updatedRooms = [...prevRooms];
        updatedRooms[existingRoomIndex] = {
          ...updatedRooms[existingRoomIndex],
          lastActivity: newRoom.lastActivity,
          currentPlayers: newRoom.currentPlayers, // Re-roll players or implement smarter logic
        };
      } else {
        // Add new room
        updatedRooms = [newRoom, ...prevRooms];
      }
      
      // Sort by last activity, newest first
      updatedRooms.sort((a, b) => b.lastActivity - a.lastActivity);
      // Limit number of rooms shown e.g. to 10
      const limitedRooms = updatedRooms.slice(0, 10); 
      localStorage.setItem(ACTIVE_ROOMS_STORAGE_KEY, JSON.stringify(limitedRooms));
      return limitedRooms;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, addFriend, friends, searchableUsers, activeRooms, addActiveRoom }}>
      {children}
    </AuthContext.Provider>
  );
};
