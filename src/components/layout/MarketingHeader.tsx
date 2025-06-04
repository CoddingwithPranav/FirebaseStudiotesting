"use client";

import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuthContext';
import { UserCircle, LogOut } from 'lucide-react';

export default function MarketingHeader() {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="py-4 px-6 bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <nav className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          ) : user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={logout} size="icon" title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
              <Link href="/profile" legacyBehavior>
                <a className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.nickname || 'User'} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <UserCircle className="h-8 w-8 text-muted-foreground" />
                  )}
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
