"use client";

import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Box, Image as ImageIcon, MapPinned, BarChart2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const adminSections = [
  { title: 'User Management', description: 'View, edit, and manage user accounts.', icon: Users, href: '/admin/users', count: 1250 },
  { title: 'Element CRUD', description: 'Manage in-game elements and assets.', icon: Box, href: '/admin/elements', count: 300 },
  { title: 'Background CRUD', description: 'Control metaverse backgrounds and scenes.', icon: ImageIcon, href: '/admin/backgrounds', count: 50 },
  { title: 'Map CRUD', description: 'Administer maps, regions, and points of interest.', icon: MapPinned, href: '/admin/maps-crud', count: 75 },
  { title: 'Analytics', description: 'View platform usage statistics and reports.', icon: BarChart2, href: '/admin/analytics' },
];

export default function AdminPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullscreen />;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">Access Denied</h1>
        <p className="text-muted-foreground text-lg">You do not have permission to view this page.</p>
        <Link href="/dashboard" passHref>
          <Button className="mt-6 bg-primary hover:bg-primary/90">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Dashboard" description="Oversee and manage all aspects of MetaVerse Hub." />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => (
          <Card key={section.title} className="flex flex-col hover:shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-accent/10 rounded-md">
                  <section.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
              </div>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {section.count && (
                <p className="text-3xl font-bold text-accent">{section.count} <span className="text-sm font-normal text-muted-foreground">items</span></p>
              )}
              {!section.count && <div className="h-10"></div> /* Placeholder for consistent height */}
            </CardContent>
            <CardContent className="border-t pt-4">
               <Link href={section.href} passHref>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Manage {section.title.replace(' Management','').replace(' CRUD','')}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Platform Health</CardTitle>
          <CardDescription>Quick overview of system status and recent activity.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for platform health stats or charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground">Active Users (24h)</h4>
              <p className="text-2xl font-bold">5,230</p>
            </div>
            <div className="p-4 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground">Server Load</h4>
              <p className="text-2xl font-bold text-green-500">Optimal</p>
            </div>
            <div className="p-4 bg-card-foreground/5 rounded-md">
              <h4 className="text-sm font-medium text-muted-foreground">New Signups (Today)</h4>
              <p className="text-2xl font-bold">87</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
