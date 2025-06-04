
"use client";

import { useParams } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect } from 'react';
import { Gamepad } from 'lucide-react'; // Example icon

// This is still needed if you fetch from mockSpaces, otherwise remove if not used.
// import type { SpaceItem } from '@/types'; 
// const mockSpaces: SpaceItem[] = [ 
//   { id: '1', name: 'Pixel Art Cafe', description: 'A cozy virtual cafe...', imageUrl: '...', participantCount: 42, isPublic: true },
//   { id: '2', name: 'Developers Den (Private)', description: 'A private workspace...', imageUrl: '...', participantCount: 8, isPublic: false },
//   { id: '3', name: 'Synthwave Sunset Club', description: 'Dance the night away...', imageUrl: '...', participantCount: 120, isPublic: true },
//   { id: '4', name: 'Zen Meditation Garden', description: 'Find your inner peace...', imageUrl: '...', participantCount: 15, isPublic: true },
// ];


export default function ArenaPage() {
  const params = useParams();
  const spaceId = params.spaceId as string;

  // Placeholder for fetching space details if needed. For now, construct a name.
  // const currentSpace = mockSpaces.find(space => space.id === spaceId);
  // const spaceName = currentSpace?.name || `Arena ${spaceId}`;
  // const spaceDescription = currentSpace?.description || `Engage in the 2D metaverse experience.`;
  
  // Simplified version without fetching full space details for this example
  const spaceName = `Arena ${spaceId}`;
  const spaceDescription = `Engage in the 2D metaverse experience for Space ID: ${spaceId}.`;


  useEffect(() => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.fillStyle = 'hsl(var(--muted))'; // Use theme color for background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw some placeholder graphics
        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.fillRect(50, 50, 100, 100); // Player 1
        
        ctx.fillStyle = 'hsl(var(--accent))';
        ctx.beginPath();
        ctx.arc(canvas.width - 100, canvas.height - 100, 40, 0, Math.PI * 2); // Player 2 / Objective
        ctx.fill();

        ctx.font = 'bold 24px "Space Grotesk", sans-serif';
        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.textAlign = 'center';
        ctx.fillText(`Arena for Space ${spaceId}`, canvas.width / 2, 40);
        ctx.font = '16px "Space Grotesk", sans-serif';
        ctx.fillText('Your 2D Metaverse Game Starts Here!', canvas.width / 2, canvas.height / 2);
      }
    }
  }, [spaceId]); // Rerun effect if spaceId changes

  return (
    <div className="flex flex-col items-stretch space-y-8"> {/* items-stretch for full width cards */}
      <PageHeader title={spaceName} description={spaceDescription} />

      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center font-headline">
            <Gamepad className="mr-2 h-6 w-6 text-primary" />
            Game Arena
          </CardTitle>
          <CardDescription>The main game view will be rendered below.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-4 bg-card-foreground/5 rounded-b-md">
          <canvas 
            id="game-canvas" 
            width="800" 
            height="450" // 16:9 aspect ratio
            className="border border-border rounded-lg shadow-inner bg-muted"
            data-ai-hint="2d game screen"
          ></canvas>
        </CardContent>
      </Card>

      <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Game Information</CardTitle>
          <CardDescription>Details and controls for the current arena.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p><span className="font-semibold text-primary">Space ID:</span> {spaceId}</p>
          <p><span className="font-semibold text-primary">Game Type:</span> 2D Metaverse Adventure</p>
          <p><span className="font-semibold text-primary">Objective:</span> Explore, interact, and complete objectives!</p>
          <p className="text-sm text-muted-foreground pt-2 border-t border-border">
            This area can display game rules, player scores, inventory, or chat. 
            The canvas above is interactive (or will be!).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

