
"use client";

import type { User, SpaceItem, ActiveRoom } from '@/types';
import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import * as authService from '@/services/authService'; // Import the new service

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
  const [_searchableUsers, _setSearchableUsers] = useState<User[]>([]);
  const [_friends, _setFriends] = useState<User[]>([]);
  
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const loadInitialData = useCallback(async () => {
    setIsLoading(true);
    const storedUser = authService.getStoredUser();
    if (storedUser) {
      setUser(storedUser);
      // Fetch friends and searchable users based on storedUser
      if (storedUser.friendIds && storedUser.friendIds.length > 0) {
        const friendDetails = await authService.getUsersByIds(storedUser.friendIds);
        _setFriends(friendDetails);
      } else {
        _setFriends([]);
      }
      const allUsers = await authService.getAllSearchableUsers(storedUser.id);
      _setSearchableUsers(allUsers.filter(u => !storedUser.friendIds?.includes(u.id)));
    } else {
      // No stored user, fetch all users for potential display (e.g. on friends page if not logged in)
      const allUsers = await authService.getAllSearchableUsers();
      _setSearchableUsers(allUsers);
       _setFriends([]);
    }

    try {
      const storedRooms = localStorage.getItem(ACTIVE_ROOMS_STORAGE_KEY);
      if (storedRooms) {
        setActiveRooms(JSON.parse(storedRooms));
      }
    } catch (error) {
      console.error("Failed to parse active rooms from localStorage", error);
      localStorage.removeItem(ACTIVE_ROOMS_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!isLoading && !user && !['/login', '/signup', '/'].includes(pathname) && !pathname.startsWith('/_next/')) {
       // router.push('/login'); // Commented out for easier development
    }
  }, [user, isLoading, pathname, router]);


  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.loginUser(email, pass);
      setUser(loggedInUser);
      // Refresh friends and searchable users
      if (loggedInUser.friendIds && loggedInUser.friendIds.length > 0) {
        const friendDetails = await authService.getUsersByIds(loggedInUser.friendIds);
        _setFriends(friendDetails);
      } else {
         _setFriends([]);
      }
      const allUsers = await authService.getAllSearchableUsers(loggedInUser.id);
      _setSearchableUsers(allUsers.filter(u => !loggedInUser.friendIds?.includes(u.id)));
      
      router.push('/dashboard');
    } catch (error) {
      toast({ title: "Login Failed", description: (error as Error).message || "Please check your credentials.", variant: "destructive" });
      throw error; // Re-throw to be caught by form
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, pass: string, nickname: string) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signupUser(email, pass, nickname);
      setUser(newUser);
      _setFriends([]); // New user has no friends initially
      const allUsers = await authService.getAllSearchableUsers(newUser.id);
      _setSearchableUsers(allUsers); // All other users are searchable
      router.push('/dashboard');
    } catch (error) {
      toast({ title: "Signup Failed", description: (error as Error).message || "Could not create account.", variant: "destructive" });
      throw error; // Re-throw to be caught by form
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logoutUser();
      setUser(null);
      _setFriends([]);
      const allUsers = await authService.getAllSearchableUsers(); // Refresh searchable users for non-logged-in state
      _setSearchableUsers(allUsers);
      router.push('/login');
    } catch (error) {
      toast({ title: "Logout Failed", description: (error as Error).message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (nickname: string, avatarFile?: File) => {
    if (!user) throw new Error("User not authenticated");
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateUserProfile(user, nickname, avatarFile);
      setUser(updatedUser);
      // If user's own details changed, friends list appearance might need update if friend cards show avatar etc.
      // No direct change to _friends or _searchableUsers lists themselves unless nickname change affects sorting/filtering.
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
    } catch (error) {
      toast({ title: "Update Failed", description: (error as Error).message || "Could not update profile.", variant: "destructive" });
      throw error;
    } finally {
      setIsLoading(false);
    }
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

    setIsLoading(true);
    const updatedFriendIds = [...(user.friendIds || []), friendId];
    const updatedUser: User = { ...user, friendIds: updatedFriendIds };
    
    try {
      // In a real app, this would be an API call to update the user's friends list on the backend.
      // Here, we'll simulate by updating the user in authService (which updates localStorage).
      await authService.updateUserProfile(updatedUser, updatedUser.nickname || '', undefined); // Simulating save
      setUser(updatedUser);

      // Update local friends and searchable users lists
      const newFriendDetails = await authService.getUsersByIds([friendId]);
      if (newFriendDetails.length > 0) {
        _setFriends(prevFriends => [...prevFriends, newFriendDetails[0]]);
      }
      _setSearchableUsers(prevSearchable => prevSearchable.filter(u => u.id !== friendId));
      
      const friendInfo = (await authService.getUsersByIds([friendId]))[0];
      toast({ title: "Friend Added!", description: `${friendInfo?.nickname || 'User'} is now your friend.` });
    } catch (error) {
       toast({ title: "Failed to Add Friend", description: (error as Error).message, variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };
  
  const addActiveRoom = (space: SpaceItem) => {
    setActiveRooms(prevRooms => {
      const existingRoomIndex = prevRooms.findIndex(room => room.spaceId === space.id);
      const newRoom: ActiveRoom = {
        roomId: space.id, // Using spaceId as roomId
        spaceId: space.id,
        spaceName: space.name,
        spaceImageUrl: space.imageUrl,
        lastActivity: Date.now(),
        currentPlayers: Math.floor(Math.random() * (space.participantCount / 2)) + 1,
      };

      let updatedRooms;
      if (existingRoomIndex > -1) {
        updatedRooms = [...prevRooms];
        updatedRooms[existingRoomIndex] = {
          ...updatedRooms[existingRoomIndex],
          lastActivity: newRoom.lastActivity,
          currentPlayers: newRoom.currentPlayers,
        };
      } else {
        updatedRooms = [newRoom, ...prevRooms];
      }
      
      updatedRooms.sort((a, b) => b.lastActivity - a.lastActivity);
      const limitedRooms = updatedRooms.slice(0, 10); 
      localStorage.setItem(ACTIVE_ROOMS_STORAGE_KEY, JSON.stringify(limitedRooms));
      return limitedRooms;
    });
  };

  const contextValue = useMemo(() => ({
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
    addFriend,
    friends: _friends,
    searchableUsers: _searchableUsers,
    activeRooms,
    addActiveRoom
  }), [user, isLoading, login, signup, logout, updateProfile, addFriend, _friends, _searchableUsers, activeRooms, addActiveRoom]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
