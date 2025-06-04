
"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { SpaceItem } from '@/types';
import { PlusCircle, Users, Lock, Globe, ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const mockSpaces: SpaceItem[] = [
  { id: '1', name: 'Pixel Art Cafe', description: 'A cozy virtual cafe for pixel art enthusiasts to hang out and share creations.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 42, isPublic: true },
  { id: '2', name: 'Developers Den (Private)', description: 'A private workspace for a team of metaverse developers.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 8, isPublic: false },
  { id: '3', name: 'Synthwave Sunset Club', description: 'Dance the night away in a retro-futuristic club with synthwave beats.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 120, isPublic: true },
  { id: '4', name: 'Zen Meditation Garden', description: 'Find your inner peace in this tranquil virtual garden.', imageUrl: 'https://placehold.co/600x400.png', participantCount: 15, isPublic: true },
];

export default function SpacesPage() {
  const router = useRouter();
  const { addActiveRoom } = useAuth();
  // TODO: Add search/filter state and logic

  const handleEnterArena = (space: SpaceItem) => {
    addActiveRoom(space);
    router.push(`/arena/${space.id}`);
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Discover Spaces" description="Join or create virtual spaces for collaboration and fun.">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search spaces..." className="pl-10 w-64" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Space
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockSpaces.map((space) => (
          <Card key={space.id} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-accent/20">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image 
                  src={space.imageUrl} 
                  alt={space.name} 
                  layout="fill" 
                  objectFit="cover"
                  data-ai-hint={space.isPublic ? "social gathering virtual" : "private room digital"}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl font-headline mb-1">{space.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">{space.description}</CardDescription>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{space.participantCount} capacity</span>
                </div>
                <div className="flex items-center gap-1">
                  {space.isPublic ? <Globe className="h-3.5 w-3.5 text-green-500" /> : <Lock className="h-3.5 w-3.5 text-red-500" />}
                  <span>{space.isPublic ? 'Public' : 'Private'}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-border">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    Enter Arena <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Entry</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to create/join a room and enter the arena for "{space.name}"?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleEnterArena(space)}>
                      Yes, Enter Arena
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
