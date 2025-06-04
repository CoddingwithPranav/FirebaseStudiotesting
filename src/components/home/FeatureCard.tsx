import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={`bg-card border-border shadow-lg hover:shadow-primary/20 transition-shadow duration-300 transform hover:-translate-y-1 ${className}`}>
      <CardHeader className="items-center text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Icon className="w-10 h-10 text-primary" />
        </div>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-muted-foreground text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
