import Logo from '@/components/shared/Logo';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-card to-background p-4">
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image 
            src="https://placehold.co/1920x1080.png" 
            alt="Abstract metaverse background"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
            data-ai-hint="abstract digital pattern"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <Logo className="mb-12" iconSize={48} textSize="text-4xl" />
        <div className="w-full bg-card p-8 rounded-xl shadow-2xl border border-border">
          {children}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MetaVerse Hub. Step into new realities.
        </p>
      </div>
    </div>
  );
}
