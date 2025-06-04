
"use client";

import type { User } from '@/types';
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
  searchableUsers: User[]; // Users who are not self and not already friends
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('metaverse-user');
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          // Ensure friendIds is initialized
          if (!parsedUser.friendIds) {
            parsedUser.friendIds = [];
          }
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('metaverse-user');
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
    
    // Find user from mock list or create one if not found (for demo)
    let foundUser = mockAllUsers.find(u => u.email === email);
    
    if (!foundUser) { // Basic mock user creation if not in predefined list
        foundUser = {
            id: String(Date.now()), // simple unique ID
            email,
            nickname: email.split('@')[0] || 'NewUser',
            avatarUrl: `https://placehold.co/100x100.png?text=${(email[0] || 'N').toUpperCase()}`,
            role: email.includes('admin') ? 'admin' : 'user',
            friendIds: [],
        };
        // Add to mockAllUsers for future interactions, not ideal but for demo
        // In a real app, users are managed by a backend.
        // mockAllUsers.push(foundUser); 
    } else {
      // Ensure existing mock users also have friendIds initialized if they logged in
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
      id: String(Date.now()), // Different ID for signup
      email,
      nickname,
      avatarUrl: `https://placehold.co/100x100.png?text=${(nickname[0] || 'S').toUpperCase()}`,
      role: 'user',
      friendIds: [],
    };
    // mockAllUsers.push(newUser); // Add to global list for demo
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
    if (!user) return mockAllUsers.filter(u => u.id !== 'admin'); // Show some users if not logged in, excluding admin for example
    return mockAllUsers.filter(u => u.id !== user.id && !user.friendIds?.includes(u.id));
  }, [user]);


  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile, addFriend, friends, searchableUsers }}>
      {children}
    </AuthContext.Provider>
  );
};
