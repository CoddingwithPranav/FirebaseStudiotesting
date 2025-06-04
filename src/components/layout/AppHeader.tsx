"use client";

import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, UserCircle, LogOut, LayoutDashboard, Map, Gamepad2, ShieldCheck, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { usePathname } from 'next/navigation';
import { NavItem } from '@/types';
import { cn } from '@/lib/utils';

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
  { href: '/maps', label: 'Maps', icon: Map, requiresAuth: true },
  { href: '/spaces', label: 'Spaces', icon: Gamepad2, requiresAuth: true },
  { href: '/profile', label: 'Profile', icon: UserCircle, requiresAuth: true },
  { href: '/admin', label: 'Admin Panel', icon: ShieldCheck, adminOnly: true, requiresAuth: true },
];


export default function AppHeader() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && user?.role !== 'admin') {
      return false;
    }
    return true;
  });
  
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-sidebar text-sidebar-foreground p-0">
          <div className="p-4 border-b border-sidebar-border">
            <Logo iconSize={28} textSize="text-2xl" />
          </div>
          <nav className="flex-1 grid gap-2 p-4 text-sm font-medium">
            {filteredNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  pathname === item.href ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
           <div className="mt-auto p-4 border-t border-sidebar-border">
            {user && (
              <div className="flex items-center gap-2 mb-4">
                {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.nickname || "User"} className="h-10 w-10 rounded-full object-cover border-2 border-primary" />
                ) : (
                    <UserCircle className="h-10 w-10 text-muted-foreground" />
                )}
                <div>
                    <p className="text-sm font-medium text-sidebar-foreground">{user.nickname || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground" onClick={logout}>
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full justify-start gap-3 mt-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground">
                  <Home className="h-5 w-5" />
                  Back to Home
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        <span className="text-lg font-semibold">{pathname.split('/').pop()?.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Dashboard'}</span>
      </div>
      {user && (
         <Link href="/profile" className="md:hidden">
            {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.nickname || "User"} className="h-8 w-8 rounded-full object-cover border border-primary" />
            ) : (
                <UserCircle className="h-8 w-8 text-muted-foreground" />
            )}
         </Link>
      )}
    </header>
  );
}
