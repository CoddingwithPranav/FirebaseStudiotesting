
"use client";

import { useParams } from 'next/navigation';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Gamepad, Link2 as CopyLinkIcon } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';


export default function ArenaPage() {
  const params = useParams();
  const spaceId = params.spaceId as string;
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  
  const spaceName = `Arena ${spaceId}`; // Simplified for now
  const spaceDescription = `Engage in the 2D metaverse experience for Space ID: ${spaceId}.`;


  useEffect(() => {
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'hsl(var(--muted))'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.fillRect(50, 50, 100, 100); 
        
        ctx.fillStyle = 'hsl(var(--accent))';
        ctx.beginPath();
        ctx.arc(canvas.width - 100, canvas.height - 100, 40, 0, Math.PI * 2); 
        ctx.fill();

        ctx.font = 'bold 24px "Space Grotesk", sans-serif';
        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.textAlign = 'center';
        ctx.fillText(`Arena for Space ${spaceId}`, canvas.width / 2, 40);
        ctx.font = '16px "Space Grotesk", sans-serif';
        ctx.fillText('Your 2D Metaverse Game Starts Here!', canvas.width / 2, canvas.height / 2);
      }
    }
  }, [spaceId]); 

  const handleCopyLink = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link Copied!",
        description: "Arena link copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Could not copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-stretch space-y-8"> 
      <PageHeader title={spaceName} description={spaceDescription}>
        <Button onClick={handleCopyLink} variant="outline" disabled={!currentUrl}>
            <CopyLinkIcon className="mr-2 h-4 w-4"/> Copy Arena Link
        </Button>
      </PageHeader>

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
            height="450" 
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
