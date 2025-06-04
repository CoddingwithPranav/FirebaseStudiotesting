"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuthContext';
import { Loader2, Save, UserCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const profileSchema = z.object({
  nickname: z.string().min(3, { message: "Nickname must be at least 3 characters." }),
  avatarFile: z.custom<FileList>().optional(), // For file input
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const { user, updateProfile, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.nickname || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({ nickname: user.nickname || "" });
      setAvatarPreview(user.avatarUrl || null);
    }
  }, [user, form]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(user?.avatarUrl || null); // Revert to original if no file selected
    }
  };

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    try {
      const avatarFile = data.avatarFile?.[0];
      await updateProfile(data.nickname, avatarFile);
      toast({ title: "Profile Updated", description: "Your changes have been saved." });
    } catch (error) {
      toast({ title: "Update Failed", description: (error as Error).message || "Could not update profile.", variant: "destructive" });
    }
    setIsSubmitting(false);
  }

  if (authLoading) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Profile Settings</CardTitle>
          <CardDescription>Manage your MetaVerse Hub identity.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
     return (
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="font-headline">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Profile Settings</CardTitle>
        <CardDescription>Manage your MetaVerse Hub identity and preferences.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              {avatarPreview ? (
                <Image src={avatarPreview} alt="Avatar Preview" width={128} height={128} className="rounded-full object-cover h-32 w-32 border-4 border-primary" />
              ) : (
                <UserCircle className="h-32 w-32 text-muted-foreground" />
              )}
               <FormField
                control={form.control}
                name="avatarFile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem className="w-full max-w-xs">
                    <FormLabel htmlFor="avatar-upload" className="sr-only">Upload Avatar</FormLabel>
                    <FormControl>
                      <Input 
                        id="avatar-upload"
                        type="file" 
                        accept="image/*"
                        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        onChange={(e) => {
                          onChange(e.target.files);
                          handleAvatarChange(e);
                        }}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Nickname</FormLabel>
                  <FormControl>
                    <Input placeholder="YourMetaNickname" {...field} className="text-base py-3"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
              <Input type="email" value={user.email || ''} disabled className="text-base py-3 bg-muted/50 cursor-not-allowed" />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
            </FormItem>

          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-6 py-3" disabled={isSubmitting || authLoading}>
              {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
