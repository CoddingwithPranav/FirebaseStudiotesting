import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6">
          Welcome to <span className="text-primary">MetaVerse Hub</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Discover, create, and explore interconnected virtual worlds. Your adventure into the metaverse starts here.
        </p>
        <div className="space-x-4">
          <Link href="/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
              Get Started
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Learn More
            </Button>
          </Link>
        </div>
        <div className="mt-16 relative aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <Image 
            src="https://placehold.co/1200x675.png" 
            alt="Metaverse preview" 
            layout="fill"
            objectFit="cover"
            data-ai-hint="futuristic city digital"
            className="transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
