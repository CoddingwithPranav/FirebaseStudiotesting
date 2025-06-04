
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuthContext';
import type { NavItem } from '@/types';
import {
  LayoutDashboard,
  Map,
  UserCircle,
  Settings,
  LogOut,
  ShieldCheck,
  Gamepad2,
  Home,
  Users2, 
  MessageSquare, 
  DoorOpen, 
} from 'lucide-react';

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
  { href: '/maps', label: 'Maps', icon: Map, requiresAuth: true },
  { href: '/spaces', label: 'Spaces', icon: Gamepad2, requiresAuth: true },
  { href: '/friends', label: 'Friends', icon: Users2, requiresAuth: true },
  { href: '/chat', label: 'Chat', icon: MessageSquare, requiresAuth: true },
  { href: '/rooms', label: 'Active Rooms', icon: DoorOpen, requiresAuth: true },
  { href: '/profile', label: 'Profile', icon: UserCircle, requiresAuth: true },
  { href: '/admin', label: 'Admin Panel', icon: ShieldCheck, adminOnly: true, requiresAuth: true },
];


export default function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => {
    if (!item.requiresAuth && user) return false; 
    if (item.requiresAuth && !user) return false; 
    if (item.adminOnly && user?.role !== 'admin') {
      return false;
    }
    return true;
  }).sort((a, b) => { // Custom sort to place 'Active Rooms' after 'Chat'
    const order = ['/dashboard', '/maps', '/spaces', '/friends', '/chat', '/rooms', '/profile', '/admin'];
    return order.indexOf(a.href) - order.indexOf(b.href);
  });

  return (
    <aside className="h-full w-64 flex-col border-r border-border bg-sidebar text-sidebar-foreground fixed hidden md:flex">
      <div className="p-4 border-b border-sidebar-border">
        <Logo iconSize={28} textSize="text-2xl" />
      </div>
      <ScrollArea className="flex-1">
        <nav className="py-4 px-2 space-y-1">
          {filteredNavItems.map((item) => (
            <Link key={item.label} href={item.href} legacyBehavior>
              <a
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard' && item.href !== '/')
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 mt-auto border-t border-sidebar-border">
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
        {user ? (
          <>
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
          </>
        ) : (
          <Link href="/login" passHref>
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
        )}
      </div>
    </aside>
  );
}
