import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  fullscreen?: boolean;
}

export default function LoadingSpinner({ size = 24, className, fullscreen = false }: LoadingSpinnerProps) {
  if (fullscreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <Loader2 className={cn('animate-spin text-primary', className)} size={size * 2} />
      </div>
    );
  }
  return <Loader2 className={cn('animate-spin text-primary', className)} size={size} />;
}
