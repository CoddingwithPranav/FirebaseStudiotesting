"use client";

import type { User } from '@/types';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Rocket } from 'lucide-react'; // Placeholder for avatar

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (nickname: string, avatarFile?: File) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('metaverse-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
       // router.push('/login'); // Commented out for easier testing of pages without full auth flow
    }
  }, [user, isLoading, pathname, router]);


  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '1',
      email,
      nickname: email.split('@')[0] || 'MetaUser',
      avatarUrl: `https://placehold.co/100x100.png?text=${(email[0] || 'M').toUpperCase()}`,
      role: email.includes('admin') ? 'admin' : 'user',
    };
    setUser(mockUser);
    localStorage.setItem('metaverse-user', JSON.stringify(mockUser));
    setIsLoading(false);
    router.push('/dashboard');
  };

  const signup = async (email: string, pass: string, nickname: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: '2', // Different ID for signup
      email,
      nickname,
      avatarUrl: `https://placehold.co/100x100.png?text=${(nickname[0] || 'M').toUpperCase()}`,
      role: 'user',
    };
    setUser(mockUser);
    localStorage.setItem('metaverse-user', JSON.stringify(mockUser));
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
      // Simulate avatar upload and URL generation
      newAvatarUrl = URL.createObjectURL(avatarFile); // In real app, upload to storage and get URL
    }

    const updatedUser = { ...user, nickname, avatarUrl: newAvatarUrl };
    setUser(updatedUser);
    localStorage.setItem('metaverse-user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
