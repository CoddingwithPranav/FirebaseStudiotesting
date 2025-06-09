
"use client";

import { useEffect, useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MapItem } from '@/types';
import { PlusCircle, Search, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { getMaps } from '@/services/mapService'; // Import the service

export default function MapsPage() {
  const [maps, setMaps] = useState<MapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMaps = async () => {
      setIsLoading(true);
      try {
        const fetchedMaps = await getMaps();
        setMaps(fetchedMaps);
      } catch (error) {
        console.error("Failed to fetch maps:", error);
        // Handle error (e.g., show a toast message)
      }
      setIsLoading(false);
    };
    fetchMaps();
  }, []);

  const filteredMaps = maps.filter(map =>
    map.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    map.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    map.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <PageHeader title="Explore Maps" description="Discover new worlds and adventures.">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search maps..." 
              className="pl-10 w-64" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/maps/create" passHref>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Map
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Loading maps...</p>
        </div>
      ) : filteredMaps.length === 0 ? (
         <div className="text-center py-10 text-muted-foreground">
          <Search className="mx-auto h-12 w-12 mb-4" />
          <p className="text-xl font-semibold">No Maps Found</p>
          <p>Try adjusting your search term or create a new map!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMaps.map((map) => (
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
      )}
    </div>
  );
}
