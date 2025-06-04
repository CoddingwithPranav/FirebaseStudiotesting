import MarketingHeader from '@/components/layout/MarketingHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CtaSection from '@/components/home/CtaSection';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHeader />
      <main className="flex-grow">
        <HeroSection />
        <Separator className="my-0 bg-border/50" />
        <FeaturesSection />
        <Separator className="my-0 bg-border/50" />
        <CtaSection />
      </main>
      <footer className="py-8 bg-background text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} MetaVerse Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}
