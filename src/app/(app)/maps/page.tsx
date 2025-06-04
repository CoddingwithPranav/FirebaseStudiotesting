"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MapItem } from '@/types';
import { PlusCircle, Search, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const mockMaps: MapItem[] = [
  { id: '1', name: 'Cyber City Neo-Kyoto', description: 'A sprawling futuristic city with neon lights and towering skyscrapers.', imageUrl: 'https://placehold.co/600x400.png', tags: ['sci-fi', 'city', 'cyberpunk'] },
  { id: '2', name: 'Ancient Desert Ruins', description: 'Explore mysterious ruins an_ai-hiddentreasures in a vast desert.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'desert', 'adventure'] },
  { id: '3', name: 'Floating Sky Islands', description: 'Magical islands floating in the sky, connected by glowing bridges.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'sky', 'magic'] },
  { id: '4', name: 'Underwater Kingdom Atlantis', description: 'Dive deep to discover the legendary underwater city of Atlantis.', imageUrl: 'https://placehold.co/600x400.png', tags: ['fantasy', 'underwater', 'mystery'] },
];

export default function MapsPage() {
  // TODO: Add search/filter state and logic

  return (
    <div className="space-y-8">
      <PageHeader title="Explore Maps" description="Discover new worlds and adventures.">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search maps..." className="pl-10 w-64" />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Map
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockMaps.map((map) => (
          <Card key={map.id} className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image 
                  src={map.imageUrl} 
                  alt={map.name} 
                  layout="fill" 
                  objectFit="cover" 
                  data-ai-hint={map.tags.slice(0,2).join(' ') || "landscape"}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl font-headline mb-1">{map.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">{map.description}</CardDescription>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {map.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded-full">{tag}</span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t border-border">
              <Link href={`/maps/${map.id}`} className="w-full">
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Explore Map <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
