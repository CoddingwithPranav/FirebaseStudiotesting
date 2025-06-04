
"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { ActiveRoom } from '@/types';
import { Users, ArrowRight, DoorOpen, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuthContext';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

export default function RoomsPage() {
  const { activeRooms, isLoading, user } = useAuth();
  const router = useRouter();

  // Function to manually refresh (in case localStorage updates aren't picked up immediately by other tabs)
  const handleRefreshRooms = () => {
    // This is a bit of a hack. In a real app with a backend, you'd refetch.
    // For localStorage, forcing a re-read or a state update in context is needed.
    // AuthContext already loads from localStorage on init, so this is more for explicit refresh.
    // window.location.reload(); // Or a more subtle way to trigger context update
    // For now, assume context updates correctly.
    router.refresh(); // Next.js app router way to refresh current route data
  };


  if (isLoading) {
    // You can add a loading spinner here if AuthContext has a global loading state
    return <div className="text-center py-10">Loading active rooms...</div>;
  }

  if (!user) {
     return (
      <div className="space-y-8">
        <PageHeader title="Active Rooms" description="You need to be logged in to see active rooms." />
         <div className="text-center py-10">
            <DoorOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Please log in to view or join rooms.</p>
            <Link href="/login">
                <Button className="mt-4">Login</Button>
            </Link>
        </div>
      </div>
    );
  }
  

  return (
    <div className="space-y-8">
      <PageHeader title="Active Rooms" description="Spaces you or your friends have recently joined.">
        <Button onClick={handleRefreshRooms} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh List
        </Button>
      </PageHeader>

      {activeRooms.length === 0 ? (
        <div className="text-center py-10">
          <DoorOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl font-semibold">No Active Rooms</p>
          <p className="text-muted-foreground">Join a space to see it appear here.</p>
          <Link href="/spaces">
            <Button variant="link" className="text-accent mt-2">Explore Spaces</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activeRooms.map((room) => (
            <Card key={room.roomId} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                  <Image 
                    src={room.spaceImageUrl || 'https://placehold.co/600x400.png'} 
                    alt={room.spaceName} 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint="virtual room interior"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-xl font-headline mb-1">{room.spaceName}</CardTitle>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>{room.currentPlayers} active player{room.currentPlayers === 1 ? '' : 's'}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(room.lastActivity), { addSuffix: true })}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-border">
                <Link href={`/arena/${room.spaceId}`} className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Re-enter Arena <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
