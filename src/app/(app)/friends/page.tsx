
"use client";

import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Search, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import type { User } from '@/types';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function FriendsPage() {
  const { user, searchableUsers, addFriend, friends, isLoading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddFriend = async (friendId: string) => {
    await addFriend(friendId);
    // Optionally, re-filter or update UI immediately if needed, though context update should trigger re-render
  };

  const filteredUsers = searchableUsers.filter(u =>
    u.nickname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userIsFriend = (userId: string) => {
    return friends.some(f => f.id === userId) || user?.friendIds?.includes(userId);
  }

  if (authLoading) {
    return <LoadingSpinner fullscreen />;
  }
  
  return (
    <div className="space-y-8">
      <PageHeader title="Find Friends" description="Connect with other users in MetaVerse Hub." />

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by nickname or email.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by nickname or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {searchTerm && filteredUsers.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No users found matching your search.</p>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(searchTerm ? filteredUsers : searchableUsers.slice(0,6)).map((u) => ( // Show initial users or filtered
              <Card key={u.id} className="flex flex-col">
                <CardHeader className="items-center text-center">
                  <Avatar className="w-20 h-20 mb-2 border-2 border-primary">
                    <AvatarImage src={u.avatarUrl || undefined} alt={u.nickname || 'User'} />
                    <AvatarFallback>{u.nickname ? u.nickname.substring(0, 2).toUpperCase() : 'U'}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-headline text-lg">{u.nickname}</CardTitle>
                  <CardDescription className="text-sm">{u.email}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  {user && (userIsFriend(u.id) ? (
                      <Button variant="outline" className="w-full" disabled>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Already Friends
                      </Button>
                    ) : (
                      <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => handleAddFriend(u.id)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Friend
                      </Button>
                    )
                  )}
                  {!user && (
                     <Button className="w-full" disabled>Login to Add Friends</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
           {!searchTerm && searchableUsers.length > 6 && (
            <p className="text-sm text-muted-foreground text-center mt-4">Showing first 6 users. Use search to find more.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
