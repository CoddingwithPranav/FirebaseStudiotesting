"use client";

import React, { useEffect } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppHeader from '@/components/layout/AppHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      //router.push('/login'); // Enable this for production to protect routes
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner fullscreen />;
  }

  // if (!user) { // Enable this for production
  //   return null; // Or a redirecting message
  // }


  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 md:ml-64"> {/* Adjust margin for sidebar width */}
        <AppHeader />
        <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
