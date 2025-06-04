
"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ArrowRight, BarChart, Gamepad2, MapIcon, Users, Edit3, MessageSquare, Users2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuthContext';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, friends } = useAuth();

  const stats = [
    { title: "My Maps", value: "5", icon: MapIcon, color: "text-primary", href: "/maps" },
    { title: "Active Spaces", value: "12", icon: Gamepad2, color: "text-accent", href: "/spaces" },
    { title: "Friends", value: friends.length.toString(), icon: Users2, color: "text-yellow-400", href: "/friends" },
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
            <Link href="/spaces" passHref><Button variant="outline" className="w-full justify-start border-accent text-accent hover:bg-accent hover:text-accent-foreground"><Gamepad2 className="mr-2 h-4 w-4" /> Explore Spaces</Button></Link>
            <Link href="/profile" passHref><Button variant="secondary" className="w-full justify-start"><Edit3 className="mr-2 h-4 w-4" /> Edit Your Profile</Button></Link>
            <Link href="/friends" passHref><Button variant="secondary" className="w-full justify-start"><Users2 className="mr-2 h-4 w-4" /> Find Friends</Button></Link>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline flex items-center"><Users2 className="mr-2 h-5 w-5 text-primary" /> My Friends</CardTitle>
            <CardDescription>Your connected companions in the MetaVerse.</CardDescription>
          </CardHeader>
          <CardContent>
            {friends.length > 0 ? (
              <ScrollArea className="h-48"> {/* Adjust height as needed */}
                <div className="space-y-3">
                  {friends.map(friend => (
                    <div key={friend.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={friend.avatarUrl || undefined} alt={friend.nickname || 'Friend'}/>
                          <AvatarFallback>{friend.nickname ? friend.nickname.substring(0,1).toUpperCase() : 'F'}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{friend.nickname}</span>
                      </div>
                       <Link href={`/chat?with=${friend.id}`} passHref> {/* Placeholder for chat */}
                         <Button variant="ghost" size="sm" className="text-accent hover:text-accent-foreground">
                           <MessageSquare className="h-4 w-4" />
                         </Button>
                       </Link>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <p>You haven't added any friends yet.</p>
                <Link href="/friends" passHref>
                  <Button variant="link" className="text-accent mt-2">Find Friends</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-1"> {/* Changed from lg:grid-cols-2 to 1 to give featured space more room */}
        <Card className="hover:shadow-lg transition-shadow duration-300 lg:col-span-1"> {/* Ensure it spans if there was another item */}
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
            {/* Placeholder link, ideally to the space itself */}
            <Link href="/spaces" passHref> 
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Explore Now <ArrowRight className="ml-2 h-4 w-4"/>
              </Button>
            </Link>
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
