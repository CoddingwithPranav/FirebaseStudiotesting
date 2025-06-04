"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, Gamepad2, MapIcon, Users, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuthContext';
import Image from 'next/image';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    { title: "My Maps", value: "5", icon: MapIcon, color: "text-primary", href: "/maps" },
    { title: "Active Spaces", value: "12", icon: Gamepad2, color: "text-accent", href: "/spaces" },
    { title: "Community Members", value: "150+", icon: Users, color: "text-yellow-400", href: "#" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Welcome back, ${user?.nickname || 'Explorer'}!`}
        description="Here's your hub for all things MetaVerse."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map(stat => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <Link href={stat.href} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 mt-1">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
            <CardDescription>Jump right back into the action or manage your presence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/maps/create" passHref><Button className="w-full justify-start bg-primary hover:bg-primary/90"><MapIcon className="mr-2 h-4 w-4" /> Create a New Map</Button></Link>
            <Link href="/spaces/join" passHref><Button variant="outline" className="w-full justify-start border-accent text-accent hover:bg-accent hover:text-accent-foreground"><Gamepad2 className="mr-2 h-4 w-4" /> Join a Space</Button></Link>
            <Link href="/profile" passHref><Button variant="secondary" className="w-full justify-start"><Edit3 className="mr-2 h-4 w-4" /> Edit Your Profile</Button></Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline">Featured Space</CardTitle>
            <CardDescription>Check out this trending space in the MetaVerse!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full rounded-md overflow-hidden mb-3">
               <Image 
                src="https://placehold.co/600x338.png" 
                alt="Featured Space" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="fantasy landscape digital"
              />
            </div>
            <h3 className="text-lg font-semibold">Enchanted Forest Realm</h3>
            <p className="text-sm text-muted-foreground mb-3">A mystical forest with hidden secrets and magical creatures.</p>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Explore Now <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {user?.role === 'admin' && (
        <Card className="bg-primary/10 border-primary hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-primary">Admin Zone</CardTitle>
            <CardDescription>Access powerful tools to manage MetaVerse Hub.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin" passHref>
              <Button variant="default" className="bg-primary hover:bg-primary/80 text-primary-foreground">
                Go to Admin Panel <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
