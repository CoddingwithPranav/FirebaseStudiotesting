
"use client";

import PageHeader from '@/components/shared/PageHeader';
import { useAuth } from '@/hooks/useAuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, UserCircle, Users2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useSearchParams, useRouter } from 'next/navigation';
import type { User } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatPage() {
  const { user, friends, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedFriendId = searchParams.get('with');

  const selectedFriend = friends.find(f => f.id === selectedFriendId);

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

  const handleBackToFriends = () => {
    router.push('/chat');
  };

  return (
    <div className="space-y-8 h-[calc(100vh-100px)] flex flex-col"> {/* Adjusted height for better layout */}
      <PageHeader title="Chat" description="Connect with your friends." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow min-h-0">
        {/* Friends List Panel */}
        <Card className={`md:col-span-1 flex flex-col ${selectedFriend && 'hidden md:flex'}`}>
          <CardHeader>
            <CardTitle className="flex items-center"><Users2 className="mr-2 h-5 w-5 text-primary" /> Friends</CardTitle>
            <CardDescription>Select a friend to chat with.</CardDescription>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="pr-2"> {/* Added padding for scrollbar */}
              {friends.length > 0 ? (
                <ul className="space-y-1">
                  {friends.map(friend => (
                    <li key={friend.id}>
                      <Link href={`/chat?with=${friend.id}`} passHref>
                        <Button 
                          variant={selectedFriendId === friend.id ? "secondary" : "ghost"} 
                          className="w-full justify-start p-3 h-auto hover:bg-muted/50"
                        >
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
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className={`md:col-span-2 flex flex-col ${!selectedFriend && 'hidden md:flex'}`}>
          {selectedFriend ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                   <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={handleBackToFriends}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedFriend.avatarUrl || undefined} alt={selectedFriend.nickname || 'User'} />
                    <AvatarFallback>{selectedFriend.nickname ? selectedFriend.nickname.substring(0,1).toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedFriend.nickname}</CardTitle>
                    <CardDescription>Online</CardDescription> {/* Placeholder status */}
                  </div>
                </div>
              </CardHeader>
              <ScrollArea className="flex-grow bg-muted/10">
                <CardContent className="p-4 space-y-4">
                  {/* Placeholder for messages */}
                  <div className="flex justify-center items-center h-full min-h-[200px] text-muted-foreground">
                    <p>Your messages with {selectedFriend.nickname} will appear here. (Chat functionality coming soon!)</p>
                  </div>
                </CardContent>
              </ScrollArea>
              <CardFooter className="border-t p-4">
                <div className="flex w-full items-center space-x-2">
                  <Input type="text" placeholder="Type a message..." className="flex-1" disabled/>
                  <Button type="submit" disabled>
                    <Send className="h-4 w-4 mr-2" /> Send
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent className="h-full flex flex-col items-center justify-center text-muted-foreground bg-muted/20 rounded-b-md">
              <MessageSquare className="w-16 h-16 mb-4" />
              <p className="text-lg">Select a friend to start chatting.</p>
              <p className="text-sm">Full chat functionality is under development.</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

