
"use client";

import PageHeader from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, UserCircle, Users2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ChatPage() {
  const { user, friends, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullscreen />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <UserCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold text-foreground mb-2">Login Required</h1>
        <p className="text-muted-foreground text-lg">Please log in to view your chats.</p>
        <Link href="/login" passHref>
          <Button className="mt-6 bg-primary hover:bg-primary/90">Go to Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Chat" description="Connect with your friends." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Friends List Panel */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center"><Users2 className="mr-2 h-5 w-5 text-primary" /> Friends</CardTitle>
            <CardDescription>Select a friend to chat with.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {friends.length > 0 ? (
              <ul className="space-y-2">
                {friends.map(friend => (
                  <li key={friend.id}>
                    <Link href={`/chat?with=${friend.id}`} passHref>
                      <Button variant="ghost" className="w-full justify-start p-3 h-auto hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.avatarUrl || undefined} alt={friend.nickname || 'Friend'} />
                            <AvatarFallback>{friend.nickname ? friend.nickname.substring(0, 1).toUpperCase() : 'F'}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{friend.nickname}</p>
                            <p className="text-xs text-muted-foreground">Online</p> {/* Placeholder status */}
                          </div>
                        </div>
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No friends yet.</p>
                <Link href="/friends" passHref>
                  <Button variant="link" className="text-accent mt-1">Add Friends</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Area (Placeholder) */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Conversation</CardTitle>
            <CardDescription>This is where your chat messages will appear. (Feature coming soon!)</CardDescription>
          </CardHeader>
          <CardContent className="h-[calc(100vh-240px)] flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-b-md">
            <MessageSquare className="w-16 h-16 mb-4" />
            <p className="text-lg">Select a friend to start chatting.</p>
            <p className="text-sm">Full chat functionality is under development.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
